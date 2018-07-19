var UserSQL = {  
	insert:'INSERT INTO user(id,name) VALUES(?,?)', 
	queryAll:'SELECT * FROM htt_tab_dynamic_list', 
	queryImg:'SELECT images FROM htt_tab_dynamic_list', 
	getUserById:'SELECT * FROM user WHERE id = ? ',
	getUserByName:'SELECT * FROM user WHERE name = ? ',
};
module.exports = UserSQL;