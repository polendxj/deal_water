/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var router = express()
var RequestApi = require('../utils/RequestApi');
var async = require('async');
router.post('/dedicated/list', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/dedicated/list.do',
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

router.post('/routingRule/list', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/common_router?recurse', 'GET', '', req, resp, function (json) {
        if (json != "-10000" && json.length > 0) {
            async.parallel([
                    function (callback) { //get appInfo
                        var count = 0;
                        json.forEach(function (cr, crKey) {
                            (function (c, k) {
                                var obj = JSON.parse(c.Value ? ExceptionUtils.DecodeBase64(c.Value) : "");
                                RequestApi.Request(consulURL + '/v1/kv/cloud_app/' + obj.appId + '/basic_info', 'GET', '', req, resp, function (appInfo) {
                                    c["appInfo"] = appInfo;
                                    count++;
                                    if (count == json.length) {
                                        callback(null, json);
                                    }
                                });
                            })(cr, crKey)
                        })

                    },
                    function (callback) { //get ServiceGroupInfo
                        var count = 0;
                        json.forEach(function (cr, crKey) {
                            (function (c, k) {
                                var obj = JSON.parse(c.Value ? ExceptionUtils.DecodeBase64(c.Value) : "");
                                RequestApi.Request(consulURL + '/v1/kv/service_group/' + obj.serviceAreaId + '/basic_info', 'GET', '', req, resp, function (sgInfo) {
                                    c["sgInfo"] = sgInfo;
                                    count++;
                                    if (count == json.length) {
                                        callback(null, json);
                                    }
                                });
                            })(cr, crKey)
                        })
                    }
                ],
                function (err, results) {
                    resp.send(json);
                }
            )
        } else {
            resp.send([]);
        }

    });

});

router.post('/routingRule/save', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/common_router/' + data.id + '/basic_info', 'PUT', req.body.data, req, resp, function (json) {
        if (json) {
            resp.send({result: "SUCCESS"})
        } else {
            resp.send({result: "failure"})
        }
    });

});

router.post('/dedicated/save', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/dedicated/save.do',
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

router.post('/dedicated/dedicatedIdCheck', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/dedicated/dedicatedIdCheck.do',
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

router.post('/dedicated/detail', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/dedicated/detail.do',
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

router.post('/dedicated/delete', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/dedicated/delete.do',
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

router.post('/routingRule/delete', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/common_router/' + data.id + "?recurse", 'DELETE', '', req, resp, function (json) {
        if (json) {
            resp.send({result: "SUCCESS"})
        } else {
            resp.send({result: "failure"})
        }
    });

});

router.post('/routingRule/detail', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/common_router/' + data.id + '/basic_info', 'GET', '', req, resp);

});

router.post('/dedicated/subinfo', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var result = {}
        var count = 0
        fetch(baseURL + '/admin/areaList.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                }
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, '')
            })
            .then(function (json) {
                result['area'] = json
                count++
                if (count == 2) {
                    resp.send(result)
                }
            });

        fetch(baseURL + '/dedicated/subInfo.do',
            {
                method: req.method,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Cookie': "JSESSIONID=" + req.cookies.JSESSIONID
                }
            })
            .then(function (res) {
                return ExceptionUtils.not200Exception(res, '')
            })
            .then(function (json) {
                result['subinfo'] = json
                count++
                if (count == 2) {
                    resp.send(result)
                }
            });
    }, resp)

});

/*white list*/
router.post('/whiteList/list', function (req, resp) {
    RequestApi.Request(consulURL + '/v1/kv/visit_control/whitelist?recurse', 'GET', '', req, resp, function (json) {
        if(json!="-10000" && json.length>0){
            resp.send(json);
        }else{
            resp.send([]);
        }
    })
});

router.post('/whiteList/save', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/visit_control/whitelist/' + data.id + '/basic_info', 'PUT', req.body.data, req, resp, function (json) {
        if (json) {
            resp.send({result: "SUCCESS"})
        } else {
            resp.send({result: "failure"})
        }
    });


});

