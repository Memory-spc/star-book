const express = require('express');
//创建路由对象
const router = express.Router();
// 创建数据库对象
const db = require('../Conn');
const connection = require("../Conn");

//挂载一个主页信息路由
let sql;
router.get("/category",function (req,res){
    sql = "select Name,Image from category";

    connection.query(sql,function (error,results,fields){
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
})

// 登录
router.get("/login",function (req,res){
    // 请求体发送过来的数据 Object
    // console.log(typeof req.query);
    const username = req.query.username;
    const password = req.query.password;
    sql = "select Username,Password from account where Username='"+username+"' and Password = '"+password+"'";
    // sql = "select Username,Password from account";


    connection.query(sql,function (error,results,fields){
        if (error) throw error;
        res.send(JSON.stringify(results));
        // console.log(username);
        // console.log(password);
    });
})

// 注册
router.get('/register',function (req,res){
    let username = req.query.username;
    let password = req.query.password;
    let repassword = req.query.repassword;
    // console.log(req.query)

    sql = "select Username,Password from account where Username='"+username+"' and Password = '"+password+"'";

    connection.query(sql,function (error,results,fields){
        if (error) throw error;
        // console.log(results);
        if(results.length != 0) {
            res.send("0");
        }else{
            sql = "INSERT INTO account (Username,Password) Values ('"+username+"','"+password+"')";
            connection.query(sql,function (error,results,fields){
                if (error) throw error;
                res.send("1");
            })
        }

    });

})

module.exports = router;