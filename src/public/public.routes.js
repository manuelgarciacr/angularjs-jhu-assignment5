(function () {
    'use strict';

    angular.module('public')
        .config(routeConfig);

    /**
     * Configures the routes and views
     */
    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider) {
        // Routes
        $stateProvider
            .state('public', {
                abstract: true,
                templateUrl: 'src/public/public.html'
            })
            .state('public.home', {
                url: '/',
                templateUrl: 'src/public/home/home.html'
            })
            .state('public.menu', {
                url: '/menu',
                templateUrl: 'src/public/menu/menu.html',
                controller: 'MenuController',
                controllerAs: 'menuCtrl',
                resolve: {
                    menuCategories: ['MenuService', function (MenuService) {
                        return MenuService.getCategories();
                    }]
                }
            })
            .state('public.menuitems', {
                url: '/menu/{category}',
                templateUrl: 'src/public/menu-items/menu-items.html',
                controller: 'MenuItemsController',
                controllerAs: 'menuItemsCtrl',
                resolve: {
                    menuItems: ['$stateParams', 'MenuService', function ($stateParams, MenuService) {
                        return MenuService.getMenuItems($stateParams.category);
                    }]
                }
            })
            .state('public.signup', {
                url: '/signup',
                templateUrl: 'src/public/signup/signup.html',
                controller: 'SignupController',
                controllerAs: 'signup',
                resolve: {
                    userData: ['UserDataKey', 'DataService', function (UserDataKey, DataService) {
                        return DataService.getData(UserDataKey);
                    }]
                }
            })
            .state('public.info', {
                url: '/info',
                templateUrl: 'src/public/signup/signup.html',
                controller: 'SignupInfoController',
                controllerAs: 'signup',
                resolve: {
                    userData: ['UserDataKey', 'DataService', 
                        '$stateParams', 'MenuService', 
                        function (UserDataKey, DataService, $stateParams, MenuService) {
                            let data;
                            return DataService.getData(UserDataKey)
                            .then(
                                dt => {
                                    console.log("D1", dt)
                                    data = dt;
                                    return MenuService.getMenuItem(data.dish);
                                }
                            ).then(
                                dt => {
                                    console.log("D2", dt)
                                    data.name = dt.name;
                                    data.description = dt.description;
                                    return data;
                                }
                            ).catch(
                                err => {
                                    console.log("Catch: ", err);
                                    return null;
                                }
                            )
                        }
                    ]
                }
            });
    }
})();