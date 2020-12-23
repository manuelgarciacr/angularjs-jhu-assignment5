(function () {
    "use strict";

    angular.module('public')
        .controller('SignupController', SignupController);

    SignupController.$inject=['UserDataKey', 'DataService', 'userData'];
    function SignupController(UserDataKey, DataService, userData) {
        var signup = this;
        signup.user = userData || {};

        signup.submit = function () {
            signup.completed = true;
            signup.user.dish = signup.user.dish.toUpperCase();
            DataService.setData(UserDataKey, signup.user);
        };

        signup.reset  = function () {
            signup.completed = false;
        }
    }

})();
