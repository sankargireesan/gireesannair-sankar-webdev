(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams, $location, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.update = update;
        vm.deleteUser = deleteUser;

        function init() {
            UserService
                .findUserById(userId)
                .success(function (user){
                    vm.user = user;
                });
        }
        init();

        function update (newUser) {
            UserService
                .updateUser(userId, newUser)
                .success(function (response) {
                    vm.message = "user successfully updated"
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
        }

        function deleteUser() {
            var answer = confirm("Are you sure?");
            if(answer) {
                UserService
                    .deleteUser(userId)
                    .success(function () {
                        $location.url('/');
                    })

                    .error(function () {
                        vm.error  = 'unable to remove user';

                    });
            }

        }

    }
})();