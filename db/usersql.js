var UserSQL = {  
	insert:'INSERT INTO htt_tab_dynamic_list(id,title,resource,url,type,images,status,createDate) VALUES(?,?,?,?,?,?,?,NOW())', 
	querypages: 'select id from htt_tab_dynamic_list',
	queryAll:'SELECT id,type,title,info,resource,url,html,status,images FROM htt_tab_dynamic_list limit ?,?', 
	queryAdmin: 'select * from htt_tab_dynamic_list limit ?,?',
	queryImg:'SELECT images FROM htt_tab_dynamic_list', 
	getUserById:'SELECT * FROM user WHERE id = ? ',
	getUserByName:'SELECT * FROM user WHERE name = ? ',
};
module.exports = UserSQL;