import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router';
import {commonRefresh} from '../../actions/Common'
import Highcharts from 'highcharts'
import BreadCrumbs from '../../components/right/breadCrumbs';
import {NoData} from '../../components/Tool/Tool'


export default class PersonnalContainer extends Component {
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
            {text: "个人中心", link: ''},
            {text: "个人信息", link: ''}
        ];
        this.operation = [];
        this._showCoupon = this._showCoupon.bind(this);
        this._setBillInfo = this._setBillInfo.bind(this);
        this.showCoupon = false;
    }

    componentDidMount() {

    }

    _clickTab(secondBread) {
        this.breadCrumbs[1].text = secondBread;
        this.props._startRefresh();
    }

    _showCoupon() {
        this.showCoupon = !this.showCoupon;
        this.props._startRefresh();
    }

    _setBillInfo() {
        browserHistory.push("/setBillInfo");
    }

    render() {
        var tableHeight = ($(window).height() - 203);
        return (
            <div>
                <BreadCrumbs
                    breadCrumbs={this.breadCrumbs}
                    icon={'icon-vcard'}
                    operation={this.operation}
                />
                <div className="tabbable">
                    <ul className="nav nav-tabs nav-tabs-bottom" style={{marginLeft: "15px"}}>
                        <li onClick={this._clickTab.bind(this, "个人信息")} className="active"><a
                            style={{fontSize: "16px", padding: "9px 0"}} href="#bottom-tab1"
                            data-toggle="tab">个人信息</a></li>
                        <li onClick={this._clickTab.bind(this, "秘钥管理")} style={{marginLeft: "40px"}}><a
                            style={{fontSize: "16px", padding: "9px 0"}} href="#bottom-tab2"
                            data-toggle="tab">秘钥管理</a></li>
                        <li onClick={this._clickTab.bind(this, "安全设置")} style={{marginLeft: "40px"}}><a
                            style={{fontSize: "16px", padding: "9px 0"}} href="#bottom-tab3" data-toggle="tab">安全设置</a>
                        </li>
                        <li onClick={this._clickTab.bind(this, "提醒设置")} style={{marginLeft: "40px"}}><a
                            style={{fontSize: "16px", padding: "9px 0"}} href="#bottom-tab4" data-toggle="tab">提醒设置</a>
                        </li>
                        <li onClick={this._clickTab.bind(this, "操作日志")} style={{marginLeft: "40px"}}><a
                            style={{fontSize: "16px", padding: "9px 0"}} href="#bottom-tab5" data-toggle="tab">操作日志</a>
                        </li>
                    </ul>

                    <div className="tab-content" style={{height: tableHeight, overflowY: "auto"}}>
                        <div className="tab-pane flipInX active" id="bottom-tab1">
                            <div className="row"
                                 style={{marginLeft: "0", marginRight: "10px", marginBottom: "30px", padding: "20px"}}>
                                <div id="user-profile" class="gaea-user user-profile ng-scope">
                                    <div className="profile-head row">
                                        <div className="profile-pic col-sm-3"><a href="#"
                                                                                 target="_blank"><img style={{marginTop:"20px"}}
                                            className="avatar"
                                            src="/assets/images/inspur.png"/>
                                            <div className="avatar-mask" tooltip-placement="top" uib-tooltip="我要换头像"
                                                 tooltip-className="avatar-tooltip"><i className="qi qi-edit"></i></div>
                                        </a>
                                        </div>
                                        <div className="profile-verify col-sm-9"><p className="ng-binding">
                                            inspur_test@inspur.com</p>
                                            <div className="verify-info">
                                                <div className="info-block"><i className="qi qi-user2"></i> <span
                                                    ng-if="identityData.status.isIdentified() &amp;&amp; !userInfo.isEnterprise()"
                                                    className="ng-scope">已认证个人用户 <a
                                                    ng-if="identityData &amp;&amp; identityData.status.isSuccess() &amp;&amp; !identityData.is_enterprise"
                                                    className="upgrade-to-enterprise ng-scope"
                                                    ui-sref="gaea.identity.enterprise" href="#">升级至企业用户</a></span>
                                                </div>
                                                <div className="info-block ng-binding"><i className="qi qi-phone"></i>已绑定手机：无
                                                    <a
                                                        className="mobile-info ng-scope" href="#"
                                                        ng-if="userInfo.mobile_info.left > 0"
                                                        uib-tooltip="此手机号已绑定 1 个账户，还可绑定 4 个账户。">绑定信息</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="has-identity ng-scope"
                                         ng-if="identityData.status.isSuccess() &amp;&amp; !identityData.cannt_show">
                                        <h6>实名认证信息</h6>
                                        <table className="table profile-table table-loading">
                                            <tbody>
                                            <tr>
                                                <td ng-bind="identityData.is_enterprise ? '运营者姓名' : '真实姓名'"
                                                    className="ng-binding">真实姓名
                                                </td>
                                                <td className="ng-binding"></td>
                                            </tr>
                                            <tr>
                                                <td>所在地</td>
                                                <td className="ng-binding">山东省 济南市</td>
                                            </tr>
                                            <tr>
                                                <td>身份证号</td>
                                                <td className="ng-binding">无</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="person-info ng-scope" ng-if="!identityDataIsLoading"><h6>个人信息</h6>
                                        <form name="personalInfoForm"
                                              ng-submit="submitPersonalInfo(personalInfoForm.$valid)"
                                              className="ng-pristine ng-valid ng-valid-maxlength ng-valid-pattern">
                                            <table className="table profile-table table-loading">
                                                <tbody>
                                                <tr>
                                                    <td>昵称</td>
                                                    <td><input type="text" placeholder="请输入昵称"
                                                               className="form-control ng-pristine ng-untouched ng-valid ng-valid-maxlength ng-not-empty"
                                                               maxlength="60" ng-model="personalInfo.nickname"
                                                               name="nickname" aria-invalid="false"/></td>
                                                </tr>
                                                <tr>
                                                    <td>联系地址</td>
                                                    <td><input type="text" placeholder="请输入联系地址"
                                                               className="form-control ng-pristine ng-untouched ng-valid ng-empty ng-valid-maxlength"
                                                               maxlength="60" ng-model="personalInfo.contact_address"
                                                               name="contact_address" aria-invalid="false"/></td>
                                                </tr>
                                                <tr>
                                                    <td>QQ</td>
                                                    <td ng-className="{'has-error': personalInfoForm.im.$error.pattern}">
                                                        <input type="tel" placeholder="请输入QQ号"
                                                               className="form-control ng-pristine ng-untouched ng-valid ng-empty ng-valid-pattern ng-valid-maxlength"
                                                               ng-model="personalInfo.im" maxlength="11"
                                                               ng-model-options="{ updateOn: 'default blur', debounce: { 'default': 500, 'blur': 0 } }"
                                                               name="im" ng-pattern="/^\d*$/" aria-invalid="false"/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>个人网址</td>
                                                    <td ng-className="{'has-error': personalInfoForm.website.$error.pattern}">
                                                        <input type="text" placeholder="请输入个人网址"
                                                               className="form-control ng-pristine ng-untouched ng-valid ng-valid-pattern ng-valid-maxlength ng-not-empty"
                                                               maxlength="60" ng-model="personalInfo.website"
                                                               ng-model-options="{ updateOn: 'default blur', debounce: { 'default': 500, 'blur': 0 } }"
                                                               name="website"
                                                               ng-pattern="/^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))|(localhost)(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&amp;a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i"
                                                               aria-invalid="false"/>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            <div className="btn-wrap">
                                                <button className="btn btn-primary btn-emphasis" type="submit"
                                                        ng-disabled="personalInfoForm.$invalid || infoSubmitting || !infoModified"
                                                        disabled="disabled">保存
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane flipInX" id="bottom-tab2">
                            <div className="row" style={{marginLeft: "0", marginRight: "10px", padding: "20px"}}>
                                <div className="gaea-user ak-intro ng-scope">
                                    <div className="page-tip"><p className="text-muted">一个账号最多拥有两对密钥(Access/Secret
                                        Key)；更换密钥时，请创建第二个密钥；删除密钥前须停用；出于安全考虑，建议您周期性地更换密钥。您可以查看更多 <a title="安全使用密钥建议"

                                                                                                   href="#">安全使用密钥建议</a>。
                                    </p></div>
                                    <form className="form-horizontal ng-pristine ng-valid">
                                        <table className="table table-loading">
                                            <thead>
                                            <tr>
                                                <th>创建时间</th>
                                                <th>AccessKey/SecretKey</th>
                                                <th>状态</th>
                                                <th>操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr ng-repeat="key in keys" className="ng-scope">
                                                <td colSpan="12">
                                                    <NoData text="不存在任何秘钥信息"/>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div className="table-footer">
                                            <button className="btn btn-primary btn-emphasis pull-right ng-scope"
                                                    ng-if="keys.length == 1" ng-click="new()">创建密钥
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                        <div className="tab-pane flipInX" id="bottom-tab3">
                            <div className="row" style={{marginLeft: "0", marginRight: "10px", padding: "20px"}}>
                                <div className="gaea-user user-security ng-scope">
                                    <table className="table table-loading">
                                        <tbody>
                                        <tr oem-disabled="" style={{display: "table-row"}}>
                                            <td>更改邮箱</td>
                                            <td className="ng-binding">您当前的邮箱是 inspur_test@inspur.com</td>
                                            <td>
                                                <button className="btn btn-primary" id="change-email"
                                                        ng-click="changeEmailComfirm()">更改
                                                </button>
                                            </td>
                                        </tr>
                                        <tr oem-disabled="" style={{display: "table-row"}}>
                                            <td>换绑手机</td>
                                            <td className="ng-binding">您当前的手机号码是
                                                无 <a
                                                    className="mobile-info ng-scope" href="#"
                                                    ng-if="userInfo.mobile_info.left > 0"
                                                    uib-tooltip="此手机号已绑定 1 个账户，还可绑定 4 个账户。">绑定信息</a>
                                            </td>
                                            <td>
                                                <button className="btn btn-primary" id="change-phone"
                                                        ng-click="changeMobileComfirm()">更改
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>更改密码</td>
                                            <td className="ng-binding">上次更改密码时间 暂无 ，建议您90天更改一次密码</td>
                                            <td>
                                                <button className="btn btn-primary" id="change-password"
                                                        ng-click="changePasswordComfirm()">更改
                                                </button>
                                            </td>
                                        </tr>
                                        <tr oem-disabled="" style={{display: "table-row"}}>
                                            <td>两步验证</td>
                                            <td>状态： <span ng-show="userInfo.totp_status == totpStatus.enable"
                                                          aria-hidden="true" className="ng-hide">打开</span><span
                                                ng-show="userInfo.totp_status == totpStatus.disable" aria-hidden="false"
                                                className="">关闭</span></td>
                                            <td>
                                                <button className="btn btn-ghost btn-primary" ng-click="modifyTotp()">更改
                                                </button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane flipInX" id="bottom-tab4">
                            <div className="row" style={{marginLeft: "0", marginRight: "10px", padding: "20px"}}>
                                <div id="subscribe" class="gaea-user subscribe ng-scope">
                                    <div className="page-tip"><p className="text-muted">
                                        为了保障您在第一时间接收到有关财务、账号安全和系统公告等关键信息，本设置页面部分选项 (打钩图标)
                                        默认激活且无法更改。其余可配置选项请依据您的具体需求激活或禁用。</p></div>
                                    <div className="subscribe-content">

                                        <div className="fixed-content ng-scope" ng-hide="isLoading"
                                             ng-repeat="(type, channelGroup) in channelGroups"
                                             aria-hidden="false">
                                            <ul className="row ng-scope" ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="false">
                                                <li className="col-sm-6 ng-binding"
                                                    ng-show="channel.channel_id != specialChannelId"
                                                    aria-hidden="false">事件项
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="false"></span>站内信
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="false"></span>邮件
                                                </li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true"></span> 短信
                                                </li>
                                            </ul>
                                            <ul className="row ng-scope" ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="false">
                                                <li className="col-sm-6 ng-binding"
                                                    ng-show="channel.channel_id != specialChannelId"
                                                    aria-hidden="false">充值到账通知
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.internal_message_is_set"
                                                                                       ng-show="channel.internal_message_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.mail_is_set"
                                                                                       ng-show="channel.mail_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.sms_is_set"
                                                                                      ng-show="channel.sms_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                            </ul>

                                            <ul className="row ng-scope" ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="false">

                                                <li className="col-sm-6 ng-binding"
                                                    ng-show="channel.channel_id != specialChannelId"
                                                    aria-hidden="false">月账单通知
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.internal_message_is_set"
                                                                                       ng-show="channel.internal_message_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.mail_is_set"
                                                                                      ng-show="channel.mail_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-not-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.sms_is_set"
                                                                                      ng-show="channel.sms_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                            </ul>

                                            <ul className="row ng-scope ng-hide"
                                                ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="true">
                                                <li className="col-sm-6 ng-binding ng-hide"
                                                    ng-show="channel.channel_id != specialChannelId" aria-hidden="true">
                                                    当月消费n元提醒
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.internal_message_is_set"
                                                                                      ng-show="channel.internal_message_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.mail_is_set"
                                                                                      ng-show="channel.mail_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.sms_is_set"
                                                                                      ng-show="channel.sms_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                            </ul>

                                            <ul className="row ng-scope" ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="false">
                                                <li className="col-sm-6 ng-binding"
                                                    ng-show="channel.channel_id != specialChannelId"
                                                    aria-hidden="false">余额不足
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.internal_message_is_set"
                                                                                       ng-show="channel.internal_message_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.mail_is_set"
                                                                                       ng-show="channel.mail_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.sms_is_set"
                                                                                      ng-show="channel.sms_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-not-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                            </ul>

                                            <ul className="row ng-scope ng-hide"
                                                ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="true">
                                                <li className="col-sm-6 ng-binding"
                                                    ng-show="channel.channel_id != specialChannelId"
                                                    aria-hidden="false">欠费提醒
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.internal_message_is_set"
                                                                                       ng-show="channel.internal_message_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.mail_is_set"
                                                                                       ng-show="channel.mail_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.sms_is_set"
                                                                                      ng-show="channel.sms_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                            </ul>

                                            <ul className="row ng-scope" ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="false">
                                                <li className="col-sm-6 ng-binding"
                                                    ng-show="channel.channel_id != specialChannelId"
                                                    aria-hidden="false">抵用券激活通知
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.internal_message_is_set"
                                                                                      ng-show="channel.internal_message_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-not-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.mail_is_set"
                                                                                      ng-show="channel.mail_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-not-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.sms_is_set"
                                                                                      ng-show="channel.sms_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                            </ul>

                                            <ul className="row ng-scope ng-hide"
                                                ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="true">
                                                <li className="col-sm-6 ng-binding"
                                                    ng-show="channel.channel_id != specialChannelId"
                                                    aria-hidden="false">抵用券到期提醒
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.internal_message_is_set"
                                                                                      ng-show="channel.internal_message_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-not-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.mail_is_set"
                                                                                      ng-show="channel.mail_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-not-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.sms_is_set"
                                                                                      ng-show="channel.sms_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                            </ul>
                                        </div>

                                        <div className="fixed-content ng-scope" ng-hide="isLoading"
                                             ng-repeat="(type, channelGroup) in channelGroups"
                                             aria-hidden="false">
                                            <ul className="row ng-scope" ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="false">
                                                <li className="col-sm-6 ng-binding"
                                                    ng-show="channel.channel_id != specialChannelId"
                                                    aria-hidden="false">账号登录通知
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="false" className="">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.internal_message_is_set"
                                                                                      ng-show="channel.internal_message_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty ng-hide"
                                                                                      aria-hidden="true"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.mail_is_set"
                                                                                      ng-show="channel.mail_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.sms_is_set"
                                                                                      ng-show="channel.sms_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                            </ul>

                                            <ul className="row ng-scope" ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="false">
                                                <li className="col-sm-6 ng-binding"
                                                    ng-show="channel.channel_id != specialChannelId"
                                                    aria-hidden="false">登录密码修改
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.internal_message_is_set"
                                                                                      ng-show="channel.internal_message_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.mail_is_set"
                                                                                       ng-show="channel.mail_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.sms_is_set"
                                                                                      ng-show="channel.sms_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                            </ul>

                                            <ul className="row ng-scope" ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="false">
                                                <li className="col-sm-6 ng-binding"
                                                    ng-show="channel.channel_id != specialChannelId"
                                                    aria-hidden="false">登录邮箱修改
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.internal_message_is_set"
                                                                                      ng-show="channel.internal_message_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.mail_is_set"
                                                                                       ng-show="channel.mail_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.sms_is_set"
                                                                                      ng-show="channel.sms_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                            </ul>

                                            <ul className="row ng-scope" ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="false">
                                                <li className="col-sm-6 ng-binding"
                                                    ng-show="channel.channel_id != specialChannelId"
                                                    aria-hidden="false">绑定手机号变更
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.internal_message_is_set"
                                                                                      ng-show="channel.internal_message_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.mail_is_set"
                                                                                       ng-show="channel.mail_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.sms_is_set"
                                                                                      ng-show="channel.sms_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                            </ul>

                                            <ul className="row ng-scope" ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="false">
                                                <li className="col-sm-6 ng-binding"
                                                    ng-show="channel.channel_id != specialChannelId"
                                                    aria-hidden="false">绑定/解绑第三方账号
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.internal_message_is_set"
                                                                                      ng-show="channel.internal_message_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.mail_is_set"
                                                                                       ng-show="channel.mail_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.sms_is_set"
                                                                                      ng-show="channel.sms_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                            </ul>

                                            <ul className="row ng-scope" ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="false">
                                                <li className="col-sm-6 ng-binding"
                                                    ng-show="channel.channel_id != specialChannelId"
                                                    aria-hidden="false">账户冻结状态提醒
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.internal_message_is_set"
                                                                                       ng-show="channel.internal_message_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.mail_is_set"
                                                                                       ng-show="channel.mail_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.sms_is_set"
                                                                                       ng-show="channel.sms_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                            </ul>

                                            <ul className="row ng-scope" ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="false">
                                                <li className="col-sm-6 ng-binding"
                                                    ng-show="channel.channel_id != specialChannelId"
                                                    aria-hidden="false">成功邀请好友获得奖励
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.internal_message_is_set"
                                                                                      ng-show="channel.internal_message_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-not-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.mail_is_set"
                                                                                      ng-show="channel.mail_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-not-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.sms_is_set"
                                                                                      ng-show="channel.sms_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                            </ul>

                                            <ul className="row ng-scope" ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="false">
                                                <li className="col-sm-6 ng-binding"
                                                    ng-show="channel.channel_id != specialChannelId"
                                                    aria-hidden="false">身份认证审核通知
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.internal_message_is_set"
                                                                                      ng-show="channel.internal_message_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.mail_is_set"
                                                                                       ng-show="channel.mail_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.sms_is_set"
                                                                                      ng-show="channel.sms_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                            </ul>
                                        </div>
                                        <div className="fixed-content ng-scope" ng-hide="isLoading"
                                             ng-repeat="(type, channelGroup) in channelGroups"
                                             aria-hidden="false">
                                            <ul className="row ng-scope ng-hide"
                                                ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="true">
                                                <li className="col-sm-6 ng-binding"
                                                    ng-show="channel.channel_id != specialChannelId"
                                                    aria-hidden="false">浪潮服务状态通知
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.internal_message_is_set"
                                                                                       ng-show="channel.internal_message_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.mail_is_set"
                                                                                       ng-show="channel.mail_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.sms_is_set"
                                                                                       ng-show="channel.sms_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                            </ul>

                                            <ul className="row ng-scope ng-hide"
                                                ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="true">
                                                <li className="col-sm-6 ng-binding"
                                                    ng-show="channel.channel_id != specialChannelId"
                                                    aria-hidden="false">浪潮市场活动、优惠信息
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.internal_message_is_set"
                                                                                      ng-show="channel.internal_message_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-not-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.mail_is_set"
                                                                                      ng-show="channel.mail_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-not-empty"
                                                                                      aria-hidden="false"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="false" className="">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.sms_is_set"
                                                                                      ng-show="channel.sms_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty ng-hide"
                                                                                      aria-hidden="true"
                                                                                      aria-invalid="false"/></li>
                                            </ul>
                                        </div>
                                        <div className="fixed-content ng-scope" ng-hide="isLoading"
                                             ng-repeat="(type, channelGroup) in channelGroups"
                                             aria-hidden="false">
                                            <ul className="row ng-scope ng-hide"
                                                ng-hide="isHiddenChannel(channel.channel_id)"
                                                ng-repeat="channel in channelGroup | orderBy:'channel_id'"
                                                aria-hidden="true">

                                                <li className="col-sm-6 ng-binding"
                                                    ng-show="channel.channel_id != specialChannelId"
                                                    aria-hidden="false">邮件通知
                                                </li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="false" className="">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.internal_message_is_set &amp;&amp; !channel.internal_message_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.internal_message_is_set"
                                                                                      ng-show="channel.internal_message_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty ng-hide"
                                                                                      aria-hidden="true"
                                                                                      aria-invalid="false"/></li>
                                                <li className="col-sm-2"><span
                                                    ng-show="!channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="true" className="ng-hide">-</span> <span
                                                    className="qi qi-check"
                                                    ng-show="channel.mail_is_set &amp;&amp; !channel.mail_can_change"
                                                    aria-hidden="false"></span> <input type="checkbox"
                                                                                       ng-model="channel.mail_is_set"
                                                                                       ng-show="channel.mail_can_change"
                                                                                       className="ng-pristine ng-untouched ng-valid ng-not-empty ng-hide"
                                                                                       aria-hidden="true"
                                                                                       aria-invalid="false"/></li>
                                                <li className="col-sm-1"><span
                                                    ng-show="!channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="false" className="">-</span> <span
                                                    className="qi qi-check ng-hide"
                                                    ng-show="channel.sms_is_set &amp;&amp; !channel.sms_can_change"
                                                    aria-hidden="true"></span> <input type="checkbox"
                                                                                      ng-model="channel.sms_is_set"
                                                                                      ng-show="channel.sms_can_change"
                                                                                      className="ng-pristine ng-untouched ng-valid ng-empty ng-hide"
                                                                                      aria-hidden="true"
                                                                                      aria-invalid="false"/></li>
                                            </ul>
                                        </div>

                                    </div>
                                    <div className="clearfix">
                                        <div className="pull-right user-btn-group">
                                            <button className="btn btn-mute btn-default" ng-disabled="isUpdating"
                                                    ng-click="reset()">恢复默认
                                            </button>
                                            <button className="btn btn-primary btn-emphasis"
                                                    ng-disabled="invailedMoneyExtra || isUpdating" ng-click="submit()">
                                                保存设置
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane flipInX" id="bottom-tab5">
                            <div className="row" style={{marginLeft: "0", marginRight: "10px", padding: "20px"}}>
                                <div className="gaea-user user-oplog ng-scope">
                                    <div className="page-tip"><p className="text-muted">
                                        操作日志记录了您在本账号中进行的所有操作。防止异常操作的出现，便于您的核查。</p></div>
                                    <table className="table table-loading">
                                        <thead>
                                        <tr>
                                            <th>登录IP</th>
                                            <th>操作</th>
                                            <th>时间</th>
                                        </tr>
                                        </thead>
                                        <tbody ng-show="loadingStatus.isSuccess()" aria-hidden="false" className=""
                                               >
                                        <tr ng-repeat="oplog in oplogs" ng-if="oplogs.length != 0" className="ng-scope">
                                            <td colSpan="10"><NoData text="不存在任何操作日志"/></td>
                                        </tr>


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane flipInX" id="bottom-tab6">
                            <div className="row" style={{marginLeft: "0", marginRight: "10px"}}>
                                <div className="col-md-10" style={{paddingLeft: "5px"}}>
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <legend style={{
                                            fontSize: "16px",
                                            color: "#5E6166",
                                            marginBottom: 0,
                                            paddingTop: "10px",
                                            border: "0px solid red"
                                        }}>
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
                                            <button className="btn btn-default" style={{left: "20px"}}
                                                    onClick={this._setBillInfo}>设置开票信息
                                            </button>
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
                                                    <td colSpan="10"><NoData text="不存在任何发票信息"/></td>
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
                                <div className="col-md-10" style={{paddingLeft: "5px"}}>
                                    <fieldset className="content-group" style={{padding: "10px"}}>
                                        <legend style={{
                                            fontSize: "16px",
                                            color: "#5E6166",
                                            marginBottom: 0,
                                            paddingTop: "10px",
                                            border: "0px solid red"
                                        }}>
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

export default connect(mapStateToProps)(PersonnalContainer)
