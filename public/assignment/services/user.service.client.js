(function (){
    angular
        .module("WebAppMaker")
        .factory('UserService',userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , email: "alice@domain.com" },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley" , email: "bob@domain.com"},
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia" , email: "charly@domain.com"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" ,email: "jannunzi@domain.com" }
        ];

        var api = {
            "createUser":createUser,
            "findUserById": findUserById,
            "findUserByUsername":findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser":deleteUser,
            "users": users

        };
        return api;


        function createUser(user) {
            user._id=(new Date().getTime().toString());
            users.push(user);
            return user;
        }

        function findUserById(uid) {
            for(var u in users) {
                var user = users[u];
                if( user._id === uid ) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username ) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username &&
                    user.password === password) {
                    return angular.copy(user);
                }
            }
            return null;
        }



        function updateUser(userId, newUser) {
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    users[u].email= newUser.email;
                    return user;
                }
            }
            return null;
        }


        function deleteUser(userId) {
            for(var u in users) {
                if(users[u]._id === userId) {
                    users.splice(u, 1);

                }
            }

        }

    }
})();