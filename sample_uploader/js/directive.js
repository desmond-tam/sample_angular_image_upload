'use strict';
app.directive('uploadPanel', function () {
    return {
        restrict: 'E',
        scope: {
            action: '@'
        },
        templateUrl: 'js/ng_templates/uploader.html',
        replace: false,
        controller: ['$scope', function ($scope) {
            $scope.progress = 0;
            $scope.avatar = '';
            $scope.sendFile = function (el) {
                var $form = $(el).parents('form');
                if ($(el).val() == '') {
                    return false;
                }
                $form.attr('action', $scope.action);

                $scope.$apply(function () {
                    $scope.progress = 0;
                });

                $form.ajaxSubmit({
                    type: 'POST',
                    uploadProgress: function (evt, pos, tot, percComplete) {
                        $scope.$apply(function () {
                            // upload the progress bar during the upload
                            $scope.progress = percComplete;
                        });
                    },
                    error: function (evt, statusText, response, form) {
                        // remove the action attribute from the form
                        $form.removeAttr('action');
                        /*
                          handle the error ...
                        */
                    },
                    success: function (response, status, xhr, form) {
                        var ar = $(el).val().split('\\'),
                          filename = ar[ar.length - 1];
                        // remove the action attribute from the form
                        $form.removeAttr('action');
                        $scope.$apply(function () {
                            //$scope.avatar = filename;
                            $scope.progress = 0;
                            $scope.$parent.imageId = response;
                            $scope.$parent.imageLoaded = true;
                        });
                    },
                });
            }

        }],
        link: function (scope, elem, attrs, ctrl) {
            // link function
            elem.find(".uploadbtn").click(function () {
                elem.find('input[type="file"]').click();
            })

        }
    }
});