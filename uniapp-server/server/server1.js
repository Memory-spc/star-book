
var http = require('http');
// let reques,respons;

http.createServer(function (request, response) {
    // Access- control - allow - origin
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.writeHead(200,{"Access-Control-Allow-Origin":"*"});
    // const data = [
    //     {
    //             id:1,
    //             name:"张三",
    //             age:12
    //         },
    //         {
    //             id:2,
    //             name:"李四",
    //             age:14
    //         },
    //         {
    //             id:3,
    //             name:"王五",
    //             age:18
    //         }
    // ];

    const data = request.body;
    console.log(data);
    // 发送响应数据 "Hello World"
    response.end(JSON.stringify(data));
    // response.end(JSON.stringify(request.body));

}).listen(8888);
