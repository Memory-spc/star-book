var express = require("express");
var app = express();

app.get("/", function (require,response){

    response.writeHead(200, {'Content-Type': 'text/plain'});
    // response.writeHead(200,{"Access-Control-Allow-Origin":"*"});
    response.writeHead(200,{"Access-Control-Allow-Origin":"*"});

    // response.writeHead("Access-Control-Allow-Origin","*");

    response.send("Hellow world");
});

app.listen(80,function (){
    console.log("Server run at http://127.0.0.1:8000");
})

