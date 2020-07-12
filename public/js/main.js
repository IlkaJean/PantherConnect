function docReady(fn) {
    console.log("executed")
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function() {
    var user = JSON.parse(localStorage.getItem("user"));
    var span = document.getElementById("name_span");
    if (!user){
        span.innerHTML = "<a href='LoginPage.html'>Login, please</a>";
    } else{
        span.innerText = user.name;
    }
    
    
});

function logout(){
    fetch("/api/v1/users/logout").then(res => res.json()).then(data =>{
        if(data.message=="Success"){
            localStorage.removeItem("user");
            window.location.href = "LoginPage.html";
        }else{
            document.getElementById("login_error").classList.remove("d-none");
        }
    })
  };