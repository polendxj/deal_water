/**
 * Created by Administrator on 2016/8/19.
 */
import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router'
import {roleApplicationUse} from '../../components/Tool/Tool'

class MainMenu extends Component {
    constructor() {
        super()
    }

    componentDidUpdate() {
        $(".left").on("click",function () {
            $(".left").removeClass("active");
            $(this).addClass("active");
            if($(this).find("ul").length<=0){
                $(".hidden-ul").css("display","none")

            }
        })

        $(".hidden-ul li").on("click",function () {
            $(".hidden-ul li a").css("borderTop","0 lightgray solid");
            $(".hidden-ul li a").css("borderBottom","0 lightgray solid");
            $(".hidden-ul li").find("div").hide();
            $(this).find("div").show();
            $(this).find("a").css("borderTop","thin lightgray solid");
            $(this).find("a").css("borderBottom","thin lightgray solid");

        })
    }
    componentDidMount(){
        $(".hidden-ul li").on("click",function () {
            $(".hidden-ul li a").css("borderTop","0 lightgray solid");
            $(".hidden-ul li a").css("borderBottom","0 lightgray solid");
            $(".hidden-ul li").find("div").hide();
            $(this).find("div").show();
            $(this).find("a").css("borderTop","thin lightgray solid");
            $(this).find("a").css("borderBottom","thin lightgray solid");
        })
    }

