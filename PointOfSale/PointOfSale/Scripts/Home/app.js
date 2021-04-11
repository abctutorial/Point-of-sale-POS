var deps = [];
var app = angular.module('myApp', deps);

app.factory('focus', function ($timeout, $window) {
    return function (id) {
        // timeout makes sure that is invoked after any other event has been triggered.
        // e.g. click events that need to run before the focus or
        // inputs elements that are in a disabled state but are enabled when those events
        // are triggered.
        $timeout(function () {
            var element = $window.document.getElementById(id);
            if (element)
                element.focus();
        });
    };
})

app.factory('appCache', function ($cacheFactory) {
    return $cacheFactory('appCache', { Capacity: 10 });
})