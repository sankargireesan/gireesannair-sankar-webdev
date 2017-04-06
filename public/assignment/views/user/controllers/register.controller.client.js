(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController($location, UserService) {
        var vm = this;
        vm.create = create;

        function create (user) {
            if(user.username!=null && user.password!=null && user.password2 == user.password){

            UserService
                .register(user)
                .then(
                    function(response){
                        var user = response.data;
                        if(user) {
                            $location.url("/user/"+user._id);
                        }
                    },
                    function(err) {
                        vm.error = err.data;
                    }
                );



                // .findUserByUsername(user.username)
                // .success(function (user) {
                //     vm.error = "user name not available"
                // })

                // .error(function(){
                //     UserService
                //         .createUser(user)
                //         .success(function(user){
                //             $location.url('/user/' + user._id);
                //         })
                //
                //         .error(function () {
                //             vm.error = 'Unable to register';
                //         });
                // });
        }}
    }
})();