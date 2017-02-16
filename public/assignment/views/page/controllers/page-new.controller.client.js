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
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();


        function createPage (page) {
            PageService.createPage(vm.websiteId, page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };
    }
})();