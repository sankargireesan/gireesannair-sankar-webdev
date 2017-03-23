(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;


        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (user) {
                    vm.websites = user.websites;
                });

            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                });

        }init();

        function deleteWebsite () {
            var answer = confirm("Are you sure?");
            if(answer) {
                WebsiteService
                    .deleteWebsite(vm.websiteId)
                    .then(function (status) {
                        $location.url("/user/" + vm.userId + "/website");
                    }, function (err) {
                        vm.error = 'unable to delete the website';
                    });




                    // .success(function () {
                    //     $location.url("/user/" + vm.userId + "/website");
                    // })
                    //
                    // .error(function () {
                    //     vm.error = 'unable to delete the website';
                    //
                    // });
            }
        }

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(vm.websiteId, website)
                .success(function () {
                    vm.message = "Website successfully updated";
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function () {
                    vm.error = "unable to update the website";
                });


        }
    }
})();