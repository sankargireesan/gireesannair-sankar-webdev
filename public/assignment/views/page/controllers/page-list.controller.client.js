(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

        function PageListController($routeParams, PageService) {
            var vm = this;
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;


            function init() {
                PageService
                    .findPageByWebsiteId(vm.websiteId)
                    .success(function (website) {
                        vm.pages = website.pages;
                    })
            }init();
        }



})();