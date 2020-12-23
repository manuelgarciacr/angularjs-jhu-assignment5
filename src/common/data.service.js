(function () {
    "use strict";

    angular.module('common')
        .service('DataService', DataService);

    function DataService() {
        var service = this;

        service.getData = function (key) {
            let data = localStorage[key];
            return Promise.resolve(JSON.parse(data || null));
        };

        service.setData = function (key, value) {
            localStorage[key] = JSON.stringify(value);
        }
    }

})();