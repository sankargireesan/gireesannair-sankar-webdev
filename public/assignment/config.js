(function () {
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider,$locationProvider) {
        $locationProvider.html5Mode(false).hashPrefix('');
        $routeProvider
            .when("/login",{
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })

            // .when("/delete/:username",{
            //     templateUrl: 'views/user/templates/login.view.client.html',
            //     controller: 'loginController',
            //     controllerAs: 'model'
            // })



            .when("/",{
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })

            .when("/register",{
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })

            .when("/profile/:uid",{
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })

            .when("/user/:uid",{
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })

            .when("/user/:uid/website",{
                templateUrl: 'views/website/templates/website-list.view.client.html',
                controller: "WebsiteListController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/new",{
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: "WebsiteNewController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid",{
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: "WebsiteEditController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page",{
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: "WebsiteEditController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/new",{
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: "WebsiteEditController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/:pid",{
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: "WebsiteEditController",
                controllerAs: "model"
            })

            // now do all the page routes using websites as an example


            .when("/user/:uid/website/:wid/page/:pid/widget",{
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: "WidgetListController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget/new",{
                templateUrl: 'views/widget/templates/widget-chooser.view.client.html',
                controller: "WidgetListController",
                controllerAs: "model"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid",{
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: "WidgetListController",
                controllerAs: "model"
            });

    }
})();