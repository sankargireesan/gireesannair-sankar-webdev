(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        //vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;



        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });

            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                });
        }init();


        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                })
                .error(function () {
                    vm.error = "Unable to delete this widget";
                })

        }


        function updateWidget(widget) {
            WidgetService
                .updateWidget(vm.widgetId, widget)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                })
                .error(function () {
                    vm.error = "Unable to update";
                });


        }


        // function getEditorTemplateUrl(type) {
        //     //console.log(type);
        //     return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        // }
    }
})();