    render() {
        var mainMenu;
        switch (this.props.selected) {
            case 0:
                mainMenu = <PerformanceMonitoringMenu _changeLeftMenu={this.props._changeLeftMenu}/>
                break;
            case 1:
                mainMenu = <PerformanceMonitoringMenu _changeLeftMenu={this.props._changeLeftMenu}/>

                break;
            case 2:
                mainMenu = <PerformanceMonitoringMenu _changeLeftMenu={this.props._changeLeftMenu}/>

                break;
            case 3:
                mainMenu = <PerformanceMonitoringMenu _changeLeftMenu={this.props._changeLeftMenu}/>

                break;
            case 4:
                mainMenu = <PerformanceMonitoringMenu _changeLeftMenu={this.props._changeLeftMenu}/>

                break;
        }
        return (
            <div className="sidebar sidebar-main" style={{backgroundColor:"#F5F7FA",position:"relative",top:"-80px;"}}>
                <div className="sidebar-content">
                    <div className="sidebar-category sidebar-category-visible">
                        <div className="category-content no-padding">
                            {mainMenu}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class SystemConfiguration extends Component {
    _leftMenuClick(path) {
        browserHistory.push(path)
    }

    componentDidMount() {
        $('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
            e.preventDefault();

            // Collapsible
            $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(250);

            // Accordion
            if ($('.navigation-main').hasClass('navigation-accordion')) {
                $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(250);
            }
        });
    }

    render() {
        return (
            <ul className="navigation navigation-main navigation-accordion">
                <li className="navigation-header left"><span>{Current_Lang.menus.systemConfiguration}</span> <i className="icon-menu" title=""
                                                                       data-original-title="系统配置"></i>
                </li>
                <li className="active  left">
                    <a href="javascript:void(0)" className="has-ul"><i className="icon-server"></i>
                        <span>{Current_Lang.menus.serverSetting}</span></a>
                    <ul className="hidden-ul" style={{display: 'block'}}>
                        {/*<li onClick={this._leftMenuClick.bind(this, '/SysManager/Service/GW')}><a
                         href="javascript:void(0)"><span>Gateway 网关</span></a></li>*/}
                        <li
                            onClick={this._leftMenuClick.bind(this, '/SysManager/Service/CSE')}><a
                            href="javascript:void(0)">{Current_Lang.menus.cseServer}</a></li>
                        <li
                            onClick={this._leftMenuClick.bind(this, '/SysManager/Service/CSR/:c')}><a
                            href="javascript:void(0)">{Current_Lang.menus.csrServer}</a>
                        </li>
                        <li style={{display: 'none'}}
                            onClick={this._leftMenuClick.bind(this, '/SysManager/Service/CSETest')}><a
                            href="javascript:void(0)">CSE 引擎(测试版)</a></li>
                        {/*<li style={{display: roleApplicationUse('sedList') ? 'block' : 'none'}}
                         onClick={this._leftMenuClick.bind(this, '/SysManager/Service/SED')}><a
                         href="javascript:void(0)">SED 监控</a>
                         </li>*/}
                        <li
                            onClick={this._leftMenuClick.bind(this, '/Developing')}><a
                            href="javascript:void(0)">{Current_Lang.menus.sedServer}</a>
                        </li>

                    </ul>
                </li>
                <li className="left">
                    <a href="javascript:void(0)" className="has-ul"><i className="icon-database-menu"></i>
                        <span>{Current_Lang.menus.clusterSetting}</span></a>
                    <ul className="hidden-ul" style={{display: 'none'}}>
                        <li  onClick={this._leftMenuClick.bind(this, '/SystemManager/ClusterSetting/CSEGroup')}><a
                            href="javascript:void(0)">{Current_Lang.menus.cseGroup}</a></li>
                        <li  onClick={this._leftMenuClick.bind(this, '/Developing')}><a href="javascript:void(0)">
                            {Current_Lang.menus.csrGroup}
                        </a></li>
                        <li  onClick={this._leftMenuClick.bind(this, '/Developing')}><a href="javascript:void(0)">
                            {Current_Lang.menus.sedGroup}
                        </a></li>
                    </ul>
                </li>
                <li className="left">
                    <a href="javascript:void(0)" className="has-ul"><i className="icon-dribbble3"></i>
                        <span>{Current_Lang.menus.playformSetting}</span></a>
                    <ul className="hidden-ul" style={{display: 'none'}}>
                        <li
                            onClick={this._leftMenuClick.bind(this, '/SystemManager/Platform/DeviceType')}><a
                            href="javascript:void(0)">{Current_Lang.menus.terminalType}</a>
                        </li>
                        {/*<li
                            onClick={this._leftMenuClick.bind(this, '/SysManager/Service/Subapp')}><a
                            href="javascript:void(0)">{Current_Lang.menus.application}</a>
                        </li>*/}
                        <li
                            onClick={this._leftMenuClick.bind(this, '/SysManager/Platform/AppManagement')}><a
                            href="javascript:void(0)">{Current_Lang.menus.application}</a>
                        </li>
                        <li style={{display:'none'}}
                            onClick={this._leftMenuClick.bind(this, '/SysManager/Service/SO')}><a
                            href="javascript:void(0)">{Current_Lang.menus.application}</a>
                        </li>
                        <li
                            onClick={this._leftMenuClick.bind(this, '/SysManager/Platform/StreamingTemplate')}><a
                            href="javascript:void(0)">{Current_Lang.menus.streamProfile}</a>
                        </li>
                        <li  onClick={this._leftMenuClick.bind(this, '/SysManager/Platform/ServiceGroup')}><a
                            href="javascript:void(0)">{Current_Lang.menus.areaSetting}</a>
                        </li>
                        <li  onClick={this._leftMenuClick.bind(this, '/SysManager/Service/Dedicated/:c')}><a
                            href="javascript:void(0)">{Current_Lang.menus.routerStrategy}</a>
                        </li>
                        <li  onClick={this._leftMenuClick.bind(this, '/SysManager/Platform/STBMapping')}><a
                            href="javascript:void(0)">{Current_Lang.menus.terminalPosition}</a>
                        </li>
                        <li  onClick={this._leftMenuClick.bind(this, '/Developing')}><a
                            href="javascript:void(0)">{Current_Lang.menus.versionControl}</a>
                        </li>
                    </ul>
                </li>


            </ul>
        )
    }
}

class PerformanceMonitoringMenu extends Component {
    _leftMenuClick(path) {
        browserHistory.push(path)
    }

    componentDidMount() {
        $('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
            e.preventDefault();

            // Collapsible
            $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(250);

            // Accordion
            if ($('.navigation-main').hasClass('navigation-accordion')) {
                $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(250);
            }
        });
    }

    render() {
        return (
            <ul className="navigation navigation-main navigation-accordion">

                <li className="navigation-header" style={{height:"100px"}}>
                    <a className="navbar-brand" href="index.html"><img src="/assets/images/logo_light.png"
                                                                       style={{
                                                                           width: "60px",
                                                                           height: "60px",
                                                                           marginLeft: '27px'
                                                                       }} alt=""/>

                    </a>
                </li>
                <li className="left active" onClick={this._leftMenuClick.bind(this, '/sourceMain')}><a
                    href="javascript:void(0)" style={{fontSize:"14px"}}><i
                    className="icon-grid6"></i> <span style={{fontSize:"14px ! important"}}>{"资源主页"}</span></a></li>
               {/* <li className="left" onClick={this._leftMenuClick.bind(this, '/personal')}><a
                    href="javascript:void(0)" style={{fontSize:"14px"}}><i
                    className="icon-vcard"></i> <span>{"个人中心"}</span></a></li>*/}
                <li className="left" onClick={this._leftMenuClick.bind(this, '/financialStatistic')}><a
                    href="javascript:void(0)" style={{fontSize:"14px"}}><i
                    className=" icon-chart"></i> <span>{"统计分析"}</span></a></li>
                <li className="left" onClick={this._leftMenuClick.bind(this, '/')}>
                    <hr style={{width:"90%"}} />
                </li>
                <li className="left" onClick={this._leftMenuClick.bind(this, '/source')}>
                    <a href="javascript:void(0)" style={{fontSize:"14px"}}><i className="icon-shield-check"></i>
                        <span>{"巡检情况"}</span></a>
                </li>
                <li className="left" onClick={this._leftMenuClick.bind(this, '/source2')}>
                    <a href="javascript:void(0)" style={{fontSize:"14px"}}><i className="icon-pulse2"></i>
                        <span>{"治理情况"}</span></a>
                </li>
                <li className="left"  onClick={this._leftMenuClick.bind(this, '/fusion')}>
                    <a href="javascript:void(0)" style={{fontSize:"14px"}}><i className=" icon-share4"></i>
                        <span>{"河道管理"}</span></a>
                </li>
                <li className="left" onClick={this._leftMenuClick.bind(this, '/')}>
                    <hr style={{width:"90%"}} />
                </li>
                <li className="left">
                    <a href="javascript:void(0)" style={{fontSize:"14px"}}><i className=" icon-users"></i>
                        <span>{"用户中心"}</span></a>
                </li>

            </ul>

        )
    }
}

class Elastic extends Component {
    _leftMenuClick(path) {
        browserHistory.push(path)
    }

