var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

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
            window.location.href = "todo";
        }
        else{
            alert("Incorrect password. Please enter the correct password.");
        }
    }
})