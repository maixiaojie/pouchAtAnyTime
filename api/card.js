var request = require('request');
var CryptoJS = require("crypto-js");
var card = {
    sendSms: function(tel, callback) {
        var sendData = { mobile: tel };
        request.post({url: 'https://e.xinrenxinshi.com/site/ajax-send-sms-code/login', form: sendData },
            function(err, res, body) {
                if (err) throw err;
                callback(body);               
            })
    },
    login : function(data, callback) {
    	var sendData = {
	        'mobile':data.tel,
	        'verify_code':data.code,
	        'verify_code_id':data.code_id,
	        'type':1
	    };
	    request.post({ 
		    	url: 'https://e.xinrenxinshi.com/site/ajax-login',
		    	form: sendData
	    	},
        function(err, response, body) {
            if(err) throw err; 
            var cookieData = response.headers['set-cookie'] || '';
            callback({'body':body, 'cookie': cookieData});       
        })
    },
    punch : function(data, cb) {
        
    	var sendData = {
            accuracy: 199,
    	    latitude : data.latitude,
    	    longitude: data.longitude
    	};
        var l = "longitude=" + sendData.longitude + "&latitude=" + sendData.latitude + "&accuracy=" + sendData.accuracy;
        sendData.signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(l, "xrxs&qjyd"));
    	var cookie = data.cookies;
        console.log(JSON.stringify(sendData))
    	function callback(err, res, body) {
    	    cb(body)
    	};
    	request.post({
    	    url : 'https://e.xinrenxinshi.com/attendance/ajax-sign',
    	    body : JSON.stringify(sendData),
    	    headers : {
    	        Host:'e.xinrenxinshi.com',
    	        Origin:'https://e.xinrenxinshi.com',
    	        Referer:'https://e.xinrenxinshi.com/index',
    	        Cookie : cookie,
    	        'Content-Type': 'application/json;charset=UTF-8',
    	        connection: 'keep-alive',
    	        Accept:'application/json, text/plain, */*',
    	        // 'X-CSRF-TOKEN':'NTRjYTViZDNXUVJUAQdRAwcFBVABUF0BVwJWAwBVVFYGDQYEAFFcAQssss==',
    	        'Accept-Language':'zh-CN,zh;q=0.9',
    	        'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
    	    }
    	}, callback);
    }
}

module.exports = card;