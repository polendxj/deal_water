/**
 * Created by Captain on 2017/3/4.
 */

import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {bindActionCreators} from 'redux'
import {Loading, ListModal, serverStatus, ErrorModal, DecodeBase64, array2Json} from '../../components/Tool/Tool';
import BreadCrumbs from '../../components/right/breadCrumbs';
import {saveObject} from '../../actions/CommonActions';
import {commonRefresh} from '../../actions/Common';

export default class UserManageRegisterContainer extends Component {
    constructor(props) {
        super(props)
        this.breadCrumbs = [
            {text: "用户中心", link: ''},
            {text: "用户注册", link: ''}
        ];
        this.operation = [
            {icon: "icon-undo2", text:"返回用户列表", action: "/userManage"}
        ];
        this._save = this._save.bind(this);
        this._startRefresh=this._startRefresh.bind(this)
    }

    _startRefresh(){
        this.props.dispatch(commonRefresh())
    }

    _save(params) {
        this.props.dispatch(saveObject(params,"","",classConf_register,"/DataManage/RubbishClass"));
    }

    render() {
        const {data, form,refresh}=this.props;
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-cog6'}
                    operation={this.operation}
                />
                <div className="content" style={{marginTop: '20px'}}>
                    <RegisterUserManageComponent _save={this._save} _startRefresh={this._startRefresh}/>

                </div>
            </div>
        )
    }
}

class RegisterUserManageComponent extends Component{
    constructor(props) {
        super(props)
        this._save = this._save.bind(this)
    }

    _search() {
        this.props._startRefresh();
    }

    _save() {
        var formFields = $("#registerClassifyForm").serializeArray();
        var params = array2Json(formFields);
        if($("#registerClassifyForm").validate().form()){
            this.props._save(params);
        }
    }


    componentDidMount() {
        $("#registerUserForm").validate({
            ignore: 'input[type=hidden], .select2-input', // ignore hidden fields
            errorClass: 'validation-error-label',
            successClass: 'validation-valid-label',
            highlight: function(element, errorClass) {
                $(element).removeClass(errorClass);
            },
            unhighlight: function(element, errorClass) {
                $(element).removeClass(errorClass);
            },

            validClass: "validation-valid-label",
            success: function(label) {
                label.addClass("validation-valid-label").text("Success.")
            },
            errorPlacement: function(error, element) {
                if(element.parent().hasClass("input-group")){
                    error.appendTo(element.parent().parent().parent().find(".errorShow"));
                }else{
                    error.appendTo(element.parent().parent().find(".errorShow"));
                }
            }
        });
    }

    render() {
        var tableHeight = ($(window).height() - 130);
        return (
            <div>
                <form id="registerUserForm" className="form-horizontal" action="#">
                    <div className="row" style={{height: tableHeight + 'px', overflowY: 'scroll'}}>
                        <div className="col-sm-8 col-sm-offset-2">
                            <fieldset className="content-group">
                                <legend className="text-bold">
                                    {"用户基础信息"}
                                </legend>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center'
                                           }}>{"姓名"}</label>
                                    <div className="col-lg-6">
                                        <input name="name" type="text" className="form-control"
                                               placeholder={"姓名"} required="required"
                                               autoComplete="off"/>
                                    </div>
                                    <div className="col-lg-3 errorShow"></div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center'
                                           }}>{"级别"}</label>
                                    <div className="col-lg-6">
                                        <select name="level" defaultValue={1} className="form-control">
                                            <option value={1}>县级</option>
                                            <option value={2}>镇级</option>
                                            <option value={3}>村级</option>
                                            <option value={4}>环保部</option>
                                            <option value={5}>住建部</option>
                                            <option value={6}>交通部</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center'
                                           }}>{"类型"}</label>
                                    <div className="col-lg-6">
                                        <select name="type" defaultValue={1} className="form-control">
                                            <option value={1}>河长</option>
                                            <option value={2}>网格员</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center'
                                           }}>{"手机号码"}</label>
                                    <div className="col-lg-6">
                                        <input name="phone" type="text" className="form-control"
                                               placeholder={"手机号码"} required="required"
                                               autoComplete="off"/>
                                    </div>
                                    <div className="col-lg-3 errorShow"></div>
                                </div>
                                <div className="form-group">
                                    <label className="col-lg-2 control-label"
                                           style={{
                                               textAlign: 'center'
                                           }}>{"地址"}</label>
                                    <div className="col-lg-6">
                                        <input name="address" type="text" className="form-control"
                                               placeholder={"地址"} required="required"
                                               autoComplete="off"/>
                                    </div>
                                    <div className="col-lg-3 errorShow"></div>
                                </div>
                            </fieldset>

                            <div className="form-group" >
                                <div className="col-lg-11 text-right" style={{marginTop: "50px"}}>
                                    <button type="button" className="btn btn-primary"
                                            onClick={this._save.bind(this)}>{"保存"}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        )

    }
}

function mapStateToProps(state) {
    const {commonReducer}=state
    return {
        refresh: commonReducer.refresh
    }
}

export default connect(mapStateToProps)(UserManageRegisterContainer)