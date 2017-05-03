/**
 * Created by Administrator on 2016/8/18.
 */
import React, {Component, PropTypes} from 'react';
import {roleApplicationUse} from '../../components/Tool/Tool'
import {browserHistory} from 'react-router'

export default class Header extends Component {
    render() {
        return (
            <div className="navbar navbar-inverse" style={{
                backgroundColor: "white",
                marginTop: "-1px",
                height: "65px",
                borderBottom: "thin lightgray solid"
            }}>
                <Logo />

                <div className="navbar-collapse collapse" id="navbar-mobile" style={{marginTop: "10px"}}>

                    <TopMenus changeTopMenu={this.props.changeTopMenu}/>
                    <RightPanel _changeLang={this.props._changeLang} _logOut={this.props._logOut}/>
                </div>
            </div>
        )
    }
}

class Logo extends Component {
    constructor() {
        super();
        this.logo_style = {color: 'white', fontSize: '14px', position: 'relative', top: '9px'}
    }

    render() {
        return (
            <div className="navbar-header" style={{backgroundColor: "#F5F7FA"}}>
                <span id="logoText" style={this.logo_style}></span>
                <a className="navbar-brand" href="index.html">

                </a>
                <ul className="nav navbar-nav visible-xs-block">
                    <li><a data-toggle="collapse" data-target="#navbar-mobile"><i className="icon-tree5"></i></a>
                    </li>
                    <li><a className="sidebar-mobile-main-toggle"><i className="icon-paragraph-justify3"></i></a>
                    </li>
                </ul>
            </div>
        )
    }
}

class TopMenus extends Component {
    constructor() {
        super();
        this.span_style = {paddingLeft: 0};
        this.selected = 0;
    }

    _moveTopMenuBottomLine(idx, flag) {
        var width = $(".topmenu").eq(idx).width();
        var top = $(".topmenu").eq(idx).offset().top + 41;
        var left = $(".topmenu").eq(idx).offset().left;
        if (flag) {
            $("#topMenuBottomLine").css({width: width, top: top, left: left}, 500);
        } else {
            $("#topMenuBottomLine").animate({width: width, top: top, left: left}, 500);
        }
        this.selected = idx;
    }

    _menuChange(idx, flag) {
        this._moveTopMenuBottomLine(idx, flag);
        this.props.changeTopMenu(idx);
    }

    componentDidMount() {
        this._moveTopMenuBottomLine(0, true);
    }

    render() {
        return (
            <ul className="nav navbar-nav">
                <li className="dropdown dropdown-user topmenu" onClick={this._menuChange.bind(this, 0, false)}>
                    <a className="dropdown-toggle" data-toggle="dropdown" style={{fontSize: "14px", color: "#8E85A5"}}>
                        <i className=" icon-grid52"></i> <span
                        style={this.span_style}>{"产品列表"}</span>
                    </a>
                </li>
            </ul>
        )
    }
}

class RightPanel extends Component {
    constructor(props) {
        super(props)
        this.toAlarmHistory = this.toAlarmHistory.bind(this);
        this.currentLang = window.navigator.language.indexOf("CN") >= 0 ? "CN" : "EN";
    }

    toAlarmHistory() {
        browserHistory.push("/Monitor/Alarm/AlarmHistory");
    }

    _changeLang(type) {
        this.currentLang = type;
        this.props._changeLang(type);
        setTimeout(function () {
            this._moveTopMenuBottomLine(sessionStorage["currentMenu"] ? parseInt(sessionStorage["currentMenu"]) : 0)

        }.bind(this), 100)

    }

    _moveTopMenuBottomLine(idx, flag) {
        if (!idx) idx = 0;
        var width = $(".topmenu").eq(idx).width();
        var top = $(".topmenu").eq(idx).offset().top + 41;
        var left = $(".topmenu").eq(idx).offset().left;
        if (flag) {
            $("#topMenuBottomLine").css({width: width, top: top, left: left}, 500);
        } else {
            $("#topMenuBottomLine").animate({width: width, top: top, left: left}, 500);
        }
        this.selected = idx;
    }

    componentDidMount() {
        this._moveTopMenuBottomLine(parseInt(sessionStorage["currentMenu"]))
    }

    render() {

        var lis = [];
        var label = "";
        return (
            <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" style={{fontSize: "14px",color:"#8E85A5"}}>
                        <i className="icon-stats-bars2" ></i> <span
                        style={this.span_style}>{"数据统计"}</span>
                    </a>
                </li>

                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" style={{fontSize: "14px",color:"#8E85A5"}}>
                        <i className=" icon-envelope" ></i> <span
                        style={this.span_style}>{"站内信"}</span>
                    </a>
                    <div className="dropdown-menu dropdown-content width-350">
                        <div className="dropdown-content-heading">
                            信件 (0封)
                        </div>

                        <div className="dropdown-content-footer">
                            <a href="#" data-popup="tooltip" title="" data-original-title="All messages"><i
                                className="icon-menu display-block"></i></a>
                        </div>
                    </div>
                </li>
                <li className="dropdown dropdown-user">
                    <a className="dropdown-toggle" data-toggle="dropdown" style={{fontSize: "14px",color:"#8E85A5"}}>
                        <span
                        style={this.span_style}>{"个人面板"}</span>
                        <img src="assets/images/userimg.png" alt="" style={{marginLeft:"10px"}}/>
                    </a>
                    <div className="dropdown-menu dropdown-content width-350">
                        <div className="dropdown-content-heading">
                            开发中
                        </div>

                        <div className="dropdown-content-footer">
                            <a href="#" data-popup="tooltip" title="" data-original-title="All messages"><i
                                className="icon-menu display-block"></i></a>
                        </div>
                    </div>
                </li>

            </ul>
        )
    }
}



