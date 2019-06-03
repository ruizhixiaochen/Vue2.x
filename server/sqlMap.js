//sqlMap.js
var sqlMap = {
  user: {
    add: 'insert into user(user_id,user_password) values (?,?)',
    login: 'select * from user where user_id = ? and user_password = ?', //登陆
    check: 'select * from user where user_id = ?'//查找
		
  },
  address: {
    add: 'insert into address(user_id, ad_name, ad_phone, ad_areacode, ad_landline, ad_provinceid, ad_province, ad_cityid, ad_city, ad_countyid, ad_county, ad_add, ad_default, ad_checked) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
	modify: 'update address set ad_name = ?, ad_phone = ?, ad_areacode = ?, ad_landline = ?, ad_provinceid = ?, ad_province = ?, ad_cityid = ?, ad_city = ?, ad_countyid = ?, ad_county = ?, ad_add = ?, ad_default = ?, ad_checked = ? where user_id = ? and ad_name = ? and ad_phone = ? and ad_areacode = ? and ad_landline = ? and ad_county = ? and ad_add = ? and ad_default = ? and ad_checked = ?',
    search: 'select * from address where user_id = ?',
	del: 'delete from address where user_id = ? and ad_name = ? and ad_phone = ? and ad_areacode = ? and ad_landline = ? and ad_county = ? and ad_add = ? and ad_default = ? limit 1',
	updateDf: 'update address set ad_default = ? where user_id = ? and ad_default = ?',
	modifyDf: 'update address set ad_default = ?  where user_id = ? and ad_name = ? and ad_phone = ? and ad_areacode = ? and ad_landline = ? and ad_county = ? and ad_add = ? and ad_default = ?'
  },
  order: {
    add: 'insert into order_base(user_id, ad_name, ad_phone, ad_areacode, ad_landline, ad_provinceid, ad_province, ad_cityid, ad_city, ad_countyid, ad_county, ad_add, ad_default, ad_checked, freight, idate, invoicename, ispay, orderid, price) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    search: 'select * from order_base where user_id = ?', 
    check: 'update order_base set ispay = ?  where user_id = ? and orderid = ?',
  	//购买商品部分
	addGood: 'insert into order_goods(user_id, od_orderId, ali_image, checked, count, limit_num, price, sku_id, spec_json_image, spec_json_show_name, sub_title, title) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
	searchGood: 'select * from order_goods where user_id = ? and od_orderId = ?',
  }
}
module.exports = sqlMap;