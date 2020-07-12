function login(){
    var form = document.getElementById("loginform");
    var email =  form.elements["email"].value;
    var password =  form.elements["psw"].value;

    var userLogin = {
            email:email,
            password: password
    }

    fetch("/api/v1/users/login",{
        method:"POST",
        headers :{
            'Content-type':"application/json"
        },

        body: JSON.stringify(userLogin)
    }).then(res => res.json()).then(data =>{
        if(data.message=="Success"){
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "PantherConnect.html";
        }else{
            document.getElementById("login_error").classList.remove("d-none");
        }
    })
    




}