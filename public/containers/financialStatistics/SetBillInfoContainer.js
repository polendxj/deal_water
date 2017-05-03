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


export default class SetBillInfoContainer extends Component {
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
            {text: "添加开票信息", link: ''}
        ];
        this.operation = [
            {icon: "icon-undo2", text:"返回发票管理", action: "/financialStatistic"}
        ];
    }

    _createBillInfo(){
        browserHistory.push("/createBillInfo");
    }
    render() {
        var tableHeight = ($(window).height() - 203);
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-feed'}
                    operation={this.operation}
                />
                <div className="row" style={{marginLeft: "0", marginRight: "10px", marginBottom:"30px"}}>
                    <div className="col-md-10" style={{paddingLeft:"5px"}}>
                        <fieldset className="content-group" style={{padding: "10px"}}>
                            <legend style={{fontSize: "16px", color: "#5E6166",marginBottom:0,padding: "40px 0 26px",border:"0px solid red"}}>
                                <button className="btn btn-primary" onClick={this._createBillInfo}>添加开票信息</button>
                            </legend>
                            <div className="table-responsive financial">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>发票信息</th>
                                        <th>发票类型</th>
                                        <th>状态</th>
                                        <th>设为默认开票信息</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td colSpan="10">
                                            <NoData text="不存在任何发票信息"/>

                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
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

export default connect(mapStateToProps)(SetBillInfoContainer)
