var createUserBtn = document.querySelector("#createUserBtn");
createUserBtn.addEventListener("click",function(){
    let username = document.querySelector("#username").value.trim().toLowerCase();
    let password = document.querySelector("#password").value.trim();
    if(username == "" || password == ""){
        alert("username or password field is empty");
        return;
    }
    let obj = JSON.parse('{"username" : "'+username+'","password" : "'+password+'"}');
    $.ajax({
        url: "/register",
        type: "POST",
        dataType: "json",
        data: obj,
        success: function(data){
           if(data.msg == "User already exists"){
               alert("Username already exists. Please select a new username.");
           }
           else{
               alert("User created successfully. You will now be redirected to login page.");
               window.location.href = "/";
           }
        },
        error: function(err){
            console.dir("Error: "+err);
        }
    });
})