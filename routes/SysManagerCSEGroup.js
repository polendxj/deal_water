/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()
router.post('/cseGroup/list', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/cse_group?recurse', 'GET', '', req, resp, function (json) {
        if (json == "-10000" || json.length == 0) {
            resp.send([])
        } else {
            var count = 0;
            json.forEach(function (val, key) {
                (function (v) {
                    var obj = JSON.parse(val.Value ? ExceptionUtils.DecodeBase64(val.Value) : "");
                    RequestApi.Request(consulURL + '/v1/kv/cloud_app/' + obj.appId + '/basic_info', 'GET', '', req, resp, function (appJson) {
                        appJson.forEach(function (app, appKey) {
                            var appObj = JSON.parse(app.Value ? ExceptionUtils.DecodeBase64(app.Value) : "");
                            v["appInfo"] = appObj;
                            count++;
                            if (count == (json.length * 2)) {
                                resp.send(json)
                            }
                        })
                    })
                    RequestApi.Request(consulURL + '/v1/kv/streamingTemplate/' + obj.streamingProfileId, 'GET', '', req, resp, function (profileJson) {
                        profileJson.forEach(function (profile, profileKey) {
                            var profileObj = JSON.parse(profile.Value ? ExceptionUtils.DecodeBase64(profile.Value) : "");
                            v["profileInfo"] = profileObj;
                            count++;
                            if (count == (json.length * 2)) {
                                resp.send(json)
                            }
                        })
                    })
                })(val)
            })
        }
    });

});

router.post('/cseGroup/save', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/cse_group/' + data.groupName + '/basic_info', 'PUT', req.body.data, req, resp, function (json) {
        if (json) {
            // resp.send({result: "SUCCESS"})
            RequestApi.Request(consulURL + '/v1/kv/cse/?recurse', 'GET', '', req, resp, function (cseJson) {
                if (cseJson != "-10000" || cseJson.length > 0) {
                    var optCSE = [];
                    cseJson.forEach(function (cse, cseKey) {
                        var obj = JSON.parse(cse.Value ? ExceptionUtils.DecodeBase64(cse.Value) : "");
                        if (obj.groupId == data.groupName) {
                            var flag = false;
                            data.cses.forEach(function (c, k) {
                                var o = JSON.parse(c.Value ? ExceptionUtils.DecodeBase64(c.Value) : "");
                                if (obj.serverIp == o.serverIp) {
                                    flag = true;
                                }
                            })
                            if (!flag) {
                                optCSE.push(obj)
                            }

                        }
                    })
                    if (optCSE.length > 0) {
                        optCSE.forEach(function (opt, optKey) {
                            var count = 0;
                            (function (o) {
                                o.groupId = "";
                                RequestApi.Request(consulURL + '/v1/kv/cse/' + o.serverIp + '/basic_info', 'PUT', JSON.stringify(o), req, resp, function (json) {
                                    count++;
                                    if (count == optCSE.length) {
                                        if (data.cses.length > 0) {
                                            data.cses.forEach(function (opt1, optKey) {
                                                var count = 0;
                                                (function (o1) {
                                                    var obj = JSON.parse(o1.Value ? ExceptionUtils.DecodeBase64(o1.Value) : "");
                                                    var exist = false;
                                                    data.oldCSES.forEach(function (oldCSE) {
                                                        var oldObj = JSON.parse(oldCSE.Value ? ExceptionUtils.DecodeBase64(oldCSE.Value) : "");
                                                        if (oldObj.serverIp == obj.serverIp) {
                                                            exist = true;
                                                        }
                                                    })
                                                    obj.groupId = data.groupName;
                                                    if (!exist || data.ifConfig) {
                                                        obj.configStatus = 1;
                                                        obj.lastConfigUpdateTime = ExceptionUtils.FormatDate(new Date);
                                                    }
                                                    obj.groupId = data.groupName;
                                                    RequestApi.Request(consulURL + '/v1/kv/cse/' + obj.serverIp + '/basic_info', 'PUT', JSON.stringify(obj), req, resp, function (json) {
                                                        count++;
                                                        if (count == data.cses.length) {
                                                            resp.send({result: "SUCCESS"});
                                                        }
                                                    })
                                                })(opt1)
                                            })
                                        } else {
                                            resp.send({result: "SUCCESS"});
                                        }

                                    }
                                })
                            })(opt)
                        })
                    } else {
                        if (data.cses.length > 0) {
                            data.cses.forEach(function (opt, optKey) {
                                var count = 0;
                                (function (o) {
                                    var obj = JSON.parse(o.Value ? ExceptionUtils.DecodeBase64(o.Value) : "");
                                    var exist = false;
                                    data.oldCSES.forEach(function (oldCSE) {
                                        var oldObj = JSON.parse(oldCSE.Value ? ExceptionUtils.DecodeBase64(oldCSE.Value) : "");
                                        if (oldObj.serverIp == obj.serverIp) {
                                            exist = true;
                                        }
                                    })
                                    obj.groupId = data.groupName;
                                    if (!exist || data.ifConfig) {
                                        obj.configStatus = 1;
                                        obj.lastConfigUpdateTime = ExceptionUtils.FormatDate(new Date);
                                    }
                                    RequestApi.Request(consulURL + '/v1/kv/cse/' + obj.serverIp + '/basic_info', 'PUT', JSON.stringify(obj), req, resp, function (json) {
                                        count++;
                                        if (count == data.cses.length) {
                                            resp.send({result: "SUCCESS"});
                                        }
                                    })
                                })(opt)
                            })
                        } else {
                            resp.send({result: "SUCCESS"});
                        }

                    }


                } else {
                    resp.send({result: "SUCCESS"})
                }

            })

        } else {
            resp.send({result: "failure"})
        }
    });

});

router.post('/cseGroup/detail', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/cse_group/' + data.groupName + "/basic_info?recurse", 'GET', '', req, resp);
});

router.post('/cseGroup/delete', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        console.log(data)
        fetch(baseURL + '/cseGroup/delete.do',
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
    }, resp)

});

module.exports = router