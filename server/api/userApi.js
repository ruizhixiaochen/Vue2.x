//userApi中的每个函数，连接到sqlMap.js里的一个sql语句进行对数据库的操作
//userApi.js
var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()
//用户部分
router.post('/userLogin', (req, res) => {
	var sql = $sql.user.login
	var name = req.body.name
	var password = req.body.password
	conn.query(sql, [name, password], function(err, result) {
		if (err) {
			console.log(err)
		}
		if (result) {
			res.json(result)
		}
	})
})

router.post('/userAdd', (req, res) => {
	//检查
	var sql1 = $sql.user.check
	//注册
	var sql2 = $sql.user.add
	var name = req.body.name
	var password = req.body.password
	//检查
	conn.query(sql1, [name], function(err, result) {
		if (err) {
			console.log(err)
		}
		if (result) {
			if (result.length === 0) {
				conn.query(sql2, [name, password], function(err, result) {
					if (err) {
						console.log(err)
					}
					if (result) {
						res.json('注册成功')
					}
				})
			} else {
				res.json('用户已存在')
			}
		} else {
			res.json('注册失败')
		}
	})
})
//地址部分
router.post('/addressAdd', (req, res) => {
	var sql = $sql.address.add
	var id = req.body.id
	var name = req.body.name
	var phone = req.body.phone
	var areaCode = req.body.areaCode
	var landLine = req.body.landLine
	var provinceId = req.body.provinceId
	var province = req.body.province
	var cityId = req.body.cityId
	var city = req.body.city
	var countyId = req.body.countyId
	var county = req.body.county
	var add = req.body.add
	var df = req.body.df
	var checked = req.body.checked
	conn.query(sql, [id, name, phone, areaCode, landLine, provinceId, province, cityId, city, countyId, county, add, df, checked], function(err, result) {
		if (err) {
			console.log(err)
		}
		if (result) {
			res.json(result)
		}
	})
})

router.post('/addressSearch', (req, res) => {
	var sql = $sql.address.search
	var id = req.body.id
	conn.query(sql, [id], function(err, result) {
		if (err) {
			console.log(err)
		}
		if (result) {
			res.json(result)
		}
	})
})

router.post('/addressDelete', (req, res) => {
	var sql = $sql.address.del
	var id = req.body.id
	var name = req.body.name
	var phone = req.body.phone
	var areaCode = req.body.areaCode
	var landLine = req.body.landLine
	var county = req.body.county
	var add = req.body.add
	var df = req.body.df
	conn.query(sql, [id, name, phone, areaCode, landLine, county, add, df], function(err, result) {
		if (err) {
			console.log(err)
		}
		if (result) {
			res.json(result)
		}
	})
})
//修改默认标识
router.post('/addressDefault', (req, res) => {
	var sql = $sql.address.updateDf
	var id = req.body.id
	var f = req.body.f
	var t = req.body.t
	conn.query(sql, [f, id, t], function(err, result) {
		if (err) {
			console.log(err)
		}
		if (result) {
			res.json(result)
		}
	})
})

