var app = angular.module('users')
app.controller('loginCtrl',loginCtrl);

loginCtrl.$inject = ['$scope', '$state','userServices'];
function loginCtrl($scope,$state,userServices){
    console.log('Login action is continued...');
    // $scope.username = "nodejs"

    // $scope.$watch('username', function (newValue, oldValue, scope) {
    //     console.log("newValue, oldValue-->>>",newValue, oldValue);
    // });


    $scope.login=function(username,passw){
        console.log('Login authentication is continued===>>',username,passw);

        // $scope.$apply(function() {
        //     console.log("update time clicked");
        //     $scope.username = "angularjs"
        // });
        
        userServices.loginUser(username,passw).then(function(result){
            console.log('user data response',result.data.user,username);
            if(result.data.user==username && !angular.isUndefined(username) && !angular.isUndefined(result.data.user)){
                console.log("success case");
                userServices.SetUserCookie(result.data.user,result.data.token);
                $state.go('admin.dashboard');      
            }else{
                console.log("else checking.....",result);
               $scope.errorMsg = "Invalid credentials"; 
               $state.go('login');     
            //    $location.path('/login');
            }  
        },function(err){
            console.log('error ctrl',err); 
            $scope.errorMsg="Something went wrong...please try again!!!"; 
            $state.go('login'); 
        });            
    }
    
};