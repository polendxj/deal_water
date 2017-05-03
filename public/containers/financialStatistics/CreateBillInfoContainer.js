/**
 * Created by Captain on 2017/4/9.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router';
import {commonRefresh} from '../../actions/Common'
import Highcharts from 'highcharts'
import BreadCrumbs from '../../components/right/breadCrumbs';
import {NoData} from '../../components/Tool/Tool'


export default class CreateBillInfoContainer extends Component {
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
        var tableHeight = ($(window).height() - 65);
        return (
            <div style={{height:tableHeight+"px"}}>
                <div style={{position: "relative"}}>
                    <div style={{overflow: "hidden", height: tableHeight, padding: "20px 0  0 20px", zIndex: "1"}}>
                        <SetBillInfoComponent _startRefresh={this._startRefresh}/>
                    </div>
                    <div style={{clear: "both"}}></div>
                </div>

            </div>
        )
    }
}

class SetBillInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.breadCrumbs = [
            {text: "财务统计", link: ''},
            {text: "发票管理", link: ''},
            {text: "创建开票信息", link: ''}
        ];
        this.operation = [
            {icon: "icon-undo2", text:"返回添加开票信息", action: "/setBillInfo"}
        ];
        this.billType = "normal";
    }
    billTypeChanged(type){
        this.billType = type;
        this.props._startRefresh();
    }
    render() {
        var tableHeight = ($(window).height() - 65);
        return (
            <div style={{height:tableHeight+"px",overflowY:"auto"}}>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-feed'}
                    operation={this.operation}
                />
                <div className="row" style={{marginLeft: "0", marginRight: "10px", marginBottom:"30px"}}>
                    <div className="col-md-10" style={{paddingLeft:"5px"}}>
                        <fieldset className="content-group" style={{padding: "10px"}}>
                            <legend style={{fontSize: "16px", color: "#5E6166",marginBottom:0,padding: "40px 0 26px"}}>

                            </legend>
                            <form id="createBillForm" name="createBillForm" className="form-horizontal">
                                <section className="q-item" style={{marginTop:"30px"}}>
                                    <div className="row">
                                        <div className="item-title col-md-3">发票类型</div>
                                        <div className="item-body col-md-9">
                                            <div className="clearfix">
                                                <label
                                                    className={this.billType == "normal" ? "radio-btn selected" : "radio-btn"}
                                                    onClick={this.billTypeChanged.bind(this, 'normal')}>
                                                    <input type="radio" name="billType"
                                                           checked={this.billType == "normal"}/>
                                                    <span>增值税普通发票</span>
                                                </label>
                                                <label
                                                    className={this.billType == "special" ? "radio-btn selected" : "radio-btn"}
                                                    onClick={this.billTypeChanged.bind(this, 'special')}>
                                                    <input type="radio" name="billType"
                                                           checked={this.billType == "special"}/>
                                                    <span>增值税专用发票</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </section>
                                <section className="q-item" style={{display:this.billType=="normal"?"block":"none",marginTop:"30px"}}>
                                    <div className="row">
                                        <div className="item-title col-md-3">发票抬头</div>
                                        <div className="item-body col-md-9">
                                            <div className="item-describe">普通发票的抬头可以是个人姓名或者公司名称</div>
                                            <div className="form-group form-inline">
                                                <input className="form-control" type="text" placeholder="输入发票抬头"/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </section>
                                <section className="q-item" style={{display:this.billType=="special"?"block":"none",marginTop:"30px"}}>
                                    <div className="row">
                                        <div className="item-title col-md-3">公司信息</div>
                                        <div className="col-md-9">
                                            <div className="form-group clearfix">
                                                <label className="control-label col-lg-2" style={{maxWidth:"180px",fontSize:"14px"}}>公司名称</label>
                                                <div className="col-lg-10" style={{fontSize:"14px",border:0}}>
                                                    <input type="text" className="form-control" style={{width:"350px"}} placeholder="营业执照上的公司名称" />
                                                </div>
                                            </div>
                                            <div className="form-group clearfix">
                                                <label className="control-label col-lg-2" style={{maxWidth:"180px",fontSize:"14px"}}>公司地址</label>
                                                <div className="col-lg-10" style={{fontSize:"14px",border:0}}>
                                                    <input type="text" className="form-control" style={{width:"350px"}} placeholder="营业执照上的公司地址" />
                                                </div>
                                            </div>
                                            <div className="form-group clearfix">
                                                <label className="control-label col-lg-2" style={{maxWidth:"180px",fontSize:"14px"}}>公司电话</label>
                                                <div className="col-lg-10" style={{fontSize:"14px",border:0}}>
                                                    <input type="text" className="form-control" style={{width:"350px"}} placeholder="营业执照上的公司电话" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </section>
                                <section className="q-item" style={{display:this.billType=="special"?"block":"none",marginTop:"30px"}}>
                                    <div className="row">
                                        <div className="item-title col-md-3">开户信息</div>
                                        <div className="col-md-9">
                                            <div className="form-group clearfix">
                                                <label className="control-label col-lg-2" style={{maxWidth:"180px",fontSize:"14px"}}>开户银行</label>
                                                <div className="col-lg-10" style={{fontSize:"14px",border:0}}>
                                                    <input type="text" className="form-control" style={{width:"350px"}} placeholder="公司开户许可证上的开户银行" />
                                                </div>
                                            </div>
                                            <div className="form-group clearfix">
                                                <label className="control-label col-lg-2" style={{maxWidth:"180px",fontSize:"14px"}}>开户账号</label>
                                                <div className="col-lg-10" style={{fontSize:"14px",border:0}}>
                                                    <input type="text" className="form-control" style={{width:"350px"}} placeholder="公司开户许可证上的开户账号" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </section>
                                <section className="q-item" style={{display:this.billType=="special"?"block":"none",marginTop:"30px"}}>
                                    <div className="row">
                                        <div className="item-title col-md-3">纳税信息</div>
                                        <div className="col-md-9">
                                            <div className="form-group clearfix">
                                                <label className="control-label col-lg-2" style={{maxWidth:"180px",fontSize:"14px"}}>纳税人识别号</label>
                                                <div className="col-lg-10" style={{fontSize:"14px",border:0}}>
                                                    <input type="text" className="form-control" style={{width:"350px"}} placeholder="15位的税务登记证编号或18位的社会信用代码" />
                                                </div>
                                            </div>
                                            <div className="form-group clearfix">
                                                <label className="control-label col-lg-2" style={{maxWidth:"180px",fontSize:"14px"}}>纳税人资产证明</label>
                                                <div className="col-lg-10" style={{fontSize:"14px",border:0}}>
                                                    <button type="button" className="btn btn-primary btn-xs"
                                                            style={{color: "#1989FA", backgroundColor: "rgba(33,150,243,0.1)", borderColor: "#AAD3FE"}}>
                                                        &nbsp;&nbsp;上传文件&nbsp;&nbsp;
                                                    </button>
                                                    <div className="upload-declarations">
                                                        <p>上传以下任一个文件即可（jpg、png、gif、bmp 格式的图片，小于 5M）。</p>
                                                        <p>一般纳税人税务事项通知书。</p>
                                                        <p>盖有「增值税一般纳税人」章的税务登记证副本复印件。</p><
                                                        p>若以上两项均无法提供，请登录各地区的国税网，查询一般纳税人资格，将此资格截图打印并加盖公司公章。</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </section>
                                <section className="q-item" style={{marginTop:"30px"}}>
                                    <div className="row">
                                        <button className="btn btn-primary pull-right">确认添加</button>
                                    </div>
                                </section>
                            </form>
                        </fieldset>
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

export default connect(mapStateToProps)(CreateBillInfoContainer)

