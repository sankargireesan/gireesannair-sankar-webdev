(function () {
    angular
        .module('WebAppMaker')
        .directive('sgnSortable', sortableDir);

    function sortableDir($http,$routeParams,WidgetService ) {
        vm = this;
        vm.pageId = $routeParams.pid;
        var index1 =-1;
        var index2 =-1;
        function linkFunc(scope, element, attributes) {
            element.sortable(
                {
                    axis: 'y',
                    handle: '.sortable-handle',


                    // start: function( event, ui ){
                    //     index1 = ui.item.index();
                    //
                    // },
                    // stop: function( event, ui ) {
                    //     index2 = ui.item.index();
                    //     WidgetService
                    //         .sortWidget(vm.pageId, index1, index2)
                    //         .success(function () {
                    //             console.log("sorted");
                    //         });
                    //
                    // }

                    // $.ajax({
                    //     url: "/api/page/"+vm.pageId+"/widget?initial="+index1+"&finial="+index2,
                    //     type: 'PUT',
                    //     success: function(response) {
                    //         //...
                    //     }
                    // });
                    // return $http.put("/api/page/"+vm.pageId+"/widget?initial="+index1+"&finial="+index2);

                });
        }
        return {
            link: linkFunc
        };
    }
})();