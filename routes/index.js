var express = require('express');
var card = require('../api/card');
var router = express.Router();

/* GET  page. */
router.get('/', function(req, res, next) {
  	res.render('index', {
  		title : '主页'
  	})
});
router.get('/login', function(req, res, next) {
  	res.render('login', {
  		title : '登录'
  	})
});
router.get('/index', function(req, res, next) {
  	res.render('index', {
  		title : '主页'
  	})
});
/* api */
router.get('/getCode/:tel', function(req, res, next) {
	card.sendSms(req.params.tel, function(data) {
		res.json({
			status : 1,
			data : data
		})
	})
});

/**
 * 登录获取cookie
 */
router.post('/logins', function(req, res, next) {
	card.login(req.body, function(data) {
		res.json({
			status : 1,
			data : data
		})
	})
});
/**
 * 登录获取cookie
 */
router.post('/card', function(req, res, next) {
	card.punch(req.body, function(data) {
		console.log(data);
		res.json({
			status : 1,
			data : data
		})
	})
});
module.exports = router;
