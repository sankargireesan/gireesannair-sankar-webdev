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
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function deletePage () {
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        function updatePage(page) {
            var p = PageService.updatePage(vm.pageId, page);

            if(p ===null){
                vm.error = "Unable to update";
            }else{
                vm.success = "Updated Successfully";
            }
        };
    }
})();