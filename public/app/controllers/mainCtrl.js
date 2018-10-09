angular.module('mainController',['authServices'])

.controller('mainCtrl',function(Auth,$location,$timeout){
    var app = this;

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
                },2000);

           }else{
                app.errorMsg = data.data.message;
                app.loading = false;
           }
        });
    }
});