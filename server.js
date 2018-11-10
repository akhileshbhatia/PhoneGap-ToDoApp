var express = require("express");
var app = express();
var path = require("path");
var mysql = require("mysql");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "tododb.c9wuk4dpupwy.eu-west-1.rds.amazonaws.com",
    user: "akhilesh",
    password: "12345678",
    database: "ebdb"
});

con.connect(function(err){
    if(err){
        console.log("Error occured in connection "+err);
    }
    else{
        console.log("Database connected :)");
    }
})

app.use("/css",express.static(path.join(__dirname,"/css")));
app.use("/js",express.static(path.join(__dirname,"/js")));
app.use("/img",express.static(path.join(__dirname,"/img")));
app.use("/videos",express.static(path.join(__dirname,"/videos")));

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"/index.html"));
})

app.get("/todo",function(req,res){
    res.sendFile(path.join(__dirname+"/todo.html"));
})

app.get("/playVideo",function(req,res){
    res.sendFile(path.join(__dirname+"/video.html"));
})

app.post("/login",function(req,res){
    let sql = "SELECT userid FROM user_credentials WHERE username = '"+req.body.username+
              "' and password = '"+req.body.password + "'";
    con.query(sql,function(err,result){
        if(err){
            res.send("error received: "+err);
        }
        else{
            if(result.length == 0){
                res.send(JSON.parse('{"msg" : "User does not exist"}'));
            }
            else{
                res.send(JSON.parse('{"msg" : "'+result[0].userid+'"}'));
            }
        }
    })
})

app.get("/register",function(req,res){
    res.sendFile(path.join(__dirname+"/register.html"));
})

app.post("/register",function(req,res){
    let sql = "SELECT count(*) as rowcount FROM user_credentials WHERE username = '"+req.body.username+"'";
    con.query(sql,function(err,result){
        if(err){
            res.send("Error received: "+err);
        }
        else{
            if(result[0].rowcount >= 1){
                res.send(JSON.parse('{"msg" : "User already exists"}'));
            }
            else{
                sql = "INSERT INTO user_credentials (username,password) "+
                       "VALUES ('"+req.body.username+"' , '"+req.body.password+"')";
                con.query(sql,function(err,result){
                    if(err){
                        res.send("Error received: "+err);
                    }
                    else{
                        sql = "SELECT last_insert_id() as lastInsertId";
                        con.query(sql,function(err,result){
                            if(err){
                                res.send("Error receieved: "+err);
                            }
                            else{
                                res.send(JSON.parse('{"msg" : "'+result[0].lastInsertId+'"}'));
                            }
                        })
                    }
                })
            }
        }
    })
})

app.post("/addTask",function(req,res){
    let sql = "INSERT INTO user_tasks(taskName,taskDesc,taskDate,userid) "+
              "VALUES ('"+req.body.taskName+"','"+req.body.taskDesc+"','"+req.body.taskDate+"',"+
               req.body.userid+")";
    con.query(sql,function(err,result){
        if(err){
            res.send("Error received: "+err);
        }
        else{
            res.send(JSON.parse('{"msg" : "Task added successfully"}'));
        }
    })
})

app.get("/getTask",function(req,res){
    let sql = "SELECT taskName,taskDate,taskDesc from user_tasks where userid = "+req.query.userid;
    con.query(sql,function(err,result){
        if(err){
            res.send("Error received: "+err);
        }
        else{
            res.send(result);
        }
    })
})

var port = process.env.PORT || 3000;
app.listen(port,function(err){
    if(err){
        console.log("Some error occured");
    }
    else{
        console.log("Server listening on port "+port);
    }
});