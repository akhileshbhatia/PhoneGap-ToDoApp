var express = require("express");
var app = express();
var path = require("path");

app.use("/css",express.static(path.join(__dirname,"/css")));
app.use("/js",express.static(path.join(__dirname,"/js")));
app.use("/img",express.static(path.join(__dirname,"/img")));
app.use("/json",express.static(path.join(__dirname,"/json")));

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"/index.html"));
})

app.get("/todo",function(req,res){
    res.sendFile(path.join(__dirname+"/todo.html"));
})

app.listen(3000,function(err){
    if(err){
        console.log("Some error occured");
    }
    else{
        console.log("Server listening on port 3000");
    }
});