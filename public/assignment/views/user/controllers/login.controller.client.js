(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

     function loginController(UserService, $location, $rootScope) {
        var vm = this;
        vm.login = login;

        function login(user) {
            if(user.username!=null && user.password!=null){
            var promise  = UserService
                            .login(user);

            promise
                .success(function (user){
                    if(user){
                        $rootScope.currentUser = user;
                        $location.url('/user/' + user._id);

                    } else {
                        vm.error = 'username and password does not match';
                    }
                })

                .error(function(err) {
                    vm.error = 'username and password does not match';
                });
        }}
    }
})();