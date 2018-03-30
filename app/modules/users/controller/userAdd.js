var app = angular.module('users')
app.controller('UserAddCtrl',UserAddCtrl);

UserAddCtrl.$inject = ['$scope', '$state','userServices'];
function UserAddCtrl($scope,$state,userServices){

    
    
    $scope.addUser = function(userData){
        console.log("user add ",userData);
        userServices.addUser(userData).then(function(result){
            console.log("checkingg....",result);

            if(result.data[0]){
                $scope.userError =  result.data;
            }else{
                $scope.userError = "added sucessfully";
            }
        },function(err){
            console.log("checkingg....err",err);        
        });
    }
    
    
}