    componentDidMount() {
        $('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
            e.preventDefault();

            // Collapsible
            $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(250);

            // Accordion
            if ($('.navigation-main').hasClass('navigation-accordion')) {
                $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(250);
            }
        });
    }

    render() {
        return (
            <ul className="navigation navigation-main navigation-accordion">

                <li className="navigation-header" onClick={this._leftMenuClick.bind(this, '/Developing')}>
                    <span>{Current_Lang.label.statics}</span> <i className="icon-menu" title=""
                                       data-original-title="统计"></i>
                </li>
                <li onClick={this._leftMenuClick.bind(this, '/Developing')}><a
                    href="javascript:void(0)"><i
                    className="icon-air"></i> <span>{Current_Lang.menus.simpleStatics}</span></a></li>
                <li onClick={this._leftMenuClick.bind(this, '/Developing')}><a
                    href="javascript:void(0)"><i
                    className="icon-statistics"></i> <span>{Current_Lang.menus.complexStatics}</span></a></li>


            </ul>
        )
    }
}

class UserCenter extends Component {
    _leftMenuClick(path) {
        browserHistory.push(path)
    }

    render() {
        return (
            <ul className="navigation navigation-main navigation-accordion">

                <li className="navigation-header"><span>{Current_Lang.label.management}</span> <i className="icon-menu" title=""
                                                                     data-original-title="管理"></i>
                </li>
                <li
                    onClick={this._leftMenuClick.bind(this, '/UserManager/Admin')}><a
                    href="javascript:void(0)"><i
                    className="icon-user"></i> <span>{Current_Lang.menus.userManagement}</span></a></li>
                <li style={{display:'none'}}
                    onClick={this._leftMenuClick.bind(this, '/UserManager/Permission')}><a
                    href="javascript:void(0)"><i
                    className="icon-vcard"></i> <span>权限管理</span></a></li>
                <li className="navigation-header"><span>{Current_Lang.label.operation}</span> <i className="icon-menu" title=""
                                                                     data-original-title="操作"></i>
                </li>
                <li
                    onClick={this._leftMenuClick.bind(this, '/UserManager/Operation/JobHistoryList')}><a
                    href="javascript:void(0)"><i
                    className="icon-history"></i> <span>{Current_Lang.menus.operationHistory}</span></a></li>


            </ul>
        )
    }
}

class AlarmManage extends Component {
    _leftMenuClick(path) {
        browserHistory.push(path)
    }

    componentDidMount() {
        $('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
            e.preventDefault();

            // Collapsible
            $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(250);

            // Accordion
            if ($('.navigation-main').hasClass('navigation-accordion')) {
                $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(250);
            }
        });
    }

    render() {
        return (
            <ul className="navigation navigation-main navigation-accordion">

                <li className="navigation-header"><span>{Current_Lang.menus.alarmManagement}</span> <i className="icon-menu" title=""
                                                                       data-original-title="告警"></i>
                </li>
                <li>
                    <a href="javascript:void(0)"><i className="icon-warning"></i> <span>{Current_Lang.menus.alarmManagement}</span></a></li>
                <li onClick={this._leftMenuClick.bind(this, '/systemConfig/originalSystem/dataCenterOfContentDistribute')}>
                    <a href="javascript:void(0)"><i className="icon-warning"></i> <span>{Current_Lang.menus.alarmHistory}</span></a></li>
                <li onClick={this._leftMenuClick.bind(this, '/Monitor/Alarm/Threshold')}>
                    <a href="javascript:void(0)"><i className="icon-spam"></i> <span>{Current_Lang.menus.alarmHistory}</span></a></li>

            </ul>
        )
    }
}

export default MainMenu