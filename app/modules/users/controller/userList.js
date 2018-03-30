var app = angular.module('users')
app.controller('UserListCtrl',UserListCtrl);

UserListCtrl.$inject = ['$scope', '$state','userServices'];
function UserListCtrl($scope,$state,userServices){

    
    userServices.getUserList().then(function(result){
        console.log("checkingg....",result);
        $scope.userList =result.data;
    },function(err){
        console.log("checkingg....err",err);        
    });

    
}
