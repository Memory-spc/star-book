var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/goods',function(req, res, next) {
	//desc降序 asc升序
	//获取对象的key
	// let [goodsName,orderName] = Object.keys(req.query);
	// let name = req.query.name;
	// let order = req.query[orderName];

    connection.query("select * from category", function (error,results,fields) {
		if(error) throw error;
		console.log(results);
		res.send({
			code:"0",
			data:results
		})

    });
});

module.exports = router;
