const mysql = require('mysql');
//连接数据库Bookshop
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'bookshop'
});
connection.connect();



module.exports = connection;
//要执行的sql语句
// let sql = 'select Cname from account';

//执行sql语句
/**
 * error：获取结果错误
 * results：获取的结果，结果为数组
 * */
// connection.query(sql, function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
//
// });