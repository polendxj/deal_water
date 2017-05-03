/**
 * Created by Administrator on 2016/8/30.
 */
var express = require('express')
var fetch = require('node-fetch')
var querystring = require('querystring')
var ExceptionUtils = require('../utils/ExceptionUtils')
var RequestApi = require('../utils/RequestApi')
var router = express()

router.post('/csr/list', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/csr/list.do',
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

router.post('/csr/updateCsrStatus', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/csr/updateCsrStatus.do',
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

router.post('/csr/csrIdCheck', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/csr/csrIdCheck.do',
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

router.post('/csr/save', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/csr/save.do',
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

router.post('/csr/delete', function (req, resp) {
    var data = JSON.parse(req.body.data);
    console.log(data);
    RequestApi.Request(consulURL + '/v1/kv/csr/' + data.serverIp + "?recurse", 'DELETE', '', req, resp, function (json) {
        if (json) {
            resp.send({result: "SUCCESS"})
        } else {
            resp.send({result: "failure"})
        }
    });

});

router.post('/csr/detail', function (req, resp) {
    ExceptionUtils.uncaughtException(function () {
        var data = querystring.stringify(JSON.parse(req.body.data))
        fetch(baseURL + '/csr/detail.do',
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

router.post('/csr/discoveryCSR', function (req, resp) {
    RequestApi.Request(consulURL + '/v1/catalog/nodes', 'GET', '', req, resp, function (json) {
        var nodeInfo = {registered: [], unRegistered: [], nTotCnt: 0};
        var allNodesInfo = [];
        var count = 0;
        json.forEach(function (node, key) {
            (function (n) {
                var obj = {node: n, checks: [], services: []};
                var flag = 0;
                if (n.Node.toLowerCase().indexOf('csr') >= 0) {
                    RequestApi.Request(consulURL + '/v1/health/node/' + n.Node, 'GET', '', req, resp, function (nodeService) {
                        obj.checks = nodeService;
                        flag++;
                        if (flag == 2) {
                            RequestApi.Request(consulURL + '/v1/kv/csr?recurse', 'GET', "", req, resp, function (socCSR) {
                                if (socCSR == "-10000" || socCSR.length == 0) {
                                    socCSR = [];
                                }
                                allNodesInfo.push(obj);
                                count++;
                                if (json.length == count) {
                                    nodeInfo["nTotCnt"] = socCSR.length;
                                    allNodesInfo.forEach(function (nOfAll, nKey) {
                                        var findFlag = false;
                                        socCSR.forEach(function (csr, csrKey) {
                                            csr = JSON.parse(csr.Value ? ExceptionUtils.DecodeBase64(csr.Value) : "");
                                            if (csr.serverIp == nOfAll.node.Address) {
                                                findFlag = true;
                                                nOfAll.node["registeredName"] = csr.name;
                                                nodeInfo.registered.push(nOfAll);
                                            }
                                        })
                                        if (!findFlag) {
                                            nodeInfo.unRegistered.push(nOfAll)
                                        }
                                    })
                                    resp.send(nodeInfo)
                                }
                            })
                        }

                    })
                    RequestApi.Request(consulURL + '/v1/catalog/node/' + n.Node, 'GET', '', req, resp, function (services) {
                        obj.services = services;
                        flag++;
                        if (flag == 2) {
                            RequestApi.Request(consulURL + '/v1/kv/csr?recurse', 'GET', "", req, resp, function (socCSR) {
                                if (socCSR == "-10000" || socCSR.length == 0) {
                                    socCSR = [];
                                }
                                allNodesInfo.push(obj);
                                count++;
                                if (json.length == count) {
                                    nodeInfo["nTotCnt"] = socCSR.length
                                    allNodesInfo.forEach(function (nOfAll, nKey) {
                                        var findFlag = false;
                                        socCSR.forEach(function (csr, csrKey) {
                                            csr = JSON.parse(csr.Value ? ExceptionUtils.DecodeBase64(csr.Value) : "");
                                            if (csr.serverIp == nOfAll.node.Address) {
                                                findFlag = true;
                                                nOfAll.node["registeredName"] = csr.name;
                                                nodeInfo.registered.push(nOfAll);
                                            }
                                        })
                                        if (!findFlag) {
                                            nodeInfo.unRegistered.push(nOfAll)
                                        }
                                    })

                                    resp.send(nodeInfo)
                                }
                            })
                        }

                    })
                } else {
                    count++;
                    if (json.length == count) {
                        resp.send(nodeInfo)
                    }
                }

            })(node)
        });
    })
});

router.post('/csr/saveByConsul', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/csr/' + data.serverIp + '/basic_info', 'PUT', JSON.stringify(data), req, resp, function (json) {
        if (json) {
            resp.send({result: "SUCCESS"})
        } else {
            resp.send({result: "FAILURE"})
        }
    });
    /*var gwInfo = "areaId=0&useYN=Y&gwId=" + data.name + "_GW&serverIp=" + data.ip + "&serverPort=" + data.gwPort + "&config=&mode=new";
     var srInfo = "areaId=0&rssId=" + data.name + "&serverIp=" + data.ip + "&serverPort=" + data.srPort + "&useYN=Y&mode=new";
     var result = {srStatus: false, gwStatus: false, socSRStatus: "", socGWStatus: ""};
     RequestApi.Request(baseURL + '/csr/save.do', 'POST', srInfo, req, resp, function (jsonSR) {
     if (jsonSR.result == "SUCCESS") {
     result.srStatus = true;
     RequestApi.Request(baseURL + '/gateway/save.do', 'POST', gwInfo, req, resp, function (jsonGW) {
     if (jsonGW.result == "SUCCESS") {
     result.gwStatus = true;
     } else {
     result.socGWStatus = jsonGW;
     }
     resp.send(result);
     })
     } else {
     result.socSRStatus = jsonSR;
     resp.send(result)
     }
     })*/
});

/*csm manager*/
router.get('/csm/discoveryCSM', function (req, resp) {
    RequestApi.Request(consulURL + '/v1/catalog/nodes', 'GET', '', req, resp, function (json) {
        var nodeInfo = {registered: [], unRegistered: [], nTotCnt: 0};
        var allNodesInfo = [];
        var count = 0;
        json.forEach(function (node, key) {
            (function (n) {
                var obj = {node: n, checks: [], services: []};
                var flag = 0;
                if (n.Node.toLowerCase().indexOf('csm') >= 0) {
                    RequestApi.Request(consulURL + '/v1/health/node/' + n.Node, 'GET', '', req, resp, function (nodeService) {
                        obj.checks = nodeService;
                        flag++;
                        if (flag == 2) {
                            count++;
                            nodeInfo.registered.push(obj)
                            if (json.length == count) {
                                resp.send(nodeInfo)
                            }
                        }

                    });
                    RequestApi.Request(consulURL + '/v1/catalog/node/' + n.Node, 'GET', '', req, resp, function (services) {
                        obj.services = services;
                        flag++;
                        if (flag == 2) {
                            count++;
                            nodeInfo.registered.push(obj)
                            if (json.length == count) {
                                resp.send(nodeInfo)
                            }
                        }

                    })
                } else {
                    count++;
                    if (json.length == count) {
                        resp.send(nodeInfo)
                    }
                }

            })(node)
        });
    })
});

router.post('/cse/discoveryCSE', function (req, resp) {
    var data = JSON.parse(req.body.data);
    RequestApi.Request(consulURL + '/v1/kv/cse/?recurse', 'GET', "", req, resp, function (socCSR) {
        if (socCSR == "-10000") {
            socCSR = []
        }
        RequestApi.Request(consulURL + '/v1/catalog/nodes', 'GET', '', req, resp, function (json) {
            var nodeInfo = {registered: [], unRegistered: [], nTotCnt: 0};
            var allNodesInfo = [];  //所有CSE的consul节点
            var tempSOCNode = [];     //从CSE的consul节点中获取已注册的
            var tempConsulNode = [];
            json.forEach(function (n, key) {
                if (n.Node.toLowerCase().indexOf('cse') >= 0) {
                    allNodesInfo.push(n)
                }
            })
            allNodesInfo.forEach(function (consulNode) {
                var registeredNode = false
                socCSR.forEach(function (css) {
                    var obj = JSON.parse(css.Value ? ExceptionUtils.DecodeBase64(css.Value) : "");
                    if (obj.serverIp == consulNode.Address && !registeredNode) {
                        registeredNode = true
                        css["hostName"] = consulNode.Node
                        tempSOCNode.push(obj)
                    }
                })
                if (!registeredNode) {
                    tempConsulNode.push(consulNode)
                }
            })
            RequestApi.Request(consulURL + '/v1/kv/cse/?recurse', 'GET', "", req, resp, function (socNode) {
                if (socNode == "-10000") {
                    socNode = []
                }
                var realCount = socNode.length
                socNode.forEach(function (val) {
                    var obj = JSON.parse(val.Value ? ExceptionUtils.DecodeBase64(val.Value) : "");
                    var flag = false
                    tempSOCNode.forEach(function (tSOC) {
                        if (tSOC.serverIp == obj.serverIp) {
                            flag = true
                        }
                    })
                    if (!flag) {
                        realCount--
                    }
                })
                nodeInfo.nTotCnt = realCount
                tempConsulNode.forEach(function (temp, key) {
                    (function (t) {
                        var flag = 0;
                        var obj = {node: t, checks: [], services: [], index: key};
                        RequestApi.Request(consulURL + '/v1/health/node/' + t.Node, 'GET', '', req, resp, function (nodeService) {
                            obj.checks = nodeService
                            flag++
                            if (flag == 2) {
                                nodeInfo.unRegistered.push(obj)
                                if (realCount == nodeInfo.registered.length && nodeInfo.unRegistered.length == tempConsulNode.length) {
                                    nodeInfo.unRegistered.sort(ExceptionUtils.ObjArrSort("index"))
                                    nodeInfo.registered.sort(ExceptionUtils.ObjArrSort("index"))
                                    resp.send(nodeInfo)
                                }
                            }
                        })
                        RequestApi.Request(consulURL + '/v1/catalog/node/' + t.Node, 'GET', '', req, resp, function (services) {
                            obj.services = services
                            flag++
                            if (flag == 2) {
                                nodeInfo.unRegistered.push(obj)
                                if (realCount == nodeInfo.registered.length && nodeInfo.unRegistered.length == tempConsulNode.length) {
                                    nodeInfo.unRegistered.sort(ExceptionUtils.ObjArrSort("index"))
                                    nodeInfo.registered.sort(ExceptionUtils.ObjArrSort("index"))
                                    resp.send(nodeInfo)
                                }
                            }
                        })
                    })(temp)
                })

                socNode.forEach(function (temp, key) {
                    var obj = JSON.parse(temp.Value ? ExceptionUtils.DecodeBase64(temp.Value) : "");
                    tempSOCNode.forEach(function (tSOC) {
                        if (tSOC.serverIp == obj.serverIp) {
                            (function (t) {
                                var flag = 0;
                                var obj = {node: t, checks: [], services: [], index: key};
                                RequestApi.Request(consulURL + '/v1/health/node/' + t.hostName, 'GET', '', req, resp, function (nodeService) {
                                    obj.checks = nodeService
                                    flag++
                                    if (flag == 2) {
                                        nodeInfo.registered.push(obj)
                                        if (realCount == nodeInfo.registered.length && nodeInfo.unRegistered.length == tempConsulNode.length) {
                                            nodeInfo.unRegistered.sort(ExceptionUtils.ObjArrSort("index"))
                                            nodeInfo.registered.sort(ExceptionUtils.ObjArrSort("index"))
                                            resp.send(nodeInfo)
                                        }
                                    }
                                })
                                RequestApi.Request(consulURL + '/v1/catalog/node/' + t.hostName, 'GET', '', req, resp, function (services) {
                                    obj.services = services
                                    flag++
                                    if (flag == 2) {
                                        nodeInfo.registered.push(obj)
                                        if (realCount == nodeInfo.registered.length && nodeInfo.unRegistered.length == tempConsulNode.length) {
                                            nodeInfo.unRegistered.sort(ExceptionUtils.ObjArrSort("index"))
                                            nodeInfo.registered.sort(ExceptionUtils.ObjArrSort("index"))
                                            resp.send(nodeInfo)
                                        }
                                    }
                                })
                            })(tSOC)
                        } else {

                        }
                    })

                })

            })


        })
    })
});

module.exports = router