router.post('/addressModifyDf', (req, res) => {
	var sql = $sql.address.modifyDf
	var t = req.body.t
	var id = req.body.id
	var name = req.body.name
	var phone = req.body.phone
	var areaCode = req.body.areaCode
	var landLine = req.body.landLine
	var county = req.body.county
	var add = req.body.add
	var df = req.body.df
	conn.query(sql, [t, id, name, phone, areaCode, landLine, county, add, df], function(err, result) {
		if (err) {
			console.log(err)
		}
		if (result) {
			res.json(result)
		}
	})
})
//修改地址(替换)
router.post('/addressModify', (req, res) => {
	var sql = $sql.address.modify
	var name = req.body.name
	var phone = req.body.phone
	var areaCode = req.body.areaCode
	var landLine = req.body.landLine
	var provinceId = req.body.provinceId
	var province = req.body.province
	var cityId = req.body.cityId
	var city = req.body.city
	var countyId = req.body.countyId
	var county = req.body.county
	var add = req.body.add
	var df = req.body.df
	var checked = req.body.checked
	//旧部分验证
	var id = req.body.id
	var oldName = req.body.oldName
	var oldPhone = req.body.oldPhone
	var oldAreaCode = req.body.oldAreaCode
	var oldLandLine = req.body.oldLandLine
	var oldCounty = req.body.oldCounty
	var oldAdd = req.body.oldAdd
	var oldDf = req.body.oldDf
	var oldChecked = req.body.oldChecked
	conn.query(sql, [name, phone, areaCode, landLine, provinceId, province, cityId, city, countyId, county, add, df, checked, id, oldName, oldPhone, oldAreaCode, oldLandLine, oldCounty, oldAdd, oldDf, oldChecked], function(err, result) {
		if (err) {
			console.log(err)
		}
		if (result) {
			res.json(result)
		}
	})
})
//订单部分
//加入订单
router.post('/orderAdd', (req, res) => {
	var sql = $sql.order.add
	var id = req.body.id
	var name = req.body.name
	var phone = req.body.phone
	var areaCode = req.body.areaCode
	var landLine = req.body.landLine
	var provinceId = req.body.provinceId
	var province = req.body.province
	var cityId = req.body.cityId
	var city = req.body.city
	var countyId = req.body.countyId
	var county = req.body.county
	var add = req.body.add
	var df = req.body.df
	var checked = req.body.checked
	//以上为receiveInfo
	var freight = req.body.freight
	var iDate = req.body.iDate
	var invoiceName = req.body.invoiceName
	var isPay = req.body.isPay
	var orderId = req.body.orderId
	var price = req.body.price
	conn.query(sql, [id, name, phone, areaCode, landLine, provinceId, province, cityId, city, countyId, county, add, df, checked, freight, iDate, invoiceName, isPay, orderId, price], function(err, result) {
		if (err) {
			console.log(err)
		}
		if (result) {
			res.json(result)
		}
	})
})
//获取订单
router.post('/orderSearch', (req, res) => {
	var sql = $sql.order.search
	var id = req.body.id
	conn.query(sql, [id], function(err, result) {
		if (err) {
			console.log(err)
		}
		if (result) {
			res.json(result)
		}
	})
})
//确认付款
router.post('/orderisPay', (req, res) => {
	var sql = $sql.order.check
	var t = req.body.t
	var id = req.body.user_id
	var orderId = req.body.order_id
	conn.query(sql, [t, id, orderId], function(err, result) {
		if (err) {
			console.log(err)
		}
		if (result) {
			res.json(result)
		}
	})
})
//加入订单货物
router.post('/goodAdd', (req, res) => {
	var sql = $sql.order.addGood
	var id = req.body.id
	var orderId = req.body.orderId
	var ali_image = req.body.ali_image
	var checked = req.body.checked
	var count = req.body.count
	var limit_num = req.body.limit_num
	var price = req.body.price
	var sku_id = req.body.sku_id
	var spec_json_image = req.body.spec_json_image
	var spec_json_show_name = req.body.spec_json_show_name
	var sub_title = req.body.sub_title
	var title = req.body.title
	
	conn.query(sql, [id, orderId, ali_image, checked, count, limit_num, price, sku_id, spec_json_image, spec_json_show_name, sub_title, title], function(err, result) {
		if (err) {
			console.log(err)
		}
		if (result) {
			res.json(result)
		}
	})
})
//获取货物信息
router.post('/goodSearch', (req, res) => {
	var sql = $sql.order.searchGood
	var id = req.body.id
	var orderId = req.body.orderId
	conn.query(sql, [id, orderId], function(err, result) {
		if (err) {
			console.log(err)
		}
		if (result) {
			res.json(result)
		}
	})
})
module.exports = router
