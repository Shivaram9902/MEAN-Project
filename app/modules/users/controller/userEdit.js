var app = angular.module('users')
app.controller('UserEditCtrl',UserEditCtrl);

UserEditCtrl.$inject = ['$scope', '$state','userServices','$stateParams'];

function UserEditCtrl($scope,$state,userServices,$stateParams){

    console.log("user edit",$stateParams.username);
    
    userServices.getuserDoc($stateParams.username).then(function(result){
        console.log("result data",result);
        result.data.password = '';
        $scope.registerData = result.data;
    },function(err){
        console.log("error data",err);
    })
    
    $scope.editUser = function(userData){
        console.log("user add ",userData);
        userServices.editUser(userData).then(function(result){
            console.log("checkingg....",result);

            if(result.data[0]){
                $scope.userError =  result.data;
            }else{
                $scope.userError = "edited sucessfully";
            }
        },function(err){
            console.log("checkingg....err",err);        
        });
    }
    
    
}