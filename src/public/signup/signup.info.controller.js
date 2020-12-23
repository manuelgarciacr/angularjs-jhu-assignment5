(function () {
    "use strict";

    angular.module('public')
        .controller('SignupInfoController', SignupInfoController);

    SignupInfoController.$inject=['UserDataKey', 'DataService', 'userData', 'ApiPath'];
    function SignupInfoController(UserDataKey, DataService, userData, ApiPath) {
        var signup = this;
        signup.info = true;
        signup.apiPath = ApiPath;
        signup.user = userData || {};
console.log("CC:", signup.user)
        signup.submit = function () {
            signup.completed = true;
            DataService.setData(UserDataKey, signup.user);
        };

        signup.reset  = function () {
            signup.completed = false;
        }
    }

})();
