import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {commonRefresh} from '../../actions/Common'
import Highcharts from 'highcharts'
import {NoData} from '../../components/Tool/Tool'
import {browserHistory} from 'react-router'


export default class SpeedDomaincontainer extends Component {
    constructor(props) {
        super(props)
        this.page_position = "detail";
        this._gotoDetail = this._gotoDetail.bind(this);
        this._gotoCreate = this._gotoCreate.bind(this);
    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }

    componentDidMount() {
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
        var page = "";
        if (this.page_position == "detail") {
            page = <Source_panel_right />;
        } else {
            page = <Source_panel_create _gotoDetail={this._gotoDetail} />;
        }
        return (
            <div style={{height: tableHeight + 'px'}}>
                <div style={{position: "relative"}}>
                    <div style={{
                        width: "250px",
                        height: tableHeight,
                        float: "left",
                        borderRight: "thin lightgray solid",
                        zIndex: "10"
                    }}>
                        <Source_panel_left _gotoDetail={this._gotoDetail} _gotoCreate={this._gotoCreate}/>
                    </div>
                    <div style={{overflow: "hidden", height: tableHeight, padding: "20px 0  0 20px", zIndex: "1"}}>
                        {page}
                    </div>
                    <div style={{clear: "both"}}></div>
                </div>

            </div>
        )
    }
}

class Source_panel_left extends Component {
    constructor(props) {
        super(props)
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
                    <button onClick={this.props._gotoCreate.bind(this)} type="button"
                            className="btn btn-primary btn-xs btn-rounded"
                            style={{color: "#1989FA", backgroundColor: "rgba(33,150,243,0.1)", borderColor: "#AAD3FE"}}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        新建存储空间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </button>
                </div>
                <div style={{width: "203px", paddingLeft: "45px"}}>
                    <div className="form-group has-feedback has-feedback-left"
                         style={{textAlign: "center", marginTop: "15px"}}>
                        <input type="text" className="form-control input-xs" placeholder="搜索存储空间"
                               style={{borderRadius: "50px"}}/>
                        <div className="form-control-feedback">
                            <i className="icon-search4 text-size-base"></i>
                        </div>
                    </div>
                </div>
                <fieldset className="content-group" style={{padding: "30px"}}>
                    <legend style={{fontSize: "14px", color: "#5E6166", border: "0 red solid"}}>存储空间列表</legend>
                    <div className="navigation navigation-main1 navigation-accordion" style={{marginTop: "-40px"}}>
                        <li className="active">
                            <a href="#" className="has-ul"> <span>香港</span></a>
                            <ul className="hidden-ul" style={{display: "block"}}>
                                <li onClick={this.props._gotoDetail.bind(this)}><a href="javascript:void(0);" style={{
                                    borderTop: "1px lightgray solid",
                                    borderBottom: "1px lightgray solid"
                                }}>Inspur_Test</a>
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
                            </ul>
                        </li>
                    </div>
                </fieldset>
                <fieldset className="content-group" style={{padding: "30px"}}>
                    <legend style={{fontSize: "14px", color: "#5E6166", border: "0 red solid"}}><a>跨区域同步管理</a></legend>

                </fieldset>

            </div>
        )
    }
}

