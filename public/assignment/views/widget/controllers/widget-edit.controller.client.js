(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;
        vm.createNewWidget = createNewWidget;



        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }


        function updateWidget(widget) {
            var wdg = WidgetService.updateWidget(vm.widgetId, widget);

            if(wdg===null){
                vm.error = "Unable to update";
            }else{
                vm.success = "Updated Successfully";
            }
        }

        function createNewWidget(type) {
            var wid ={};
            wid.widgetType = type;
            wid = WidgetService.createWidget(vm.pageId,wid);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+wid._id);
        }

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }
    }
})();