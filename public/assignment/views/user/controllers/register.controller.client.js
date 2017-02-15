(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController($location, UserService) {
        var vm = this;
        vm.create = create;

        function create (newUser) {
            var user = UserService.createUser(newUser);
            $location.url('/profile/' + user._id);

        }
    }
})();