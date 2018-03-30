var app = angular.module('users')
app.controller('registerCtrl',registerCtrl);

registerCtrl.$inject = ['$scope', '$state','userServices'];
function registerCtrl($scope,$state,userServices){

    $scope.registerSubmit = function(regData){
        userServices.registerUser(regData).then(function(result){
            if(result.data.user==regData.username && !angular.isUndefined(username) && !angular.isUndefined(result.data.user)){
                console.log("success case");
                userServices.SetUserCookie(result.data.user,result.data.token);
                $state.go('admin.dashboard');      
            }else{
                console.log("else checking.....",result);
               $scope.errorMsg = "Invalid credentials"; 
               $state.go('login');     
            }  
        },function(err){

        })
    }
}