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
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
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

// 新闻api
router.get('/yyt/cj/api', function(req, res, next) {
	//从连接池获取连接 
	pool.getConnection(function(err, connection) { 
		// 获取前台页面传过来的参数  
 		var param = req.query || req.params;   
		// 建立连接 增加一个用户信息 
		var pages,
		cupages = parseInt(param.currentPage) || 1,
		returnpage = parseInt(param.returnPage) || 10;
		connection.query(userSQL.querypages, function(err, result) {
			pages = Math.ceil(result.length/returnpage);
		});
		connection.query(userSQL.queryAll, [(cupages-1)*returnpage,returnpage], function(err, result) {
			var data = result;
			connection.query(userSQL.queryImg, function(err, result) {
				var Img = result;
				if(Object.keys(param).length > 1 ) {
					if(result) {      
			             result = {   
			                code: 200,   
			                msg:'请求成功',
			                AllPages: pages,
			                CurrentPages: cupages,
			                items: data
			             };  
			        }
			        for(var i = 0; i < result.items.length; i++) {
			        	result.items[i].images = result.items[i].images.split("#");
			        }
				}else {
					result = {   
		                code: 201,   
		                msg:'参数错误',
		            }
				}
	     		// 以json形式，把操作结果返回给前台页面     
	       		responseJSON(res, result);   

	     		// 释放连接  
	      		connection.release(); 
	      	});
       });
	});
});

// admin api
router.get('/yyt/cj/admin/api', function(req, res, next) {
	//从连接池获取连接 
	pool.getConnection(function(err, connection) { 
		// 获取前台页面传过来的参数  
 		var param = req.query || req.params;   
		// 建立连接 增加一个用户信息 
		var pages,
		cupages = parseInt(param.currentPage) || 1,
		returnpage = parseInt(param.returnPage) || 10;
		connection.query(userSQL.querypages, function(err, result) {
			pages = Math.ceil(result.length/returnpage);
		});
		connection.query(userSQL.queryAdmin, [(cupages-1)*returnpage,returnpage], function(err, result) {
			var data = result;
			connection.query(userSQL.queryImg, function(err, result) {
				var Img = result;
				if(Object.keys(param).length > 1 ) {
					if(result) {      
			             result = {   
			                code: 200,   
			                msg:'请求成功',
			                AllPages: pages,
			                CurrentPages: cupages,
			                items: data
			             };  
			        }
			        for(var i = 0; i < result.items.length; i++) {
			        	result.items[i].images = result.items[i].images.split("#");
			        }
				}else {
					result = {   
		                code: 201,   
		                msg:'参数错误',
		            }
				}
	     		// 以json形式，把操作结果返回给前台页面     
	       		responseJSON(res, result);   

	     		// 释放连接  
	      		connection.release(); 
	      	});
       });
	});
});

// add - api
router.get('/yyt/cj/add', function(req, res, next) {
	var datas;
	pool.getConnection(function(err, connection) { 
		// 获取前台页面传过来的参数  
 		var param = req.query || req.params;
 		datas = param.datas;
 		connection.query(userSQL.insert, datas,function(err, result) {
			if(result) {      
	             result = {   
	                code: 200,   
	                msg:'添加成功'
	             };  
	        }
	        // 以json形式，把操作结果返回给前台页面     
       		responseJSON(res, result);   

     		// 释放连接  
      		connection.release();
		});

	})
		
  // res.json();
});

module.exports = router;
