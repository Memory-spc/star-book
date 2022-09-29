const express = require('express');
const server = express();

const cors = require('cors');
server.use(cors());

//1.导入路由模块
const router = require("./router/Router");

server.get("/",function (req,res){
    // res.setHeader('Access-control-allow-origin','*');
    // res.setHeader('Content-Type','text/html;charset=utf-8');
    // res.setHeader('Access-Control-Allow-Origin','*');

    res.send("Hello");
})

//2.使用server.use()函数注册路由模块
server.use(router);


server.listen(8000,()=>{
    console.log("express server run at http://127.0.0.1:8000");
})

































//web服务器模块
// server.get("/",(requuest,response)=>{
//     // 为了防止中文乱码的问题，需设置响应头 Content-type的值为text/html;charset=utf-8
//     response.setHeader('Content-Type','text/html;charset=utf-8');
//
// //    requuest请求对象
//     /**
//      * 如果想要在事件处理函数中，访问与客户端相关的数据或属性，可以使用如下的方式
//      *      request。url：是客户端请求的url
//      *      request。method：是客户端的 method 请求类型
//      */
// //     response响应对象
//     /**
//      * 在服务器request事件处理函数中，如果想访问度武器相关数据或属性，可以使用如下的方式：
//      * response是响应对象，它包含了与服务器相关的数据和属性
//      * response.send()：将处理好的内容，发送给客户端
//      */
//
//
// //    只要客户端来请求我们自己的服务器，就会触发request事件，从而调用这个事件的处理函数
//     console.log('Someone visit our web server.');
// })
//







// var data = null;

//





