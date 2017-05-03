import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router';
import {commonRefresh} from '../../actions/Common'
import Highcharts from 'highcharts'
import BreadCrumbs from '../../components/right/breadCrumbs';
import {NoData} from '../../components/Tool/Tool'


export default class FinancialStatisticsContainer extends Component {
    constructor(props) {
        super(props);
        this._startRefresh = this._startRefresh.bind(this)
    }

    _startRefresh() {
        this.props.dispatch(commonRefresh())
    }

    componentDidMount() {

    }

    render() {
        var tableHeight = ($(window).height() - 93);
        return (
            <div style={{height: tableHeight + 'px'}}>
                <div style={{position: "relative"}}>
                    <div style={{overflow: "hidden", height: tableHeight, padding: "20px 0  0 20px", zIndex: "1"}}>
                        <FinancialStatisticsComponent _startRefresh={this._startRefresh}/>
                    </div>
                    <div style={{clear: "both"}}></div>
                </div>

            </div>
        )
    }
}

class FinancialStatisticsComponent extends Component {
    constructor(props) {
        super(props);
        this.breadCrumbs = [
            {text: "统计分析", link: ''},
            {text: "统计概览", link: ''}
        ];
        this.operation=[];
        this._showCoupon = this._showCoupon.bind(this);
        this._setBillInfo = this._setBillInfo.bind(this);
        this.showCoupon = false;
    }

