"use strict"

const userForm = new  UserForm();

userForm.loginFormCallback = data => ApiConnector.login(data, response => {
    if(response.success) {
        console.log(data);
        location.reload();
    } else {
        userForm.setLoginErrorMessage("Не верно указан логин или пароль")
    }
});
userForm.registerFormCallback = data => ApiConnector.register(data,  response => location.reload());