var express = require('express');
var router = express.Router();


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

module.exports = router;