router.post('/whiteList/whiteListDupCheck', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/whiteList/whiteListDupCheck.do',
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

router.post('/whiteList/delete', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/visit_control/whitelist/' + data.id + "?recurse", 'DELETE', '', req, resp, function (json) {
        if (json) {
            resp.send({result: "SUCCESS"})
        } else {
            resp.send({result: "failure"})
        }
    });

});

router.post('/routingBlock/list', function (req, resp) {
    RequestApi.Request(consulURL + '/v1/kv/visit_control/blacklist?recurse', 'GET', '', req, resp, function (json) {
        if(json!="-10000" && json.length>0){
            resp.send(json);
        }else{
            resp.send([]);
        }
    })
});

router.post('/routingBlock/delete', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/visit_control/blacklist/' + data.id + "?recurse", 'DELETE', '', req, resp, function (json) {
        if (json) {
            resp.send({result: "SUCCESS"})
        } else {
            resp.send({result: "failure"})
        }
    });
});

router.post('/routingBlock/save', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/visit_control/blacklist/' + data.id + '/basic_info', 'PUT', req.body.data, req, resp, function (json) {
        if (json) {
            resp.send({result: "SUCCESS"})
        } else {
            resp.send({result: "failure"})
        }
    });


});

router.post('/routingBlock/detail', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/visit_control/blacklist/' + data.id + '/basic_info', 'GET', '', req, resp);

});

/*Dedicated router*/

router.post('/routingParticular/list', function (req, resp) {
    var data = JSON.parse(req.body.data);
    var result={devicetypeInfo:[],stbInfo:[]};
    async.parallel([
        function (callback) {
            RequestApi.Request(consulURL + '/v1/kv/particular_router/devicetype?recurse', 'GET', '', req, resp, function (json) {
                if(json!="-10000" && json.length>0){
                    callback(null,json);
                }else{
                    callback(null,[]);
                }
            })

        },
        function (callback) {
            RequestApi.Request(consulURL + '/v1/kv/particular_router/stb?recurse', 'GET', '', req, resp, function (json) {
                if(json!="-10000" && json.length>0){
                    callback(null,json);
                }else{
                    callback(null,[]);
                }
            })
        }
    ],function (err, results) {

        result.devicetypeInfo=results[0];
        result.stbInfo=results[1];
        resp.send(result);
    })
});

router.post('/routingParticular/save', function (req, resp) {
    var data = JSON.parse(req.body.data);
    if(data.mode=="devicetype"){    //存储devicetpye的专用路由
        RequestApi.Request(consulURL + '/v1/kv/particular_router/devicetype/' + data.id + '/basic_info', 'PUT', req.body.data, req, resp, function (json) {
            if (json) {
                resp.send({result: "SUCCESS"})
            } else {
                resp.send({result: "failure"})
            }
        });
    }else{  //存储stb的专用路由
        RequestApi.Request(consulURL + '/v1/kv/particular_router/stb/' + data.id + '/basic_info', 'PUT', req.body.data, req, resp, function (json) {
            if (json) {
                resp.send({result: "SUCCESS"})
            } else {
                resp.send({result: "failure"})
            }
        });
    }
});

router.post('/routingParticular/delete', function (req, resp) {
    var data = JSON.parse(req.body.data);
    if(data.type=="devicetype"){
        console.log("delete");
        RequestApi.Request(consulURL + '/v1/kv/particular_router/devicetype/' + data.id + "?recurse", 'DELETE', '', req, resp, function (json) {
            if (json) {
                resp.send({result: "SUCCESS"})
            } else {
                resp.send({result: "failure"})
            }
        });
    }else{
        RequestApi.Request(consulURL + '/v1/kv/particular_router/stb/' + data.id + "?recurse", 'DELETE', '', req, resp, function (json) {
            if (json) {
                resp.send({result: "SUCCESS"})
            } else {
                resp.send({result: "failure"})
            }
        });
    }
});

router.post('/routingParticular/particularListDupCheck', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/routingParticular/particularListDupCheck.do', 'POST', data, req, resp)
});

router.post('/routingParticular/detail', function (req, resp) {
    var data = querystring.stringify(JSON.parse(req.body.data));
    RequestApi.Request(baseURL + '/routingParticular/detail.do', 'POST', data, req, resp)
});

module.exports = router;