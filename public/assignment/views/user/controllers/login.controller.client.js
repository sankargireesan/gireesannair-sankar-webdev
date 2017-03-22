(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

     function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            var promise  = UserService
                .findUserByCredentials(user.username, user.password);

            promise
                .success(function (user){
                    if(user){
                        $location.url('/user/' + user._id);

                    } else {
                        vm.error = 'username and password does not match';
                    }
                })

                .error(function(err) {
                    vm.error = 'username and password does not match';
                });
        }
    }
})();