var loginBtn = document.querySelector("#loginBtn");
loginBtn.addEventListener("click",function(){
    let username = document.querySelector("#username").value.trim().toLowerCase();
    let password = document.querySelector("#password").value.trim();

    if(username == "" || password == ""){
        alert("username or password field is empty.");
        return;
    }

    let userInfo = credentials.filter(function(data){
        return data.username == username;
    })

    if(userInfo.length == 0){
        alert("User does not exist. Please try again with a valid username");
    }
    else{
        if(password == userInfo[0].password){
            window.location.href = "todo.html";
        }
        else{
            alert("Incorrect password. Please enter the correct password.");
        }
    }
})