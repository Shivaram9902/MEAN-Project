var app = angular.module('users');

app.factory("userServices",function($http,$q,$cookieStore,$rootScope){

    var userServices = {
        "loginUser":loginUser,
        "registerUser":registerUser,
        "GetUserCookie":GetUserCookie,
        "SetUserCookie":SetUserCookie,
        "getUsers":getUsers,
        "logout":logout,
        "getUserList":getUserList,
        "addUser":addUser,
        "getuserDoc":getuserDoc,
        "editUser":editUser
    }

    function loginUser(username,password){
        console.log(username,password);
        var deferred = $q.defer();
        
        $http({
            method: 'POST',
            url: '/login',
            data: {
                 "username":username,
                 "password":password
            }
        }).then(function (data) {
            deferred.resolve(data);
        },function (err) {
            deferred.reject(err);
        });

        return deferred.promise;

    }

    function registerUser(regData){
        console.log(regData);
        var deferred = $q.defer();
        
        $http({
            method: 'POST',
            url: '/register',
            data: regData
        }).then(function (data) {
            console.log("reg data",data);
            deferred.resolve(data);
        },function (err) {
            deferred.reject(err);
        });

        return deferred.promise;

    }

    function logout(){
        var deferred = $q.defer();
        
        $http({
            method: 'GET',
            url: '/logout'
        }).then(function (data) {
            $cookieStore.remove('siteglobals');
            deferred.resolve(data);
        },function (err) {
            deferred.reject(err);
        });

        return deferred.promise;     
    }

    function getUsers(username,password){
        console.log(username,password);
        var deferred = $q.defer();
        
        $http({
            method: 'GET',
            url: '/getUsers'
        }).then(function (data) {
            deferred.resolve(data);
        },function (err) {
            deferred.reject(err);
        });

        return deferred.promise;

    }

    function SetUserCookie(username,token){
        var authdata = token;
        $rootScope.siteglobals = {
            currentUser: {
                username: username,
                authdata: authdata
            }
        };
        //$http.defaults.headers.common['Authorization'] = authdata;
        $cookieStore.put('siteglobals', $rootScope.siteglobals);

    }

    function GetUserCookie(){
        return $rootScope.siteglobals;
    }

    function getUserList(){
      
        var deferred = $q.defer();
        
        $http({
            method: 'GET',
            url: '/getUserList'
        }).then(function (data) {
            deferred.resolve(data);
        },function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }
    
    function addUser(userData){
      
        var deferred = $q.defer();
        
        $http({
            method: 'POST',
            url: '/addUser',
            data:userData
        }).then(function (data) {
            deferred.resolve(data);
        },function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }
    
    function getuserDoc(username){
      
        var deferred = $q.defer();
        
        $http({
            method: 'POST',
            url: '/getuserDoc',
            data:{"username":username}
        }).then(function (data) {
            deferred.resolve(data);
        },function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }
    
    function editUser(editUserData){
      
        var deferred = $q.defer();
        
        $http({
            method: 'POST',
            url: '/editUser',
            data:editUserData
        }).then(function (data) {
            deferred.resolve(data);
        },function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }
    return userServices;

})