class Source_panel_create extends Component {
    render() {
        var tableHeight = ($(window).height() - 114);
        return (
            <div className="product-content" style={{height: tableHeight, overflowY: "auto", overflowX: "hidden"}}>
                <div className="resource-body" style={{padding: "0"}}>
                    <form name="createForm">
                        <hr />
                        <section className="q-item">
                            <div className="row">
                                <div className="item-title col-md-3">存储空间名称</div>
                                <div className="item-body col-md-9">
                                    <p className="item-describe">存储空间名称作为唯一的 Bucket 识别符，遇到冲突请更换名称。
                                        名称由 4 ~ 63 个字符组成 ，可包含 字母、数字、中划线。</p>
                                    <div className="form-group form-inline">
                                        <input style={{width: "300px"}} type="text"
                                               className="form-control ng-pristine ng-untouched ng-valid ng-empty ng-valid-pattern"
                                               placeholder="" name="mirrorSource"/>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        </section>
                        <section className="q-item">
                            <div className="row">
                                <div className="item-title col-md-3">存储区域</div>
                                <div className="item-body col-md-9">
                                    <p className="item-describe">北美区域尚未支持自定义数据处理服务，一旦创建区域无法修改，请谨慎选择。</p>
                                    <div className="clearfix">
                                        <label
                                            className={"radio-btn"}>
                                            <input type="radio" name="domainType"/>
                                            <span>香港</span>
                                        </label>
                                        <label
                                            className={"radio-btn"}>
                                            <input type="radio" name="domainType"/>
                                            <span>澳洲</span>
                                        </label>
                                        <label
                                            className={"radio-btn"}>
                                            <input type="radio" name="domainType"/>
                                            <span>欧洲</span>
                                        </label>
                                        <label
                                            className={"radio-btn"}>
                                            <input type="radio" name="domainType"/>
                                            <span>北美</span>
                                        </label>
                                    </div>

                                </div>
                            </div>
                            <hr/>
                        </section>
                        <section className="q-item clearfix">
                            <div className="pull-right"><a onClick={this.props._gotoDetail.bind(this)} className="btn btn-lg btn-default btn-mute"
                            >取消</a>
                                <button type="button" style={{marginLeft: "10px", marginRight: "10px"}}
                                        className="btn btn-lg btn-primary btn-emphasis"
                                >创建
                                </button>
                            </div>
                        </section>
                    </form>
                </div>
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
        var chart = new Highcharts.Chart('container', {
            title: {
                text: '',
                x: -20
            },
            subtitle: {
                text: '',
                x: -20
            },
            xAxis: {
                categories: ['4月01号', '4月03号', '4月05号', '4月07号']
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
                name: '文件存储',
                data: [0, 0, 0, 0]
            }]
        });

        var chartAPI = new Highcharts.Chart('containerAPI', {
            title: {
                text: '',
                x: -20
            },
            subtitle: {
                text: '',
                x: -20
            },
            xAxis: {
                categories: ['4月01号', '4月03号', '4月05号', '4月07号']
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
                    return this.value + " 次";
                },
                labels: {
                    format: '{value} 次'
                }

            },

            credits: {
                enabled: false,
            },
            tooltip: {
                valueSuffix: '次'
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
                data: [0, 0, 0, 0]
            }]
        });

        var chart3 = new Highcharts.Chart('containerBytes', {
            title: {
                text: '',
                x: -20
            },
            subtitle: {
                text: '',
                x: -20
            },
            xAxis: {
                categories: ['4月01号', '4月03号', '4月05号', '4月07号']
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
                name: '空间流量',
                data: [0, 0, 0, 0]
            }]
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
            <div>
                <h4 className="panel-title"><i className="icon-feed"> </i> &nbsp;&nbsp;Inspur_Test</h4>
                <div className="tabbable">
                    <ul className="nav nav-tabs nav-tabs-bottom">
                        <li className="active"><a style={{fontSize: "16px"}} href="#bottom-tab1"
                                                  data-toggle="tab">空间概览</a></li>
                        <li onClick={this._getStatics.bind(this)}><a style={{fontSize: "16px"}} href="#bottom-tab2"
                                                                     data-toggle="tab">数据统计</a></li>
                        <li><a style={{fontSize: "16px"}} href="#bottom-tab3" data-toggle="tab">内容管理</a></li>
                        <li><a style={{fontSize: "16px"}} href="#bottom-tab4" data-toggle="tab">镜像存储</a></li>
                        <li onClick={this._location.bind(this, "/fusion")}><a style={{fontSize: "16px"}}
                                                                              href="#bottom-tab5"
                                                                              data-toggle="tab">绑定域名</a></li>
                        <li><a style={{fontSize: "16px"}} href="#bottom-tab8" data-toggle="tab">空间设置</a></li>

                    </ul>

                    <div className="tab-content" style={{height: tableHeight, overflowY: "auto"}}>
                        <div className="tab-pane flipInX active" id="bottom-tab1">
                            <div className="row" style={{marginLeft: "0", marginRight: "10px"}}>
                                <div className="col-md-5">
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <legend style={{fontSize: "16px", color: "#5E6166", border: "0 red solid"}}>
                                            文件存储
                                        </legend>
                                        <div id="container" style={{minWidth: "400px", height: "180px"}}></div>
                                        <legend style={{fontSize: "16px", color: "#5E6166", border: "0 red solid"}}>
                                            API请求
                                        </legend>
                                        <div id="containerAPI" style={{minWidth: "400px", height: "180px"}}></div>
                                        <legend style={{fontSize: "16px", color: "#5E6166", border: "0 red solid"}}>
                                            空间流量
                                        </legend>
                                        <div id="containerBytes" style={{minWidth: "400px", height: "180px"}}></div>
                                        <div className="alert alert-info no-border">
                                            <span className="text-semibold">空间中的 CDN 流量/带宽 已迁至</span> 数据统计-融合 CDN， <a
                                            href="#">点击查看.</a>
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="col-md-7">
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <legend style={{fontSize: "16px", color: "#5E6166"}}>
                                            测试域名
                                        </legend>
                                        <div className="alert alert-primary no-border">
                                            <span className="text-semibold"> <i className="icon-warning22"></i> 此类测试域名，限总流量，限单 IP 访问频率，限速，仅供测试使用，不能用于自定义域名的 CNAME</span>
                                            <a href="#">相关文档</a>
                                            <br/>
                                            <br/>
                                            <span className="text-semibold">inspur.new-ab.com.os.vdscdn.net</span>
                                        </div>
                                        <legend style={{fontSize: "16px", color: "#5E6166"}}>
                                            CDN加速域名
                                            <span className="pull-right"
                                                  style={{fontSize: "12px", color: "gray", marginTop: "3px"}}><i
                                                className=" icon-checkbox-checked"></i> 自定义域名</span>

                                        </legend>
                                        <div>
                                            <div className="table-responsive">
                                                <table className="table" style={{fontSize: "14px"}}>
                                                    <tbody>
                                                    <tr>
                                                        <td style={{width:"50px",borderTop: "0 red solid"}}><i className="icon-circle-small"></i></td>
                                                        <td style={{borderTop: "0 red solid"}}>inspur.new-ab.com.os.vdscdn.net</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="alert alert-primary no-border">
                                                <span className="text-semibold"> <i className="icon-warning22"></i> 请配置CNAME记录到以上加速域名上</span>
                                            </div>
                                        </div>

                                        <legend style={{fontSize: "16px", color: "#5E6166"}}>
                                            空间设置
                                            <span className="pull-right"
                                                  style={{fontSize: "12px", color: "gray", marginTop: "3px"}}><i
                                                className=" icon-cog3"></i> 空间设置</span>
                                        </legend>
                                        <div className="table-responsive">
                                            <table className="table" style={{fontSize: "14px"}}>
                                                <tbody>
                                                <tr>
                                                    <td style={{width: "200px", borderTop: "0 red solid"}}>存储区域</td>
                                                    <td style={{borderTop: "0 red solid"}}>香港</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: "200px", borderTop: "0 red solid"}}>默认首页设置</td>
                                                    <td style={{borderTop: "0 red solid"}}>关闭</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: "200px", borderTop: "0 red solid"}}>空间 404 页面设置
                                                    </td>
                                                    <td style={{borderTop: "0 red solid"}}>已开启</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: "200px", borderTop: "0 red solid"}}>原图保护</td>
                                                    <td style={{borderTop: "0 red solid"}}>关闭</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: "200px", borderTop: "0 red solid"}}>maxAge</td>
                                                    <td style={{borderTop: "0 red solid"}}>313536000</td>
                                                </tr>
                                                <tr>
                                                    <td style={{width: "200px", borderTop: "0 red solid"}}>访问日志</td>
                                                    <td style={{borderTop: "0 red solid"}}>关闭</td>
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
                                                <option value="opt1">inspur.new-ab.com.os.vdscdn.net</option>
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

function mapStateToProps(state) {
    const {commonReducer}=state
    return {
        refresh: commonReducer.refresh,
    }
}

export default connect(mapStateToProps)(SpeedDomaincontainer)
