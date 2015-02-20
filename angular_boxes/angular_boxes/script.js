(function () {
    var app = angular.module("boxes", []);

    app.controller("appCtrl", function ($scope, $http) {

        $scope.fbRef = new Firebase('https://codercampsboxes.firebaseio.com/');

        $scope.currIndex;
        $scope.currKey;

        $scope.boxes = [];

        $scope.url = 'https://codercampsboxes.firebaseio.com/.json';

        // Helper function for $http requests
        $scope.request = function (address, type, dataToSend, callback, extra) {
            $http({
                url: address,
                method: type,
                data: dataToSend
            }).success(function (data) {
                if (callback) {
                    callback(data, extra);
                }
            }).error(function (data) {
                console.log('ERROR', data);
            })
        }

        // Box constructor function that's not in use.
        $scope.Box = function (color, icon) {
            this.color = color;
            this.icon = icon;
        }

        // Color choices for <select> options.
        $scope.colors = [{
            value: 'red', label: 'Red'
        }, {
            value: 'orange', label: 'Orange'
        }, {
            value: 'yellow', label: 'Yellow'
        }, {
            value: 'green', label: 'Green'
        }, {
            value: 'blue', label: 'Blue'
        }, {
            value: 'purple', label: 'Purple'
        }];

        // Icon choices for <select options.
        $scope.icons = [{
            value: 'heart', label: 'Heart'
        }, {
            value: 'fire', label: 'Flame'
        }, {
            value: 'leaf', label: 'Leaf'
        }, {
            value: 'star', label: 'Star'
        }, {
            value: 'cloud', label: 'Cloud'
        }, {
            value: 'tint', label: 'Water'
        }, {
            value: 'flash', label: 'Lightning'
        }];

        $scope.getIndex = function (indx) {
            $scope.currIndex = indx;
            $scope.currId = $scope.boxes[indx].id;
            $scope.updateUrl = 'https://codercampsboxes.firebaseio.com/' + $scope.currId + '/.json';
        }

        // Create new box and call postBox function
        $scope.addBox = function () {
            $scope.newBox = { color: $scope.colorPicker.value, icon: $scope.iconPicker.value };
            $scope.postBox($scope.newBox);
        }

        // Callback for Post request
        $scope.postCallback = function (data, data2) {
            data2.id = data.name;
            $scope.boxes.push(data2);
        }

        // Post request to Firebase
        $scope.postBox = function (newBox) {
            $scope.request($scope.url, 'POST', newBox, $scope.postCallback, newBox);
        }

        // Callback for Get request
        $scope.getCallback = function (data) {
            for (var i in data) {
                data[i].id = i;
                $scope.boxes.push(data[i]);
            }
            console.log($scope.boxes);
        }

        // Retrieves boxes from Firebase
        $scope.getBoxes = function () {
            $scope.request($scope.url, 'GET', null, $scope.getCallback);
            console.log($scope.getBoxes);
        }

        // Update box color and icon.
        $scope.updateBox = function () {
            $scope.tempBox = $scope.boxes[$scope.currIndex];
            $scope.tempBox.color = $scope.colorPickerModal.value;
            $scope.tempBox.icon = $scope.iconPickerModal.value;
            $scope.boxes.splice($scope.currIndex, 1, $scope.tempBox);
            $scope.updateCall($scope.tempBox);
        }

        // Update box in Firebase
        $scope.updateCall = function (tempBox) {
            $scope.request($scope.updateUrl, 'PUT', tempBox, null, null);
        }

        // Delete box from page and storage.
        $scope.deleteBox = function () {
            $scope.boxes.splice($scope.currIndex, 1);
            $scope.deleteCall();
        }

        // Delete box from Firebase
        $scope.deleteCall = function () {
            $scope.request($scope.updateUrl, 'DELETE', null, null, null)
        }

        // Get boxes from Firebase on load
        $scope.getBoxes();
    });
})();