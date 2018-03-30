angular.module("users",[]);

var app = angular.module("MEAN",['ui.router','ngCookies','ui.utils','ui.validate','users']);
app.run(['$rootScope', '$state', '$location', '$cookieStore', '$http', '$stateParams', 'userServices','$window', function ($rootScope, $state, $location, $cookieStore, $http, $stateParams, userServices,$window){
      console.log("run is executing");
      $rootScope.$state = $state;
      $rootScope.siteglobals = $cookieStore.get('siteglobals') || {};
     // $rootScope.userglobals = $cookieStore.get('userdata');
      console.log("$rootScope.userglobals-->>>",$cookieStore.get('userdata'));
      if ($rootScope.siteglobals.currentUser ) {
        $http.defaults.headers.common['Authorization'] = $rootScope.siteglobals.currentUser.authdata;
        
        // userServices.getCurrentUsers($rootScope.siteglobals.currentUser.username)
        //     .then(function (result) {
        //         if (typeof $rootScope.currentUser == 'wrong') {
        //             $window.location.href = '/login';
        //         } else {
        //             MainService.setCurrentUserValue(result[0]);
        //         }
        //     }, function (error) {
        //         toastr.error('Server Down !');
        //     });
      }else{
                    $window.location.href = 'http://localhost:3000/#!/login';
                    // $state.go('login')
      }


      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        $rootScope.siteglobals = $cookieStore.get('siteglobals') || {};

        if (toState.registerauth && !$rootScope.siteglobals.currentUser) {
          $state.transitionTo("login");
          event.preventDefault();
        }

        console.log("state changed to ",toState)
      });
}] );
app.config(['$stateProvider','$urlRouterProvider','$qProvider',function($stateProvider,$urlRouterProvider,$qProvider){

     $qProvider.errorOnUnhandledRejections(false);
     $urlRouterProvider.otherwise('/admin/dashboard');

     $stateProvider
            .state('admin',{
                url:'/admin',
                templateUrl:'app/modules/common/view/admin.html'
            })
            .state('admin.dashboard',{
                url:'/dashboard',
                registerauth:true,
                templateUrl:'app/modules/dashboard/view/dashboard.html',
                controller:function($scope,userServices){
                  $scope.getuserData = function(){
                    userServices.getUsers().then(function(result){
                      console.log("checking.. users",result);
                    },function(err){
                      console.log("checking.. error",err);
                    })
                  }
                }
         
            })  
            .state('admin.user',{
                url:'/user',
                registerauth:true,
                template:'<div ui-view></div>',
            })
            .state('admin.user.userList',{
              url:'/userList',
              templateUrl:'app/modules/users/view/userList.html',
              controller:UserListCtrl
            })   
            .state('admin.user.userAdd',{
              url:'/userAdd',
              templateUrl:'app/modules/users/view/userAdd.html',
              controller:UserAddCtrl
            })
            .state('admin.user.userEdit',{
              url:'/userEdit/:username',
              registerauth:true,
              templateUrl:'app/modules/users/view/userEdit.html',
              controller:UserEditCtrl
            })      
            .state('login',{
               url:'/login',               
               templateUrl:'app/modules/users/view/login.html',
               controller:'loginCtrl'
           })
           .state('register',{
                url:'/register',               
                templateUrl:'app/modules/users/view/register.html',
                controller:'registerCtrl'
            })
            
}]).directive('sidebar',[function() {
    return {
      templateUrl:'app/modules/common/view/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope){
        $scope.selectedMenu = 'dashboard';
        $scope.collapseVar = 0;
        $scope.multiCollapseVar = 0;
        
        $scope.check = function(x){
          console.log("collapse check....");
          if(x==$scope.collapseVar)
            $scope.collapseVar = 0;
          else
            $scope.collapseVar = x;
        };
        
        $scope.multiCheck = function(y){
          
          if(y==$scope.multiCollapseVar)
            $scope.multiCollapseVar = 0;
          else
            $scope.multiCollapseVar = y;
        };
      }
    }
  }]);

app.controller("mainCtrl", function ($scope,userServices,$state) {
    $scope.name = "Hello Angularjs"

    $scope.logout = function(){
      console.log("logout called");
      userServices.logout().then(function(result){
          console.log("result",result);
          //$state.go("login");
          $state.transitionTo("login");
      },function(err){
        console.log("error",err);
      })
    }
});