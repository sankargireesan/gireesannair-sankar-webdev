(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (user) {
                    vm.websites = user.websites;
                })
        }
        init();

        function createWebsite (website) {
            WebsiteService
                .createWebsite(vm.userId, website)
                .success(function (user) {
                    $location.url("/user/"+vm.userId+"/website");
                })

                .error(function(err) {
                    vm.error = 'Website not created';
                });

        }
    }
})();