var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/config');
var userSQL = require('../db/usersql');


// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

// 响应一个JSON数据
var responseJSON = function (res, ret) {
     if(typeof ret === 'undefined') { 
          res.json({
          	code:'-200',
          	msg: '操作失败'   
        }); 
    } else { 
      res.json(ret); 
      res.end();
  	}
};

/* GET home page. */
router.get('/yyt/cj', function(req, res, next) {
	var result = {"baseResponse": { "code": 200, "msg": "成功" },"items":[{"type":"CJ","data":{"title": "跑团缺席","infro":"","resource": "幂动科技","detailUrl": "https://awtmt.com/articles/3364282", "images":["http://img.tuku.cn/file_thumb/201503/m2015031016500369.jpg","http://old.bz55.com/uploads/allimg/120804/1-120P4092145.jpg","http://b.hiphotos.baidu.com/zhidao/pic/item/9358d109b3de9c82f897b2246c81800a18d843ae.jpg"]}}]};
	responseJSON(res,result);
  // res.json();
});

router.get('/yyt/cj/api', function(req, res, next) {
	//从连接池获取连接 
	pool.getConnection(function(err, connection) { 
		// 获取前台页面传过来的参数  
 		var param = req.query || req.params;   
		// 建立连接 增加一个用户信息 
		connection.query(userSQL.queryAll, function(err, result) {
			console.log("66666");
	        if(result) {      
	             result = {   
	                code: 200,   
	                msg:'请求成功',
	                items: result
	             };  
	        }      
     		// 以json形式，把操作结果返回给前台页面     
       		responseJSON(res, result);   

     		// 释放连接  
      		connection.release(); 
       });
	});
});

module.exports = router;
