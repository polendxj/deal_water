/**
 * Created by Captain on 2017/4/8.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux';
import {commonRefresh} from '../../actions/Common';
import {NoData} from '../../components/Tool/Tool'
import Highcharts from 'highcharts'

class FusionContainer extends Component {
    constructor(props) {
        super(props);
        this._addDomain = this._addDomain.bind(this);
        this._startRefresh = this._startRefresh.bind(this);
        this._gotoDetail = this._gotoDetail.bind(this);
        this._gotoCreate = this._gotoCreate.bind(this);
        this.showAddDomain = false;
    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }

    _addDomain() {
        this.showAddDomain = true;
        this._startRefresh();
    }

    _gotoCreate() {
        this.page_position = "create";
        this._startRefresh();
    }

    _gotoDetail() {
        this.page_position = "detail";
        this._startRefresh();
    }

    render() {
        var tableHeight = ($(window).height() - 93);
        var result = "";
        if (this.showAddDomain) {
            result=<FusionContainerRight />
        }else{
            result= <Source_panel_right _gotoCreate={this._gotoCreate} _gotoDetail={this._gotoDetail}
                                        _addDomain={this._addDomain} showAddDomain={this.showAddDomain}
                                        _startRefresh={this._startRefresh}/>
        }
        return (
            <div style={{height: tableHeight + 'px'}}>
                <div style={{position: "relative"}}>
                    <div style={{
                        width: "250px",
                        height: tableHeight,
                        float: "left",
                        borderRight: "thin lightgray solid"
                    }}>
                        <FusionContainerLeft _addDomain={this._addDomain} _gotoCreate={this._gotoCreate}
                                             _gotoDetail={this._gotoDetail}/>
                    </div>
                    <div style={{overflow: "hidden", height: "100%",}}>
                        {result}
                    </div>
                    <div style={{clear: "both"}}></div>
                </div>

            </div>
        )
    }
}

class FusionContainerLeft extends Component {
    constructor(props) {
        super(props);
    }

    _addDomain() {
        this.props._addDomain();
    }

    componentDidMount() {
        $('.navigation-main1').find('li').has('ul').children('a').on('click', function (e) {
            e.preventDefault();

            // Collapsible
            $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(250);

            // Accordion
            if ($('.navigation-main1').hasClass('navigation-accordion')) {
                $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(250);
            }
        });
    }

    render() {
        return (
            <div>
                <div style={{textAlign: "center", marginTop: "20px"}}>
                    <button type="button" className="btn btn-primary btn-xs btn-rounded"
                            onClick={this._addDomain.bind(this)}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        新建河道信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </button>
                </div>
                <div style={{width: "203px", paddingLeft: "45px"}}>
                    <div className="form-group has-feedback has-feedback-left"
                         style={{textAlign: "center", marginTop: "15px"}}>
                        <input type="text" className="form-control input-xs" placeholder="请输入要搜索的河道"
                               style={{borderRadius: "50px"}}/>
                        <div className="form-control-feedback">
                            <i className="icon-search4 text-size-base"></i>
                        </div>
                    </div>
                </div>
                <fieldset className="content-group" style={{padding: "30px"}}>
                    <div className="navigation navigation-main1 navigation-accordion" style={{marginTop: "-40px"}}>
                        <li className="active">
                            <ul className="hidden-ul" style={{display: "block"}}>
                                <li onClick={this.props._gotoDetail.bind(this)}><a href="javascript:void(0);" style={{
                                    borderTop: "1px lightgray solid",
                                    borderBottom: "1px lightgray solid"
                                }}>湖景大坝1段</a>
                                    <div style={{
                                        width: "40px",
                                        height: "41px",
                                        backgroundColor: "white",
                                        position: "absolute",
                                        right: "-31px",
                                        top: "10px",
                                        borderTop: "thin lightgray solid",
                                        borderBottom: "thin lightgray solid",
                                        display: "block"
                                    }}></div>
                                </li>
                                <li onClick={this.props._gotoDetail.bind(this)}><a href="javascript:void(0);" style={{
                                    borderTop: "0 lightgray solid",
                                    borderBottom: "0 lightgray solid"
                                }}>江阴区河道</a>
                                    <div style={{
                                        width: "40px",
                                        height: "42px",
                                        backgroundColor: "white",
                                        position: "absolute",
                                        right: "-31px",
                                        top: "0",
                                        borderTop: "thin lightgray solid",
                                        borderBottom: "thin lightgray solid",
                                        display: "none"
                                    }}></div>
                                </li>
                            </ul>
                        </li>
                    </div>
                </fieldset>
            </div>
        )
    }
}

class Source_panel_right extends Component {
    constructor(props) {
        super(props)
    }

    _getStatics() {
        var chart4 = new Highcharts.Chart('containerStorage', {
            title: {
                text: '',
                x: -20
            },
            subtitle: {
                text: '',
                x: -20
            },
            xAxis: {
                categories: ['4月01号', '4月02号', '4月03号', '4月04号', '4月05号', '4月06号', '4月07号', '4月08号']
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                formatter: function () {
                    return this.value + " B";
                },
                labels: {
                    format: '{value} B'
                }

            },

            credits: {
                enabled: false,
            },
            tooltip: {
                valueSuffix: 'B'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0,
                enabled: false
            },
            series: [{
                name: '存储',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            }]
        });
    }

    _getAPIRequest() {
        var chart5 = new Highcharts.Chart('containerAPIRequest', {
            title: {
                text: '',
                x: -20
            },
            subtitle: {
                text: '',
                x: -20
            },
            xAxis: {
                categories: ['4月01号', '4月02号', '4月03号', '4月04号', '4月05号', '4月06号', '4月07号', '4月08号']
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                formatter: function () {
                    return this.value + " B";
                },
                labels: {
                    format: '{value} B'
                }

            },

            credits: {
                enabled: false,
            },
            tooltip: {
                valueSuffix: 'B'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0,
                enabled: false
            },
            series: [{
                name: 'API请求',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            }]
        });
    }

    componentDidMount() {
        $('.daterange-two').daterangepicker({
            maxDate: moment(), //最大时间
            opens: "left",
            applyClass: 'bg-slate-600',
            cancelClass: 'btn-default',
            ranges: rangesLocale,
            startDate: '2016/01/01',
            endDate: moment(),
            locale: dateLocale
        });
        $(".tree-checkbox-hierarchical").fancytree({
            checkbox: true,
            selectMode: 3
        });

    }

    _location(path) {
        browserHistory.push(path);
    }

    componentWillUpdate() {
        if (Array.prototype.forEach) {
            var elems = Array.prototype.slice.call(document.querySelectorAll('.switchery'));
            elems.forEach(function (html) {
                var switchery = new Switchery(html);
            });
        }
        else {
            var elems = document.querySelectorAll('.switchery');
            for (var i = 0; i < elems.length; i++) {
                var switchery = new Switchery(elems[i]);
            }
        }

        // Colored switches
        var primary = document.querySelector('.switchery-primary');
        var switchery = new Switchery(primary, {color: '#2196F3'});

        var primary1 = document.querySelector('.switchery-primary1');
        var switchery1 = new Switchery(primary1, {color: '#2196F3'});

        var primary2 = document.querySelector('.switchery-primary2');
        var switchery2 = new Switchery(primary2, {color: '#2196F3'});
    }

    render() {
        var tableHeight = ($(window).height() - 203);
        var text = JSON.stringify({"error": "Document not found"});
        return (
            <div style={{padding: "10px"}}>
                <h4 className="panel-title"><i className="icon-feed"> </i> &nbsp;&nbsp;湖景大坝1段
                </h4>
                <div className="tabbable">
                    <ul className="nav nav-tabs nav-tabs-bottom">
                        <li className="active"><a style={{fontSize: "16px"}} href="#bottom-tab1"
                                                  data-toggle="tab">河道信息</a></li>

                    </ul>

                    <div className="tab-content" style={{height: tableHeight, overflowY: "auto"}}>
                        <div className="tab-pane flipInX active" id="bottom-tab1">
                            <div className="row" style={{marginLeft: "0", marginRight: "10px"}}>
                                <div className="col-md-12">
                                    <img src="./assets/demo_map.jpg" style={{width:"100%",height:"550px"}} />
                                </div>
                                <div className="col-md-12">
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <legend style={{fontSize: "16px", color: "#5E6166"}}>
                                            基本信息
                                        </legend>
                                        <div className="table-responsive">
                                            <table className="table" style={{fontSize: "14px"}}>
                                                <tbody>
                                                <tr>
                                                    <td style={{width: "200px", borderTop: "0 red solid"}}>河道名称</td>
                                                    <td style={{borderTop: "0 red solid"}}>
                                                        江河源河道
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: "200px", borderTop: "0 red solid"}}>长度（km）</td>
                                                    <td style={{borderTop: "0 red solid"}}>68</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: "200px", borderTop: "0 red solid"}}>河道等级
                                                    </td>
                                                    <td style={{borderTop: "0 red solid"}}>省内</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: "200px", borderTop: "0 red solid"}}>起点</td>
                                                    <td style={{borderTop: "0 red solid"}}>秦家院子</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: "200px", borderTop: "0 red solid"}}>终点</td>
                                                    <td style={{borderTop: "0 red solid"}}>新石桥</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: "200px", borderTop: "0 red solid"}}>告示牌</td>
                                                    <td style={{borderTop: "0 red solid"}}>有</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: "200px", borderTop: "0 red solid"}}>经纬度</td>
                                                    <td style={{borderTop: "0 red solid"}}>104.06481 - 30.56783</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: "200px", borderTop: "0 red solid"}}>位置</td>
                                                    <td style={{borderTop: "0 red solid"}}>四川省成都市金牛区百扬村湖景大坝</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </fieldset>
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <legend style={{fontSize: "16px", color: "#5E6166"}}>
                                            责任体
                                        </legend>

                                        <p>江东区、江北区、高新区、镇海区、北仑区</p>
                                    </fieldset>
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <legend style={{fontSize: "16px", color: "#5E6166"}}>
                                            责任人
                                        </legend>
                                        <div className="table-responsive">
                                            <table className="table" style={{fontSize: "14px"}}>
                                                <tbody>
                                                <tr>
                                                    <td style={{borderTop: "0 red solid"}}>执行河长</td>
                                                    <td style={{borderTop: "0 red solid"}}>楚梦形</td>
                                                </tr>
                                                <tr>
                                                    <td style={{borderTop: "0 red solid"}}>河道警长</td>
                                                    <td style={{borderTop: "0 red solid"}}>王伟彪</td>
                                                </tr>
                                                <tr>
                                                    <td style={{borderTop: "0 red solid"}}>二级河长</td>
                                                    <td style={{borderTop: "0 red solid"}}>薛维海</td>
                                                </tr>
                                                <tr>
                                                    <td style={{borderTop: "0 red solid"}}>联系部门</td>
                                                    <td style={{borderTop: "0 red solid"}}>区委办</td>
                                                </tr>
                                                <tr>
                                                    <td style={{borderTop: "0 red solid"}}>联系人</td>
                                                    <td style={{borderTop: "0 red solid"}}>朱志远 （15150568745）</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane flipInX" id="bottom-tab2">
                            <fieldset className="content-group" style={{padding: "10px"}}>
                                <legend style={{fontSize: "16px", color: "#5E6166"}}>
                                    数据统计
                                    <br />
                                    <span className="label label-warning" style={{fontSize: "14px"}}>
                                        API</span>
                                </legend>
                                <div className="tabbable">
                                    <div style={{position: "relative", float: "right", width: "175px"}}>
                                        <input type="text"
                                               className="form-control daterange-two"
                                               placeholder="选择日期" style={{border: "0 red solid"}}/>
                                    </div>
                                    <ul className="nav nav-tabs nav-tabs-bottom">
                                        <li className="active"><a style={{fontSize: "16px"}} href="#static-1"
                                                                  data-toggle="tab">存储</a>
                                        </li>
                                        <li onClick={this._getAPIRequest.bind(this)}><a style={{fontSize: "16px"}}
                                                                                        href="#static-2"
                                                                                        data-toggle="tab">API请求</a>
                                        </li>
                                        <li><a style={{fontSize: "16px"}} href="#static-3" data-toggle="tab">空间流量</a>
                                        </li>
                                        <li><a style={{fontSize: "16px"}} href="#static-4" data-toggle="tab">空间带宽</a>
                                        </li>

                                    </ul>


                                    <div className="tab-content"
                                         style={{height: tableHeight, overflowY: "auto", overflowX: "hidden"}}>

                                        <div className="tab-pane flipInX active" id="static-1">
                                            <div className="row text-right">
                                                <button type="button" className="btn btn-primary btn-xs "
                                                        style={{
                                                            color: "#1989FA",
                                                            backgroundColor: "rgba(33,150,243,0.1)",
                                                            borderColor: "#AAD3FE",
                                                            marginRight: "30px"
                                                        }}>
                                                    &nbsp;导出CSV&nbsp;
                                                </button>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 text-center">
                                                    <div style={{fontSize: "14px"}}>当前存储量</div>
                                                    <div style={{fontSize: "24px"}}>0 B</div>
                                                </div>
                                                <div className="col-md-6 text-center">
                                                    <div style={{fontSize: "14px"}}>平均值</div>
                                                    <div style={{fontSize: "24px"}}>0 B</div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div id="containerStorage"
                                                         style={{minWidth: "500px", height: "300px"}}></div>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="tab-pane flipInX" id="static-2">
                                            <div className="row text-right">
                                                <button type="button" className="btn btn-primary btn-xs "
                                                        style={{
                                                            color: "#1989FA",
                                                            backgroundColor: "rgba(33,150,243,0.1)",
                                                            borderColor: "#AAD3FE",
                                                            marginRight: "30px"
                                                        }}>
                                                    &nbsp;导出CSV&nbsp;
                                                </button>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-3 text-center">
                                                    <div style={{fontSize: "14px"}}>GET请求总次数</div>
                                                    <div style={{fontSize: "24px"}}>0 次</div>
                                                </div>
                                                <div className="col-md-3 text-center">
                                                    <div style={{fontSize: "14px"}}>GET请求平均次数</div>
                                                    <div style={{fontSize: "24px"}}>0 次</div>
                                                </div>
                                                <div className="col-md-3 text-center">
                                                    <div style={{fontSize: "14px"}}>PUT请求总次数</div>
                                                    <div style={{fontSize: "24px"}}>0 次</div>
                                                </div>
                                                <div className="col-md-3 text-center">
                                                    <div style={{fontSize: "14px"}}>PUT请平均次数</div>
                                                    <div style={{fontSize: "24px"}}>0 次</div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div id="containerAPIRequest"
                                                         style={{minWidth: "500px", height: "300px"}}></div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane flipInX" id="static-3">
                                            <div className="row">
                                                <div className="btn-group" style={{marginLeft: "20px"}}>
                                                    <button type="button"
                                                            className="btn btn-default btn-sm">&nbsp;&nbsp;
                                                        一天&nbsp;&nbsp;</button>
                                                    <button type="button"
                                                            className="btn btn-default btn-sm">&nbsp;&nbsp;
                                                        5分钟&nbsp;&nbsp;</button>
                                                </div>
                                                <NoData />
                                            </div>
                                        </div>
                                        <div className="tab-pane flipInX" id="static-4">
                                            <div className="row">
                                                <div className="btn-group" style={{marginLeft: "20px"}}>
                                                    <button type="button"
                                                            className="btn btn-default btn-sm">&nbsp;&nbsp;
                                                        一天&nbsp;&nbsp;</button>
                                                    <button type="button"
                                                            className="btn btn-default btn-sm">&nbsp;&nbsp;
                                                        5分钟&nbsp;&nbsp;</button>
                                                </div>
                                                <NoData />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className="tab-pane flipInX" id="bottom-tab3" style={{overflow: "hidden"}}>
                            <fieldset className="content-group" style={{padding: "10px"}}>
                                <legend style={{fontSize: "16px", color: "#5E6166"}}>
                                    内容管理
                                    <br />
                                    <span className="label label-success" style={{fontSize: "14px"}}>
                                        帮助</span>
                                </legend>
                                <div className="row" style={{paddingLeft: "10px", paddingRight: "5px"}}>
                                    <button type="button" className="btn btn-primary btn-xs"
                                            style={{
                                                color: "#1989FA",
                                                backgroundColor: "rgba(33,150,243,0.1)",
                                                borderColor: "#AAD3FE"
                                            }}>
                                        &nbsp;&nbsp;上传文件&nbsp;&nbsp;
                                    </button>
                                    <button type="button" className="btn btn-primary btn-xs"
                                            style={{
                                                color: "black",
                                                backgroundColor: "white",
                                                borderColor: "#AAD3FE",
                                                marginLeft: "10px"
                                            }}>
                                        &nbsp;&nbsp;全选&nbsp;&nbsp;
                                    </button>
                                    <button type="button" className="btn btn-primary btn-xs"
                                            style={{
                                                color: "black",
                                                backgroundColor: "white",
                                                borderColor: "#AAD3FE",
                                                marginLeft: "10px"
                                            }}>
                                        &nbsp;&nbsp;刷新&nbsp;&nbsp;
                                    </button>
                                    <div className="form-group has-feedback has-feedback-left pull-right"
                                         style={{textAlign: "center", marginTop: "5px", marginRight: "10px"}}>
                                        <input type="text" className="form-control input-xs" placeholder="输入文件前缀搜索"
                                        />
                                        <div className="form-control-feedback">
                                            <i className="icon-search4 text-size-base"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form"></div>
                                    <form className="form-horizontal">
                                        <label className="control-label col-md-2">外链默认域名</label>
                                        <div className="col-md-4">
                                            <select name="select" className="form-control">
                                                <option value="opt1">湖景大坝1段</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <button type="button" className="btn btn-primary btn-xs"
                                                    style={{
                                                        color: "#1989FA",
                                                        backgroundColor: "rgba(33,150,243,0.1)",
                                                        borderColor: "#AAD3FE"
                                                    }}>
                                                &nbsp;&nbsp;
                                                保存默认域名&nbsp;&nbsp;
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                            <tr style={{color: "#8F9BB3"}}>
                                                <th style={{fontSize: "14px", textAlign: "center"}}>文件名</th>
                                                <th style={{fontSize: "14px", textAlign: "center"}}>文件类型</th>
                                                <th style={{fontSize: "14px", textAlign: "center"}}>文件大小</th>
                                                <th style={{fontSize: "14px", textAlign: "center"}}>最后更新</th>
                                                <th style={{fontSize: "14px", textAlign: "center"}}>操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td colSpan="10" className="text-center"><NoData text="不存在任何文件..."/>
                                                </td>
                                            </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </fieldset>
                        </div>
                        <div className="tab-pane flipInX" id="bottom-tab4" style={{overflow: "hidden"}}>
                            <fieldset className="content-group" style={{padding: "10px"}}>
                                <legend style={{fontSize: "16px", color: "#5E6166"}}>
                                    镜像存储
                                    <br />
                                    <span className="label label-success" style={{fontSize: "14px"}}>
                                        帮助</span>
                                </legend>
                                <p style={{fontSize: "14px", lineHeight: "28px", maxWidth: "640px", margin: "15px 0"}}>
                                    设置镜像存储 <a
                                    href="#" target="_blank"><i className=" icon-question4"
                                                                style={{color: "#afd4fa", fontSize: "14px"}}></i></a>，源站资源（文件/图片等）根据初次访问自动同步到异地云存，数据平滑迁移。可使用绑定的自定义域名访问镜像存储的源站资源。
                                </p>
                                <p style={{fontSize: "14px", lineHeight: "28px", maxWidth: "640px", margin: "15px 0"}}>
                                    配置镜像存储后，因为镜像源和镜像空间内容基本一致，将可能导致搜索引擎对源站进行封锁，可配置搜索引擎的 robots.txt 文件避免此情况发生。
                                </p>
                                <div className="product-content">
                                    <div className="resource-body" style={{padding: "0"}}>
                                        <form id="createForm" name="createForm">
                                            <hr />
                                            <section className="q-item">
                                                <div className="row">
                                                    <div className="item-title col-md-3">镜像源</div>
                                                    <div className="item-body col-md-9">
                                                        <p className="item-describe">镜像源地址支持两种格式：
                                                            <br />
                                                            <span className="format-title">格式 1：</span>
                                                            <code>http(s)://绑定域名/源站资源相对路径</code>
                                                            <br />
                                                            <span className="format-title">格式 2：</span>
                                                            <code>http(s)://绑定IP/源站资源相对路径</code>
                                                        </p>
                                                        <div className="form-group form-inline">
                                                            <input style={{width: "300px"}} type="text"
                                                                   className="form-control ng-pristine ng-untouched ng-valid ng-empty ng-valid-pattern"
                                                                   placeholder="镜像源地址" name="mirrorSource"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr/>
                                            </section>
                                            <section className="q-item">
                                                <div className="row">
                                                    <div className="item-title col-md-3">镜像空间</div>
                                                    <div className="item-body col-md-9">
                                                        <div className="form-group form-inline">
                                                            <input style={{width: "300px"}} type="text"
                                                                   className="form-control ng-pristine ng-untouched ng-valid ng-empty ng-valid-pattern"
                                                                   placeholder="Inspur" name="mirrorSource"
                                                                   disabled="disabled"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr/>
                                            </section>
                                            <section className="q-item clearfix">
                                                <div className="form-group form-inline pull-left"><label
                                                    className="robots-txt-setting"><input type="checkbox"
                                                                                          className="ng-valid ng-dirty ng-valid-parse ng-not-empty ng-touched"

                                                /> &nbsp;&nbsp; 使用默认的
                                                    robots.txt 配置文件 <span >（当前空间已经配置了 robots.txt 文件）</span></label>
                                                </div>
                                                <div className="pull-right"><a
                                                    className="btn btn-lg btn-default btn-mute">取消</a>
                                                    <button type="submit"
                                                            className="btn btn-lg btn-primary btn-emphasis"
                                                            style={{marginLeft: "20px"}}
                                                    >保存设置
                                                    </button>
                                                </div>
                                            </section>
                                        </form>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className="tab-pane flipInX" id="bottom-tab5">

                        </div>
                        <div className="tab-pane flipInX" id="bottom-tab8"
                             style={{overflow: "hidden", padding: "10px"}}>
                            <div className="product-content">
                                <div className="resource-body" style={{padding: "0"}}>
                                    <form name="createForm">
                                        <hr />
                                        <section className="q-item">
                                            <div className="row">
                                                <div className="item-title col-md-3">文件客户端缓存 maxAge</div>
                                                <div className="item-body col-md-9">
                                                    <p className="item-describe">通过配置 maxAge
                                                        实现在规定的时效内使客户端缓存更新的效果，单位：秒</p>
                                                    <div className="form-group form-inline">
                                                        <input style={{width: "300px"}} type="number"
                                                               className="form-control ng-pristine ng-untouched ng-valid ng-empty ng-valid-pattern"
                                                               placeholder="31536000" name="mirrorSource"/>
                                                    </div>
                                                    <div>
                                                        <button type="button" className="btn btn-primary btn-xs"
                                                                style={{
                                                                    color: "rgb(25, 137, 250)",
                                                                    "backgroundColor": "white",
                                                                    borderColor: "lightgray"
                                                                }}>&nbsp;&nbsp; 取消&nbsp;&nbsp;</button>
                                                        <button type="button" className="btn btn-primary btn-xs"
                                                                style={{
                                                                    color: "rgb(25, 137, 250)",
                                                                    "backgroundColor": "rgba(33, 150, 243, 0.0980392)",
                                                                    borderColor: "rgb(170, 211, 254)",
                                                                    marginLeft: "10px"
                                                                }}>&nbsp;&nbsp; 保存设置&nbsp;&nbsp;</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr/>
                                        </section>
                                        <section className="q-item">
                                            <div className="row">
                                                <div className="item-title col-md-3">默认首页设置</div>
                                                <div className="item-body col-md-9">

                                                    <p className="item-describe">开启功能后，空间根目录中的 index.html（或
                                                        index.htm）文件将会作为默认首页进行展示。</p>

                                                    <div className="form-group form-inline">
                                                        <span className="text-semibold"
                                                              style={{position: "relative", top: "-8px"}}>关闭</span>
                                                        <div className="checkbox checkbox-switchery"
                                                             style={{marginLeft: "5px"}}>
                                                            <label>
                                                                <input style={{marginLeft: "40px"}} type="checkbox"
                                                                       className="switchery-primary"/>
                                                            </label>
                                                        </div>
                                                        <span className="text-semibold"
                                                              style={{position: "relative", top: "-8px", left: "50px"}}>开启</span>
                                                    </div>
                                                    <div>
                                                        <button type="button" className="btn btn-primary btn-xs"
                                                                style={{
                                                                    color: "rgb(25, 137, 250)",
                                                                    "backgroundColor": "white",
                                                                    borderColor: "lightgray"
                                                                }}>&nbsp;&nbsp; 取消&nbsp;&nbsp;</button>
                                                        <button type="button" className="btn btn-primary btn-xs"
                                                                style={{
                                                                    color: "rgb(25, 137, 250)",
                                                                    "backgroundColor": "rgba(33, 150, 243, 0.0980392)",
                                                                    borderColor: "rgb(170, 211, 254)",
                                                                    marginLeft: "10px"
                                                                }}>&nbsp;&nbsp; 保存设置&nbsp;&nbsp;</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr/>
                                        </section>
                                        <section className="q-item">
                                            <div className="row">
                                                <div className="item-title col-md-3">空间日志</div>
                                                <div className="item-body col-md-9">

                                                    <p className="item-describe">1. 空间日志指直接访问该空间的日志，当天的日志两天后可下载；</p>
                                                    <p className="item-describe">2. 空间日志不包括浪潮 CDN 域名的 <a>访问日志。</a></p>
                                                    <div className="form-group form-inline">
                                                        <span className="text-semibold"
                                                              style={{position: "relative", top: "-8px"}}>关闭</span>
                                                        <div className="checkbox checkbox-switchery"
                                                             style={{marginLeft: "5px"}}>
                                                            <label>
                                                                <input style={{marginLeft: "40px"}} type="checkbox"
                                                                       className="switchery-primary1"/>
                                                            </label>
                                                        </div>
                                                        <span className="text-semibold"
                                                              style={{position: "relative", top: "-8px", left: "50px"}}>开启</span>
                                                    </div>
                                                    <div>
                                                        <button type="button" className="btn btn-primary btn-xs"
                                                                style={{
                                                                    color: "rgb(25, 137, 250)",
                                                                    "backgroundColor": "white",
                                                                    borderColor: "lightgray"
                                                                }}>&nbsp;&nbsp; 取消&nbsp;&nbsp;</button>
                                                        <button type="button" className="btn btn-primary btn-xs"
                                                                style={{
                                                                    color: "rgb(25, 137, 250)",
                                                                    "backgroundColor": "rgba(33, 150, 243, 0.0980392)",
                                                                    borderColor: "rgb(170, 211, 254)",
                                                                    marginLeft: "10px"
                                                                }}>&nbsp;&nbsp; 保存设置&nbsp;&nbsp;</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr/>
                                        </section>
                                        <section className="q-item">
                                            <div className="row">
                                                <div className="item-title col-md-3">空间404页面设置</div>
                                                <div className="item-body col-md-9">

                                                    <p className="item-describe">
                                                        配置 HTTP 请求时的 404 页面。设置的页面须保存在当前空间内。</p>
                                                    <div className="form-group form-inline">
                                                        <span className="text-semibold"
                                                              style={{position: "relative", top: "-8px"}}>默认配置</span>
                                                        <div className="checkbox checkbox-switchery"
                                                             style={{marginLeft: "5px"}}>
                                                            <label>
                                                                <input style={{marginLeft: "40px"}} type="checkbox"
                                                                       className="switchery-primary2"/>
                                                            </label>
                                                        </div>
                                                        <span className="text-semibold"
                                                              style={{position: "relative", top: "-8px", left: "50px"}}>自定义配置</span>
                                                    </div>
                                                    <p className="item-describe">
                                                        当前配置显示效果如下：</p>
                                                    <textarea style={{width: "40%", height: "100px"}}>{text}</textarea>
                                                </div>
                                            </div>
                                            <hr/>
                                        </section>
                                        {/*<div>
                                         <div className="panel panel-flat">
                                         <div className="panel-heading">
                                         <h6 className="panel-title">Hierarchical select</h6>
                                         <div className="heading-elements">
                                         <ul className="icons-list">
                                         <li><a data-action="collapse"></a></li>
                                         <li><a data-action="reload"></a></li>
                                         <li><a data-action="close"></a></li>
                                         </ul>
                                         </div>
                                         </div>

                                         <div className="panel-body">
                                         <p className="mb-15">Hierarchical multi selection example. A single-click handler selects the node; a keydown handler selects on <kbd>space</kbd>.</p>

                                         <div className="tree-checkbox-hierarchical well border-left-danger border-left-lg">
                                         <ul>
                                         <li className="folder">中国
                                         <ul>
                                         <li>安徽</li>
                                         <li>上海</li>
                                         </ul>
                                         </li>
                                         </ul>
                                         </div>
                                         </div>
                                         </div>
                                         </div>*/}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class FusionContainerRight extends Component {
    constructor(props) {
        super(props);
        this.domainType = "normal";
        this.geoCover = "china";
        this.protocol = "http";
        this.platform = "web";
        this.sourceType = "langchaoBucket";
        this.httpsPlaceholder = "参考样例:" +
            "-----BEGIN CERTIFICATE-----" +
            "MIIFDTCCA/WgAwIBAgIQJ8rA5miM0Lh963iOqTqPOjANBgkqhkiG9w0BAQsFADB4" +
            "MQswCQYDVQQGEwJJTDEWMBQGA1UEChMNU3RhcnRDb20gTHRkLjEpMCcGA1UECxMg" +
            "U3RhcnRDb20gQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxJjAkBgNVBAMTHVN0YXJ0" +
            "Q29tIENsYXNzIDEgRFYgU2VydmVyIENBMB4XDTE2MDMxNjA1MTgyOFoXDTE3MDMx" +
            "NjA1MTgyOFowFDESMBAGA1UEAwwJZGFybGluLm1lMIIBIjANBgkqhkiG9w0BAQEF" +
            "AAOCAQ8AMIIBCgKCAQEA62IMKtcGkyPDLUPsYcu464gDDE5kjOGdlSrXIv+Hr58/" +
            "I5v9vks7eGIFc5eR2X/C9J0PltDHSWeJkmuafThFeP7hd2chWbKA44zEKBov0xIb" +
            "gBKgJSPd3MFihsIB8i7z8RyHP1YYQIiVe4g7SQwxHgvNKcYd5g+DRP7TUAVS43mN" +
            "CBq04filry2MITqzLNROvrbFulsc1OlOmcHG4m1rkxgWver6cX4V7MG5MMDZKbGE" +
            "GljC4vBUvNf/GIeoGuismCQIa0xwh7eK7ZSN63sTLhAyyOuAgn1f2xwQ4m4CkKda" +
            "jcM1Vc/9jtb/0ae4G84kL3K8vdzWxnTe0kg3BEaCswIDAQABo4IB9TCCAfEwDgYD" +
            "VR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcDATAJBgNV" +
            "HRMEAjAAMB0GA1UdDgQWBBROJ/n8SbSTKGaPpdjF+Ry0STCb8jAfBgNVHSMEGDAW" +
            "gBTXkU4BxLC/+Mhnk0Sc5zP6rZMMrzBvBggrBgEFBQcBAQRjMGEwJAYIKwYBBQUH" +
            "MAGGGGh0dHA6Ly9vY3NwLnN0YXJ0c3NsLmNvbTA5BggrBgEFBQcwAoYtaHR0cDov" +
            "L2FpYS5zdGFydHNzbC5jb20vY2VydHMvc2NhLnNlcnZlcjEuY3J0MDgGA1UdHwQx" +
            "MC8wLaAroCmGJ2h0dHA6Ly9jcmwuc3RhcnRzc2wuY29tL3NjYS1zZXJ2ZXIxLmNy" +
            "bDBTBgNVHREETDBKgglkYXJsaW4ubWWCEHN0YXRpYy5kYXJsaW4ubWWCDWFwaS5k" +
            "YXJsaW4ubWWCDXd3dy5kYXJsaW4ubWWCDW5ldy5kYXJsaW4ubWUwIwYDVR0SBBww" +
            "GoYYaHR0cDovL3d3dy5zdGFydHNzbC5jb20vMFAGA1UdIARJMEcwCAYGZ4EMAQIB" +
            "MDsGCysGAQQBgbU3AQIEMCwwKgYIKwYBBQUHAgEWHmh0dHA6Ly93d3cuc3RhcnRz" +
            "c2wuY29tL3BvbjljeTaNBskqhdiG9w0BAQsFAAOCAQEAdyx3PiO0Y9csDsRboOwE" +
            "cM2M83zzY1n39m4efS+lHDR0Lw/MiHcszfFjg90TDTre8qjAbFe38yNNWMWt6+EO" +
            "lGq7+mUV3CzFPTCW/m0WD+ZjhdcQfNJTNrNlOOH2IEDNR01s4jVRlAOtfy+FyXOX" +
            "tWHXGoQ7PGg4uYvC/WapyHV/Wpu0iVEI3yyI+cCgo9ww+VPOn8Q/hJdb+eZ0wTki" +
            "TEYAtTyfY9nMMmzK7luVTCEzm/SeUKL+3AML5I6P+oRUzTlz3fT2lE2TJjbu9Zw2" +
            "TY/apl6Y3/KGFWo0/7eSRzNrFucvWu545z3AJ9b3JaMWiKHL/f4AZZPmj67k3/7R" +
            "3Q==" +
            "-----END CERTIFICATE-----"
    }

    componentDidMount() {
        $('.daterange-single').daterangepicker({
            singleDatePicker: true,
            applyClass: 'bg-slate-600',
            cancelClass: 'btn-default',
            autoUpdateInput: false,
            locale: dateLocale
        });
        $('.daterange-two').daterangepicker({
            maxDate: moment(), //最大时间
            opens: "left",
            applyClass: 'bg-slate-600',
            cancelClass: 'btn-default',
            ranges: rangesLocale,
            startDate: '2016/01/01',
            endDate: moment(),
            locale: dateLocale
        });
        $('.cdn-li a').on('show.bs.tab', function (e) {
            if ($(this).parent().hasClass("disabled")) {
                e.preventDefault();
            }
        });
    }

    _addDomain() {
        this.props._addDomain();
    }

    domainTypeChanged(type) {
        this.domainType = type;
        this.props._startRefresh();
    }

    geoCoverSelect(type) {
        this.geoCover = type;
        this.props._startRefresh();
    }

    protocolSelect(type) {
        this.protocol = type;
        this.props._startRefresh();
    }

    platformSelect(type) {
        this.platform = type;
        this.props._startRefresh();
    }

    sourceTypeSelect(type) {
        if (this.domainType == "normal") {
            this.sourceType = type;
            this.props._startRefresh();
        }
    }

    render() {
        console.log(this.props.showAddDomain);
        var rightContent = "";
        var domainType = this.domainType;
        var scrollHeight = ($(window).height() - 200);
        return (
            <div>
                <div className="product-main">
                    <div className="navbar-resource">
                        <div className="resource-navbar">
                            <div className="resource-nav-header">
                                <a ><img className="resource-icon" alt=""/> <strong className="ng-binding"></strong></a>
                            </div>
                            <div className="resource-menu">
                                <ul className="resource-breadcrumb">
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id="create-domain" className="product-content" style={{height: scrollHeight + "px"}}>
                        <div className="resource-body">
                            <form id="createForm" name="createForm">
                                <section className="q-item">
                                    <div className="row">
                                        <div className="item-title col-md-3">河道等级</div>
                                        <div className="item-body col-md-9">
                                            <div className="clearfix">
                                                <label
                                                    className={domainType == "normal" ? "radio-btn selected" : "radio-btn"}
                                                    onClick={this.domainTypeChanged.bind(this, 'normal')}>
                                                    <input type="radio" name="domainType"
                                                          />
                                                    <span>省内</span>
                                                </label>
                                                <label
                                                    className={domainType == "wildcard" ? "radio-btn selected" : "radio-btn"}
                                                    onClick={this.domainTypeChanged.bind(this, 'wildcard')}
                                                    style={{display: this.sourceType == "langchaoBucket" ? "block" : "none"}}>
                                                    <input type="radio" name="domainType"
                                                          />
                                                    <span>省外</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </section>
                                <section className="q-item">
                                    <div className="row">
                                        <div className="item-title col-md-3">河道名称</div>
                                        <div className="item-body col-md-9">
                                            <div className="item-describe">请输入河道名称。注意：为了便于标识河道，请准确对河道进行命名。</div>
                                            <div className="form-group form-inline">
                                                <input className="form-control" type="text" placeholder="河道名称"/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </section>
                                <section className="q-item">
                                    <div className="row">
                                        <div className="item-title col-md-3">告示牌</div>
                                        <div className="item-body col-md-9">
                                            <div className="clearfix">
                                                <label
                                                    className={this.geoCover == "china" ? "radio-btn selected" : "radio-btn"}
                                                    onClick={this.geoCoverSelect.bind(this, 'china')}>
                                                    <input type="radio" name="geoCover"
                                                           />
                                                    <span>有</span>
                                                </label>
                                                <label
                                                    className={this.geoCover == "foreign" ? "radio-btn selected" : "radio-btn"}
                                                    onClick={this.geoCoverSelect.bind(this, 'foreign')}>
                                                    <input type="radio" name="geoCover"
                                                          />
                                                    <span>无</span>
                                                </label>

                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </section>
                                <section className="q-item">
                                    <div className="row">
                                        <div className="item-title col-md-3">起点</div>
                                        <div className="item-body col-md-9">
                                            <div className="form-group form-inline">
                                                <input className="form-control" type="text" placeholder="河道起点"/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </section>
                                <section className="q-item">
                                    <div className="row">
                                        <div className="item-title col-md-3">终点</div>
                                        <div className="item-body col-md-9">
                                            <div className="form-group form-inline">
                                                <input className="form-control" type="text" placeholder="河道终点"/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </section>
                                <section className="q-item">
                                    <div className="row">
                                        <div className="item-title col-md-3">经纬度</div>
                                        <div className="item-body col-md-4">
                                            <div className="form-group form-inline">
                                                <input className="form-control" type="text" placeholder="经度" />
                                            </div>
                                        </div>
                                        <div className="item-body col-md-4">
                                            <div className="form-group form-inline">
                                                <input className="form-control" type="text" placeholder="维度"/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </section>
                                <section className="q-item">
                                    <div className="row">
                                        <div className="item-title col-md-3">位置</div>
                                        <div className="item-body col-md-9">
                                            <div className="form-group form-inline">
                                                <input className="form-control" type="text" placeholder="河道位置" style={{width:"100%"}}/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </section>
                                <section className="q-item">
                                    <div className="row">
                                        <div className="item-title col-md-3">责任体</div>
                                        <div className="item-body col-md-9">
                                            <div className="form-group form-inline">
                                                <input className="form-control" type="text" placeholder="" style={{width:"100%"}}/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </section>

                                <section className="q-item">
                                    <div className="row">
                                        <div className="item-title col-md-3">执行河长</div>
                                        <div className="item-body col-md-9">
                                            <div className="form-group form-inline">
                                                <input className="form-control" type="text" placeholder="执行河长"/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </section>
                                <section className="q-item">
                                    <div className="row">
                                        <div className="item-title col-md-3">河道警长</div>
                                        <div className="item-body col-md-9">
                                            <div className="form-group form-inline">
                                                <input className="form-control" type="text" placeholder="河道警长"/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </section>
                                <section className="q-item">
                                    <div className="row">
                                        <div className="item-title col-md-3">二级河长</div>
                                        <div className="item-body col-md-9">
                                            <div className="form-group form-inline">
                                                <input className="form-control" type="text" placeholder="二级河长"/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </section>
                                <section className="q-item">
                                    <div className="row">
                                        <div className="item-title col-md-3">联系部门</div>
                                        <div className="item-body col-md-9">
                                            <div className="form-group form-inline">
                                                <input className="form-control" type="text" placeholder="联系部门"/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </section>
                                <section className="q-item">
                                    <div className="row">
                                        <div className="item-title col-md-3">联系人</div>
                                        <div className="item-body col-md-4">
                                            <div className="form-group form-inline">
                                                <input className="form-control" type="text" placeholder="姓名"/>
                                            </div>
                                        </div>
                                        <div className="item-body col-md-4">
                                            <div className="form-group form-inline">
                                                <input className="form-control" type="text" placeholder="电话"/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </section>

                                <section className="q-item">
                                    <div className="pull-right">
                                        <button className="btn btn-default">取消</button>
                                        <button className="btn btn-primary">创建</button>
                                    </div>
                                </section>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const {commonReducer}=state;
    return {
        refresh: commonReducer.refresh
    }
}


export default connect(mapStateToProps)(FusionContainer)