function signup(){
    var form = document.getElementById("signup_form");
    var name = form.elements["name"].value;
    var password = form.elements["psw"].value;
    var password_repeat= form.elements["psw-repeat"].value;
    var email = form.elements["email"].value;
    var userToSend = {
            email: email,
            name: name,
            password: password,
            password2: password_repeat
    };
    fetch("/api/v1/users/register",{
        method:"POST",
        headers :{
            'Content-type':"application/json"
        },

        body: JSON.stringify(userToSend)
    }).then(res => res.json()).then(data =>{
        if(data.message=="Success"){
            window.location.href = "LoginPage.html";
        }else{
            document.getElementById("error_signup").classList.remove("d-none");
        }
    })
}