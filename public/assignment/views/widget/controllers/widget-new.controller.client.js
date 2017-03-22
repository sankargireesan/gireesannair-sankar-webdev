(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, $location, WidgetService) {

        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.createNewWidget = createNewWidget;

        function createNewWidget(type) {
            var wid ={};
            wid.widgetType = type;
            WidgetService
                .createWidget(vm.pageId,wid)
                .success(function (wid) {
                   console.log(wid.widgetType);
                    //$location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+wid._id);
                })

                .error(function () {
                    vm.error = "Unable to create new widget";
                })
        }

    }

})();