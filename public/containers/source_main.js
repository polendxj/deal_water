import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {commonRefresh} from '../actions/Common'
import Highcharts from 'highcharts'
import {NoData} from '../components/Tool/Tool'
import {browserHistory} from 'react-router'


export default class source_main extends Component {
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
        return (
            <div style={{height: tableHeight + 'px'}}>
                <div style={{position: "relative"}}>
                    <div style={{overflowY: "auto", height: tableHeight, padding: "20px 0  0 20px", zIndex: "1"}}>
                        <div id="create" className="ng-scope">
                            <div className="container-fluid"><h5
                                className="main-title text-emphasis">
                                服务范围</h5><p className="text-sub">
                                欢迎使用河道治理管理终端，在这里您可以方便快捷的跟踪河道的水质状况，通过简单操作便可以完成对河道进行数据管理和态势分析。</p>
                                <div className="title text-emphasis">终端管理能力</div>
                                <div className="official-resource">
                                    <div className="official-resource-card">
                                        <div><i className="icon-newspaper" style={{fontSize:"40px",marginTop:"30px",marginBottom:"20px",color:"lightgray"}}></i></div>
                                        <div className="resource-type text-center">水质信息管理</div>
                                        <p className="text-sub text-center">
                                            实现了各河道及其各段的水质基本信息管理，方便的水质信息录入与记录查询</p>
                                    </div>
                                   <div className="official-resource-card">
                                        <div><i className=" icon-shield-check" style={{fontSize:"40px",marginTop:"30px",marginBottom:"20px",color:"lightgray"}}></i></div>
                                        <div className="resource-type text-center">河道巡检服务</div>
                                        <p className="text-sub text-center">
                                           友好的手机APP巡检界面以及精确的河段观察点位置定位，方便河道巡检人员在各水段快速的进行河道巡检结果汇报</p></div>
                                    <div className="official-resource-card">
                                        <div><i className="  icon-pulse2" style={{fontSize:"40px",marginTop:"30px",marginBottom:"20px",color:"lightgray"}}></i></div>
                                        <div className="resource-type text-center">河道治理服务</div>
                                        <p className="text-sub text-center">
                                            根据巡检人员对河道的汇报情况，安排相应的人员开战进行河道治理工作。治理过程中可通过手机APP进行状态汇报，并在WEB管理终端进行结果跟踪</p></div>
                                    <div className="official-resource-card">
                                        <div><i className=" icon-chart" style={{fontSize:"40px",marginTop:"30px",marginBottom:"20px",color:"lightgray"}}></i></div>
                                        <div className="resource-type text-center">数据分析服务</div>
                                        <p className="text-sub text-center">
                                            根据历史河道巡检与治理信息，进行数据统计与分析，包括河道污染严重度、污染常发生时间段、治理周期、治理效果等统计与分析</p>
                                    </div>
                                    <div className="official-resource-card">
                                        <div><i className=" icon-warning22" style={{fontSize:"40px",marginTop:"30px",marginBottom:"20px",color:"lightgray"}}></i></div>
                                        <div className="resource-type text-center">实时告警服务</div>
                                        <p className="text-sub text-center">
                                            友好的巡检、治理信息的告警能力，方便管理人员快速的定位需要处理的河道处理信息</p>
                                    </div>

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

export default connect(mapStateToProps)(source_main)
