(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams, $location,$rootScope,UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.update = update;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        var id = $rootScope.currentUser._id;
        // console.log(id);
        // function init() {
        //     UserService
        //         .findUserById(userId)
        //         .success(function (user){
        //             vm.user = user;
        //         }
        //         .error(function (err) {
        //             UserService
        //                 .findUser(u)
        //                 .success(function (u) {
        //                     vm.user = u;
        //                 })
        //         }));
        // }
        // init();


        function init() {
            UserService
                .findUser()
                .success(function (u) {
                    vm.user = u;
                })
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
                        $rootScope.currentUser = null;
                        $location.url('/');
                    })

                    .error(function () {
                        vm.error  = 'unable to remove user';

                    });
            }

        }


        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                            $location.url("/");
                    });
        }

    }
})();