(function () {
    "use strict";

    angular.module('common')
        .directive('dishcode', DishCode);

    DishCode.$inject = ['MenuService', '$q']
    function DishCode(MenuService, $q) {
        
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$asyncValidators.dishcode = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                      // consider empty model invalid
                      return $q.reject();
                    }
            
                    var def = $q.defer();
                    MenuService.getMenuItem(modelValue).then(data => {
                        def.resolve();
                    }).catch(err => {
                        def.reject();
                    });
                    return def.promise;
                  };
            }
        };
    }

})();