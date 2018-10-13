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
    let errorMsg = document.querySelector("#errorMsg");
    errorMsg.style.display = "none";
    if(username == "" || password == ""){
        alert("username or password field is empty");
        return;
    }
    let obj = JSON.parse('{"username" : "'+username+'","password" : "'+password+'"}');
    $.ajax({
        url: "/login",
        type: "POST",
        dataType: "json",
        data: obj,
        success: function(data){
            if(data[0].rowcount >= 1){
                window.location.href="todo";
            }
            else{
                errorMsg.style.display ="block";
            }
        },
        error: function(err){
            console.log("Error: "+err);
        }
    });
})

var registerLink = document.querySelector("#register");
registerLink.addEventListener("click",function(){
    window.location.href = "register";
})