    componentDidMount() {

    }
    _clickTab(secondBread){
        this.breadCrumbs[1].text = secondBread;
        this.props._startRefresh();
    }
    _showCoupon(){
        this.showCoupon = !this.showCoupon;
        this.props._startRefresh();
    }
    _setBillInfo(){
        browserHistory.push("/setBillInfo");
    }
    render() {
        var tableHeight = ($(window).height() - 203);
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-coin-yen'}
                    operation={this.operation}
                />
                <div className="tabbable">
                    <ul className="nav nav-tabs nav-tabs-bottom" style={{marginLeft:"15px"}}>
                        <li onClick={this._clickTab.bind(this,"统计概览")} className="active"><a style={{fontSize: "16px",padding:"9px 0"}} href="#bottom-tab1"
                                                  data-toggle="tab">统计概览</a></li>
                        <li onClick={this._clickTab.bind(this,"巡检情况")} style={{marginLeft:"40px"}}><a style={{fontSize: "16px",padding:"9px 0"}} href="#bottom-tab2"
                                                                     data-toggle="tab">巡检情况</a></li>
                        <li onClick={this._clickTab.bind(this,"治理情况")} style={{marginLeft:"40px"}}><a style={{fontSize: "16px",padding:"9px 0"}} href="#bottom-tab3" data-toggle="tab">治理情况</a></li>

                    </ul>

                    <div className="tab-content" style={{height: tableHeight, overflowY: "auto"}}>
                        <div className="tab-pane flipInX active" id="bottom-tab1">
                            <div className="row" style={{marginLeft: "0", marginRight: "10px", marginBottom:"30px"}}>
                                <div className="col-md-12" style={{paddingLeft:"5px",height:"300px",overflowY:"auto"}}>
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <legend style={{fontSize: "16px", color: "#5E6166",marginBottom:0}}>
                                            全区域河流状态图
                                        </legend>
                                        <img src="./assets/overview.png" style={{width:"100%"}} />
                                    </fieldset>
                                </div>
                            </div>
                            <div className="row" style={{marginLeft: "0", marginRight: "10px", marginBottom:"30px"}}>
                                <div className="col-md-10" style={{paddingLeft:"5px"}}>
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <legend style={{fontSize: "16px", color: "#5E6166",marginBottom:0}}>
                                            待处理巡检、治理河道数数
                                        </legend>
                                        <div className="form-group clearfix" style={{minWidth: "500px",paddingBottom: "10px",borderBottom: "1px solid #e5e5e5"}}>
                                            <div className="col-sm-4" style={{borderRight:"1px solid #e5e5e5",paddingLeft:0}}>
                                                <p>巡检河道数（待审核）</p>
                                                <h3 style={{fontWeight:"500px",fontSize:"34px"}}> 16</h3>
                                            </div>
                                            <div className="col-sm-4" style={{paddingLeft:"60px"}}>
                                                <p>治理河道数（待治理）</p>
                                                <h3 style={{fontWeight:"500px",fontSize:"34px"}}> 5</h3>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            <div className="row" style={{marginLeft: "0", marginRight: "10px", marginBottom:"30px"}}>
                                <div className="col-md-10" style={{borderBottom: "1px solid #e5e5e5"}}>
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <legend style={{fontSize: "16px", color: "#5E6166",marginBottom:0,border: "0 red solid"}}>
                                            <h6 style={{fontSize: "16px"}}>过去30天河道巡检、治理数目占比（03-21 ~ 04-21）</h6>
                                        </legend>
                                        <div className="form-group">
                                            <div className="col-md-6" style={{paddingLeft:0}}>
                                                <p style={{maxWidth:"400px"}}>
                                                    <span>巡检数目</span>
                                                    <span className="progress-value pull-right">28/35 个</span>
                                                </p>
                                                <div className="progress progress-sm cdn-progress">
                                                    <div className="progress-bar" style={{width: "80%"}}>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6" style={{paddingLeft:0}}>
                                                <p style={{maxWidth:"400px"}}>
                                                    <span>治理数目</span>
                                                    <span className="progress-value pull-right">4/15 个</span>
                                                </p>
                                                <div className="progress progress-sm cdn-progress">
                                                    <div className="progress-bar" style={{width: "26%"}}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            <div className="row" style={{marginLeft: "0", marginRight: "10px", marginBottom:"30px"}}>
                                <div className="col-md-10">
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <legend style={{fontSize: "16px", color: "#5E6166",marginBottom:0,border: "0 red solid"}}>
                                            <h6 style={{fontSize: "16px"}}>新增河道数（03-21 ~ 04-21）</h6>
                                        </legend>
                                        <div className="form-group">
                                            <div className="col-md-6" style={{paddingLeft:0}}>
                                                <p style={{maxWidth:"400px",color: "#666f80"}}>
                                                    <span>省内新增数: 12 个</span>
                                                </p>
                                            </div>
                                            <div className="col-md-6" style={{paddingLeft:0}}>
                                                <p style={{maxWidth:"400px",color: "#666f80"}}>
                                                    <span>省外新增数: 0 个</span>
                                                </p>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane flipInX" id="bottom-tab2">
                            <div className="row" style={{marginLeft: "0", marginRight: "10px"}}>
                                <div className="col-md-10" style={{paddingLeft:"5px"}}>
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <legend style={{fontSize: "16px", color: "#5E6166",marginBottom:0,paddingBottom:"20px",paddingTop:"30px"}}>
                                            巡检总体情况
                                            <a className="btn">查看详情</a>
                                        </legend>
                                        <div className="form-group clearfix" style={{minWidth: "500px",paddingBottom: "10px",borderBottom: "1px solid #e5e5e5"}}>
                                            <div className="col-md-3" style={{borderRight:"1px solid #e5e5e5",paddingLeft:0}}>
                                                <p style={{textAlign:"center"}}>巡检总次数</p>
                                                <div className="clearfix" style={{textAlign:"center"}}>
                                                    <h3 style={{fontWeight:"500px",fontSize:"34px",display:"inline"}}>89</h3>次
                                                </div>
                                            </div>
                                            <div className="col-md-3" style={{borderRight:"1px solid #e5e5e5",paddingLeft:0}}>
                                                <p style={{textAlign:"center"}}>巡检河道总数</p>
                                                <div className="clearfix" style={{textAlign:"center"}}>
                                                    <h3 style={{fontWeight:"500px",fontSize:"34px",display:"inline"}}>20</h3>次
                                                </div>
                                            </div>
                                            <div className="col-md-3" style={{borderRight:"1px solid #e5e5e5",paddingLeft:0}}>
                                                <p style={{textAlign:"center"}}>已审核巡检总数</p>
                                                <div className="clearfix" style={{textAlign:"center"}}>
                                                    <h3 style={{fontWeight:"500px",fontSize:"34px",display:"inline"}}>87</h3>次
                                                </div>
                                            </div>
                                            <div className="col-md-3" style={{borderRight:"1px solid #e5e5e5",paddingLeft:0}}>
                                                <p style={{textAlign:"center"}}>待审核巡检总数</p>
                                                <div className="clearfix" style={{textAlign:"center"}}>
                                                    <h3 style={{fontWeight:"500px",fontSize:"34px",display:"inline"}}>2</h3>次
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            <div className="row" style={{marginLeft: "0", marginRight: "10px", marginBottom:"30px"}}>
                                <div className="col-md-10" style={{paddingLeft:"5px"}}>
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <div className="panel-body item-body">
                                            <div className="tabbable">
                                                <ul className="nav nav-tabs" style={{borderBottom:"0px solid #ddd"}}>
                                                    <li className="active"><a style={{fontSize: "16px"}} href="#financial-tab1" data-toggle="tab">四级（IV）污染河道</a></li>
                                                    <li><a style={{fontSize: "16px"}} href="#financial-tab2" data-toggle="tab">三级（III）污染河道</a></li>
                                                    <li><a style={{fontSize: "16px"}} href="#financial-tab4" data-toggle="tab">二级（II）污染河道</a></li>
                                                    <li><a style={{fontSize: "16px"}} href="#financial-tab5" data-toggle="tab">一级（严重）污染河道</a></li>
                                                    <li><a style={{fontSize: "16px"}} href="#financial-tab5" data-toggle="tab">优质河道</a></li>
                                                </ul>
                                                <div className="tab-content">
                                                    <div className="tab-pane active" id="financial-tab1">
                                                        <div className="table-responsive financial" id="financial">
                                                            <table className="table">
                                                                <thead>
                                                                <tr>
                                                                    <th>观察点</th>
                                                                    <th>情况描述</th>
                                                                    <th>评分 （百分制）</th>
                                                                    <th>巡检时间</th>
                                                                    <th>状 态</th>
                                                                    <th></th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                <tr>
                                                                    <td>向阳村湖景大坝内河道</td>
                                                                    <td>
                                                                        <ul style={{paddingLeft:0}}>
                                                                            <li>1.水流浑浊，肉眼可见大量砂石</li>
                                                                            <li>2.高锰酸钾含量 17 MG/L</li>
                                                                            <li>3.总磷量 0.8 MG.L</li>
                                                                            <li>4.漂浮物大量堆积于和道口</li>
                                                                        </ul>
                                                                    </td>
                                                                    <td>
                                                                        34 分
                                                                    </td>
                                                                    <td>
                                                                        2017-4-21 13:58:46
                                                                    </td>
                                                                    <td>
                                                                        未审核
                                                                    </td>
                                                                    <td>
                                                                        <a className="btn">查看详情</a>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>谭堰村汪家口内河道2段</td>
                                                                    <td>
                                                                        <ul style={{paddingLeft:0}}>
                                                                            <li>1.水流浑浊，肉眼可见大量砂石</li>
                                                                            <li>2.高锰酸钾含量 26 MG/L</li>
                                                                            <li>3.总磷量 1.2 MG.L</li>
                                                                            <li>4.漂浮物大量堆积于和道口</li>
                                                                        </ul>
                                                                    </td>
                                                                    <td>
                                                                        15 分
                                                                    </td>
                                                                    <td>
                                                                        2017-4-21 02:15:02
                                                                    </td>
                                                                    <td>
                                                                        已审核
                                                                    </td>
                                                                    <td>
                                                                        <a className="btn">查看详情</a>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane" id="financial-tab2">
                                                        <NoData/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane flipInX" id="bottom-tab3">
                            <div className="row" style={{marginLeft: "0", marginRight: "10px"}}>
                                <div className="col-md-10" style={{paddingLeft:"5px"}}>
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <legend style={{fontSize: "16px", color: "#5E6166",marginBottom:0,paddingBottom:"20px",paddingTop:"30px"}}>
                                            治理总体情况
                                            <a className="btn">查看详情</a>
                                        </legend>
                                        <div className="form-group clearfix" style={{minWidth: "500px",paddingBottom: "10px",borderBottom: "1px solid #e5e5e5"}}>
                                            <div className="col-md-3" style={{borderRight:"1px solid #e5e5e5",paddingLeft:0}}>
                                                <p style={{textAlign:"center"}}>治理总次数</p>
                                                <div className="clearfix" style={{textAlign:"center"}}>
                                                    <h3 style={{fontWeight:"500px",fontSize:"34px",display:"inline"}}>67</h3>个
                                                </div>
                                            </div>
                                            <div className="col-md-3" style={{borderRight:"1px solid #e5e5e5",paddingLeft:0}}>
                                                <p style={{textAlign:"center"}}>治理河道总数</p>
                                                <div className="clearfix" style={{textAlign:"center"}}>
                                                    <h3 style={{fontWeight:"500px",fontSize:"34px",display:"inline"}}>20</h3>个
                                                </div>
                                            </div>
                                            <div className="col-md-3" style={{borderRight:"1px solid #e5e5e5",paddingLeft:0}}>
                                                <p style={{textAlign:"center"}}>已治理河道总数</p>
                                                <div className="clearfix" style={{textAlign:"center"}}>
                                                    <h3 style={{fontWeight:"500px",fontSize:"34px",display:"inline"}}>18</h3>个
                                                </div>
                                            </div>
                                            <div className="col-md-3" style={{borderRight:"1px solid #e5e5e5",paddingLeft:0}}>
                                                <p style={{textAlign:"center"}}>待治理河道总数</p>
                                                <div className="clearfix" style={{textAlign:"center"}}>
                                                    <h3 style={{fontWeight:"500px",fontSize:"34px",display:"inline"}}>2</h3>个
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            <div className="row" style={{marginLeft: "0", marginRight: "10px", marginBottom:"30px"}}>
                                <div className="col-md-10" style={{paddingLeft:"5px"}}>
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <div className="panel-body item-body">
                                            <div className="tabbable">
                                                <ul className="nav nav-tabs" style={{borderBottom:"0px solid #ddd"}}>
                                                    <li className="active"><a style={{fontSize: "16px"}} href="#financial1-tab1" data-toggle="tab">四级（IV）污染河道</a></li>
                                                    <li><a style={{fontSize: "16px"}} href="#financial1-tab2" data-toggle="tab">三级（III）污染河道</a></li>
                                                    <li><a style={{fontSize: "16px"}} href="#financial1-tab4" data-toggle="tab">二级（II）污染河道</a></li>
                                                    <li><a style={{fontSize: "16px"}} href="#financial1-tab5" data-toggle="tab">一级（严重）污染河道</a></li>
                                                    <li><a style={{fontSize: "16px"}} href="#financial1-tab5" data-toggle="tab">优质河道</a></li>
                                                </ul>
                                                <div className="tab-content">
                                                    <div className="tab-pane active" id="financial1-tab1">
                                                        <div className="table-responsive financial" id="financial">
                                                            <table className="table">
                                                                <thead>
                                                                <tr>
                                                                    <th>治理点</th>
                                                                    <th>情况描述</th>
                                                                    <th>治理开始时间</th>
                                                                    <th>治理完成时间</th>
                                                                    <th>负责人</th>
                                                                    <th>状 态</th>
                                                                    <th></th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                <tr>
                                                                    <td>向阳村湖景大坝内河道</td>
                                                                    <td>
                                                                        <ul style={{paddingLeft:0}}>
                                                                            <li>1.水质已逐渐清澈，砂石基本清楚</li>
                                                                            <li>2.高锰酸钾含量 2 MG/L</li>
                                                                            <li>3.总磷量 0.1 MG.L</li>
                                                                            <li>4.垃圾漂浮物已清除完毕</li>
                                                                        </ul>
                                                                    </td>
                                                                    <td>
                                                                        2017-5-2 19:30:00
                                                                    </td>
                                                                    <td>
                                                                        2017-5-12 14:00:00
                                                                    </td>
                                                                    <td>
                                                                        王建军
                                                                    </td>
                                                                    <td>
                                                                        完 毕
                                                                    </td>
                                                                    <td>
                                                                        <a className="btn">查看详情</a>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>谭堰村汪家口内河道2段</td>
                                                                    <td>
                                                                        <ul style={{paddingLeft:0}}>
                                                                            <li>1.水质已逐渐清澈，砂石基本清楚</li>
                                                                            <li>2.高锰酸钾含量 2 MG/L</li>
                                                                            <li>3.总磷量 0.1 MG.L</li>
                                                                            <li>4.垃圾漂浮物已清除完毕</li>
                                                                        </ul>
                                                                    </td>
                                                                    <td>
                                                                        2017-5-2 19:30:00
                                                                    </td>
                                                                    <td>
                                                                        - -
                                                                    </td>
                                                                    <td>
                                                                        付大海
                                                                    </td>
                                                                    <td>
                                                                        进行中
                                                                    </td>
                                                                    <td>
                                                                        <a className="btn">查看详情</a>
                                                                    </td>
                                                                </tr>

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane" id="financial1-tab2">
                                                        <NoData/>
                                                    </div>
                                                    <div className="tab-pane" id="financial1-tab4">
                                                        <NoData/>
                                                    </div>
                                                    <div className="tab-pane" id="financial1-tab5">
                                                        <NoData/>
                                                    </div>
                                                    <div className="tab-pane" id="financial1-tab6">
                                                        <NoData/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane flipInX" id="bottom-tab4">
                            <div className="row" style={{marginLeft: "0", marginRight: "10px"}}>
                                <div className="col-md-10" style={{paddingLeft:"5px"}}>
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <legend style={{fontSize: "16px", color: "#5E6166",marginBottom:0,border:"0px solid red"}}>
                                            近期账单
                                        </legend>

                                    </fieldset>
                                </div>
                            </div>
                            <div className="row" style={{marginLeft: "0", marginRight: "10px"}}>
                                <div className="col-md-10" style={{paddingLeft:"5px"}}>
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <legend style={{fontSize: "16px", color: "#5E6166",marginBottom:0,border:"0px solid red"}}>
                                            <div className="form-group">
                                                <label className="radio-inline"><h6>最近六个月的消费详情</h6></label>
                                                <label className="radio-inline">
                                                    <input type="radio" checked="checked" name="consume"/>
                                                     全部
                                                </label>
                                                <label className="radio-inline">
                                                    <input type="radio" name="consume"/>
                                                    消费
                                                </label>
                                                <label className="radio-inline">
                                                    <input type="radio" name="consume"/>
                                                    充值
                                                </label>
                                                <label className="radio-inline">
                                                    <input type="radio" name="consume"/>
                                                    赠送
                                                </label>
                                            </div>
                                        </legend>
                                        <div className="table-responsive financial">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>账单编号</th>
                                                    <th>账单时间</th>
                                                    <th>账单金额</th>
                                                    <th>账单状态</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td colSpan="10"><NoData text="不存在任何消费数据" /></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane flipInX" id="bottom-tab5">
                            <div className="row" style={{marginLeft: "0", marginRight: "10px"}}>
                                <div className="col-md-10" style={{paddingLeft:"5px"}}>
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <legend style={{fontSize: "16px", color: "#5E6166",marginBottom:0,paddingTop:"10px", border:"0px solid red"}}>
                                            <p className="text-muted">在云平台服务使用抵用券，使用成功（即激活成功）的抵用券显示在已激活的列表中。发生扣费时，系统优先扣除最近过期的抵用券。抵用券不可抵用快递费用，也不可改变账户的欠费状态。</p>
                                        </legend>
                                        <form className="form-horizontal" action="#">
                                            <div className="form-group">
                                                <label className="control-label col-lg-2" style={{maxWidth:"180px",color:"#8f9bb3",fontWeight: 700,fontSize:"16px"}}>验证码</label>
                                                <div className="col-lg-6" style={{maxWidth:"300px"}}>
                                                    <input type="text" className="form-control" placeholder="验证码"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-lg-2" style={{maxWidth:"180px",color:"#8f9bb3",fontWeight: 700,fontSize:"16px"}}>抵用券号码</label>
                                                <div className="col-lg-6" style={{maxWidth:"300px"}}>
                                                    <input type="text" className="form-control" placeholder="输入抵用券号码"/>
                                                </div>
                                                <div className="col-lg-2">
                                                    <button className="btn btn-primary">激活抵用券</button>
                                                </div>
                                            </div>
                                        </form>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane flipInX" id="bottom-tab6">
                            <div className="row" style={{marginLeft: "0", marginRight: "10px"}}>
                                <div className="col-md-10" style={{paddingLeft:"5px"}}>
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <legend style={{fontSize: "16px", color: "#5E6166",marginBottom:0,paddingTop:"10px", border:"0px solid red"}}>
                                            <div className="describe-list">
                                                <ol>
                                                    <li>开发票请先填写开票信息。增值税普通发票填写后即可开票，增值税专用发票需审核后才可开票。审核需要 1~3 个工作日。</li>
                                                    <li>每月前 3 个工作日为账期，在此期间的申请需等到当月第 4 个工作日方可开票。</li>
                                                    <li>充值后请尽快申请开票，超过 6 个月未申请开票的充值流水将不可开票。</li>
                                                    <li>申请发票金额小于 100 元需支付快递费 5 元，快递费将在现金账户中扣除；超过 100 元免收快递费。</li>
                                                    <li>增值税专用发票单张上限为 10 万，增值税普通发票单张上限为 100 万，超过限额请分开申请或联系销售申请。</li>
                                                    <li>开票金额为 1000 元以上时才可申请开具增值税专用发票。</li>
                                                </ol>
                                            </div>
                                        </legend>
                                        <div className="form-group">
                                            <button className="btn btn-primary">申请开票</button>
                                            <button className="btn btn-default" style={{left:"20px"}} onClick={this._setBillInfo}>设置开票信息</button>
                                        </div>
                                        <div className="table-responsive financial">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>金额</th>
                                                    <th>申请时间</th>
                                                    <th>发票抬头</th>
                                                    <th>发票类型</th>
                                                    <th>发票状态</th>
                                                    <th>快递公司</th>
                                                    <th>运单号</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td colSpan="10"><NoData text="不存在任何发票信息" /></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane flipInX" id="bottom-tab7">
                            <div className="row" style={{marginLeft: "0", marginRight: "10px"}}>
                                <div className="col-md-10" style={{paddingLeft:"5px"}}>
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <legend style={{fontSize: "16px", color: "#5E6166",marginBottom:0,paddingTop:"10px", border:"0px solid red"}}>
                                            <div className="form-group">
                                                <label className="radio-inline">
                                                    <input type="radio" checked="checked" name="order"/>
                                                    全部订单
                                                </label>
                                                <label className="radio-inline">
                                                    <input type="radio" name="order"/>
                                                    未支付订单
                                                </label>
                                                <label className="radio-inline">
                                                    <input type="radio" name="order"/>
                                                    已支付订单
                                                </label>
                                            </div>
                                        </legend>
                                        <div className="table-responsive financial">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>订单号</th>
                                                    <th>所购产品</th>
                                                    <th>付款方式及类型</th>
                                                    <th>金额</th>
                                                    <th>产品起始时间</th>
                                                    <th>产品结束时间</th>
                                                    <th>支付状态</th>
                                                    <th>生效状态</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td colSpan="10"><NoData text="不存在任何支付信息"/></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </fieldset>
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

export default connect(mapStateToProps)(FinancialStatisticsContainer)
