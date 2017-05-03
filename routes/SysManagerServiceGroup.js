/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()
router.post('/serviceGroup/list', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/service_group?recurse', 'GET', '', req, resp);

});

router.post('/serviceGroup/save', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/service_group/' + data.id + '/basic_info', 'PUT', req.body.data, req, resp, function (json) {
        if (json) {
            resp.send({result: "SUCCESS"})
        } else {
            resp.send({result: "failure"})
        }
    });

});

router.post('/serviceGroup/serviceGroupIdCheck', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/serviceArea/areaNameCheck.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                },
                body: data
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, data)
            })
            .then(function (json) {
                ExceptionUtils.notFalseException(json, resp)
            });
    },resp)

});

router.post('/serviceGroup/detail', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/service_group/' + data.id + '/basic_info', 'GET', '', req, resp);

});

router.post('/serviceGroup/delete', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/service_group/' + data.id + "?recurse", 'DELETE', '', req, resp, function (json) {
        if (json) {
            resp.send({result: "SUCCESS"})
        } else {
            resp.send({result: "failure"})
        }
    });

});

module.exports = router