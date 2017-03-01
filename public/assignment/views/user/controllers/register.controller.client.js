(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController($location, UserService) {
        var vm = this;
        vm.create = create;

        function create (user) {
            UserService
                .findUserByUsername(user.username)
                .success(function (user) {
                    vm.error = "user name not available"
                })

                .error(function(){
                    UserService
                        .createUser(user)
                        .success(function(user){
                            $location.url('/user/' + user._id);
                        })

                        .error(function () {
                            vm.error = 'Unable to register';
                        });
                });
        }
    }
})();