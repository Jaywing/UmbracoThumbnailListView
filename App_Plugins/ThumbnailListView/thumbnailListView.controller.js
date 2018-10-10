(function () {
    "use strict";

    function ThumbnailListViewController($scope, listViewHelper, $location, mediaHelper, mediaResource, contentResource) {

        var vm = this;

        vm.nodeId = $scope.contentId;

        vm.selectItem = selectItem;
        vm.clickItem = clickItem;

        vm.selectAll = selectAll;
        vm.isSelectedAll = isSelectedAll;
        vm.isSortDirection = isSortDirection;
        vm.sort = sort;

        function selectAll($event) {
            listViewHelper.selectAllItems($scope.items, $scope.selection, $event);
        }

        function isSelectedAll() {
            return listViewHelper.isSelectedAll($scope.items, $scope.selection);
        }

        function selectItem(selectedItem, $index, $event) {
            listViewHelper.selectHandler(selectedItem, $index, $scope.items, $scope.selection, $event);
        }

        function clickItem(item) {
            $location.path($scope.entityType + '/' + $scope.entityType + '/edit/' + item.id);
        }

        function isSortDirection(col, direction) {
            return listViewHelper.setSortingDirection(col, direction, $scope.options);
        }

        function sort(field, allow) {
            if (allow) {
                listViewHelper.setSorting(field, allow, $scope.options);
                $scope.getContent($scope.contentId);
            }
        }

        function populateDynamicContent() {
            angular.forEach($scope.options.includeProperties, function (column) {
                if (!column.isSystem) {

                    angular.forEach($scope.items, function (item) {

                        if (item[column.alias].indexOf('umb://media/') === 0) {
                            mediaResource.getById(item[column.alias])
                                .then(function (media) {
                                    item[column.alias] = mediaHelper.resolveFile(media, true);
                                });
                        }
                        if (item[column.alias].indexOf('umb://document/') === 0) {
                            contentResource.getById(item[column.alias])
                                .then(function (document) {
                                    item[column.alias] = document.name;
                                });
                        }
                    });
                }
            });
        }

        function activate() {
            populateDynamicContent(); 
        }
        activate();
    }

    angular.module("umbraco").controller("Jaywing.ThumbnailListView.ThumbnailListViewController", ThumbnailListViewController);

})();
