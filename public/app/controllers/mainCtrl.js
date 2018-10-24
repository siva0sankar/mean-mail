angular.module('mainController',['authServices'])

.controller('mainCtrl',function(Auth,$location,$timeout,$rootScope,$window){
    var app = this;

    app.loadme = false;

    $rootScope.$on('$routeChangeStart',function(){
        if(Auth.isLoggedIn()){
            app.isLoggedIn = true;
            Auth.getUser().then(function(data){
                app.username = data.data.username;
                app.useremail = data.data.email;
                app.loadme = true;
            });
        }else{
            app.isLoggedIn = false;
            app.username = '';
            app.useremail = '';
            app.loadme = true;
        }

        if($location.hash() == '_=_') $location.hash(null);
    });

    app.facebook = function(){
        $window.location = $window.location.protocol + '//' + $window.location.host + '/auth/facebook'
    }

    app.doLogin = function(){
        app.loading = true;
        app.errorMsg = false;
        app.successMsg = false;
        Auth.login(app.loginData).then(function(data){
           if(data.data.success){
                app.successMsg = data.data.message + '....Redirecting ....';
                app.loading = false;
                $timeout(function(){
                    $location.path('/about');
                    app.loginData = '';
                    app.successMsg = false;    
                },2000);

           }else{
                app.errorMsg = data.data.message;
                app.loading = false;
           }
        });
    };


    app.logout = function(){
        Auth.logout();
    }
});