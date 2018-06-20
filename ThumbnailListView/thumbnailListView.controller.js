(function () {
    "use strict";

    function ThumbnailListViewController($scope, listViewHelper, $location, mediaHelper, mediaResource) {

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

        function getImage(id) {

        }

        function activate() {
            angular.forEach($scope.items, function (item) {
                if (item.thumbnail) {
                    mediaResource.getById(item.thumbnail)
                        .then(function (media) {
                            item.thumbnailImage = mediaHelper.resolveFile(media, true);
                        });
                } else if (item.image) {
                    mediaResource.getById(item.image)
                        .then(function (media) {
                            item.thumbnailImage = mediaHelper.resolveFile(media, true);
                        });
                }
            });
        }
        activate();
    }

    angular.module("umbraco").controller("Jaywing.ThumbnailListView.ThumbnailListViewController", ThumbnailListViewController);

})();
