(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;


        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });

            PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                });

        }init();

        function deletePage () {
            var answer = confirm("Are you sure?");
            if(answer){
                PageService
                    .deletePage(vm.pageId)
                    .success(function () {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    })

                    .error(function () {
                        vm.error = 'unable to delete this page';

                    });

            }

        }

        function updatePage(page) {
            PageService
                .updatePage(vm.pageId, page)
                .success(function () {
                    vm.message = "Page successfully updated";
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })
                .error(function () {
                    vm.error = "unable to update the page";
                });

        }
    }
})();