(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createPage = createPage;
        vm.websiteId = $routeParams.wid;

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (website) {
                    vm.pages = website.pages;
                })
        }init();


        function createPage (page) {
            PageService
                .createPage(vm.websiteId, page)
                .success(function (page) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })

                .error(function(err) {
                    vm.error = 'Page not created';
                });

        }
    }
})();