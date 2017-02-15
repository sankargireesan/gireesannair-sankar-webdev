(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams, $location, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.update = update;
        vm.deleteUser = deleteUser;
        vm.user = UserService.findUserById(userId);

        function update (newUser) {
            var newUser = UserService.updateUser(userId, newUser);

            if(newUser == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated"
            }
        }

        function deleteUser() {
            UserService.deleteUser(userId);
            if(UserService.findUserById(userId)=== null){
                $location.url('/')
            }

        }



    }
})();