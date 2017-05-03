/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()
router.post('/appByConsul/list', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/cloud_app?recurse', 'GET', '', req, resp);

});

router.post('/subAppByConsul/list', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/cloud_app/' + data.appId + '/subapp_info?recurse', 'GET', '', req, resp);

});

router.post('/appByConsul/save', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/cloud_app/' + data.appId + '/basic_info', 'PUT', req.body.data, req, resp, function (json) {
        if (json) {
            resp.send({result: "SUCCESS"})
        } else {
            resp.send({result: "failure"})
        }
    });

});

router.post('/subAppByConsul/save', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/cloud_app/' + data.appId + '/subapp_info/' + data.subAppId, 'PUT', req.body.data, req, resp, function (json) {
        if (json) {
            resp.send({result: "SUCCESS"})
        } else {
            resp.send({result: "failure"})
        }
    });

});


router.post('/appByConsul/detail', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/cloud_app/' + data.appId + '/basic_info', 'GET', '', req, resp);

});

router.post('/appByConsul/delete', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/cloud_app/' + data.appId + "?recurse", 'DELETE', '', req, resp, function (json) {
        if (json) {
            resp.send({result: "SUCCESS"})
        } else {
            resp.send({result: "failure"})
        }
    });

});

router.post('/subAppByConsul/delete', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/cloud_app/' + data.appId + "/subapp_info/"+ data.subAppId +"?recurse", 'DELETE', '', req, resp, function (json) {
        if (json) {
            resp.send({result: "SUCCESS"})
        } else {
            resp.send({result: "failure"})
        }
    });

});


module.exports = router