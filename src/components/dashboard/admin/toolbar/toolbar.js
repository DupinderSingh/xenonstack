import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearApiErrorMessage, logout, logoutAccount} from "../../../../actions/account/login-actions";
import DeleteDialogBox from "../../../app/dialogBox/delete-dialog-box";

class AdminToolbar extends Component {
    componentWillMount() {
        this.props.dispatch(clearApiErrorMessage())
    }

    openSignoutAccountDialog() {
        document.getElementsByClassName("overlay-delete")[0].style.display = "block";
    }

    closeSignoutAccountDialog() {
        console.log(document.getElementsByClassName("overlay-delete"), "overllll")
        if (!!document.getElementsByClassName("overlay-delete")[0]) {
            document.getElementsByClassName("overlay-delete")[0].style.display = "none";
        }
    }

    signout(e) {
        e.preventDefault();
        this.props.dispatch(logoutAccount());
        if (!!document.getElementsByClassName("overlay-delete")[0]) {
            document.getElementsByClassName("overlay-delete")[0].style.display = "none";
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.logoutMe === true) {
            nextProps.dispatch(logout());
        }
    }
    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top custom-header">
                <div className="mobile-only-brand pull-left">
                    <div className="nav-header pull-left">
                        <div className="logo-wrap">
                            <Link to="/dashboard"> <img className="brand-img"
                                                        src={require("../../../../static/images/logo.png")}
                                                        alt="brand"/> <span
                                className="brand-text">XenonStack</span></Link>
                        </div>
                    </div>
                    <a id="toggle_nav_btn" className="toggle-left-nav-btn inline-block ml-20 pull-left"
                       href="javascript:void(0);"><i className="zmdi zmdi-menu"></i></a>
                </div>
                <div id="mobile_only_nav" className="mobile-only-nav pull-right">
                    <ul className="nav navbar-right top-nav pull-right">
                        <li>
                            <a id="open_right_sidebar" href="#"><i className="zmdi zmdi-settings top-nav-icon"></i></a>
                        </li>
                        <li className="dropdown alert-drp">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i
                                className="zmdi zmdi-notifications top-nav-icon"></i><span
                                className="top-nav-icon-badge">5</span></a>
                            <ul className="dropdown-menu alert-dropdown">
                                <li>
                                    <div className="notification-box-head-wrap">
                                            <span
                                                className="notification-box-head pull-left inline-block">notifications</span>
                                        <a className="txt-danger pull-right clear-notifications inline-block"
                                           href="javascript:void(0)"> clear all </a>
                                        <div className="clearfix"></div>
                                        <hr className="light-grey-hr ma-0"/>
                                    </div>
                                </li>
                                <li>
                                    <div className="streamline message-nicescroll-bar">
                                        <div className="sl-item">
                                            <a href="javascript:void(0)">
                                                <div className="sl-content">
                                                        <span
                                                            className="inline-block capitalize-font  pull-left truncate head-notifications">New subscription created</span>
                                                    <span
                                                        className="inline-block font-11  pull-right notifications-time">2pm</span>
                                                    <div className="clearfix"></div>
                                                    <p className="truncate">Your customer subscribed for the basic plan.
                                                        The customer will pay $25 per month.</p>
                                                </div>
                                            </a>
                                        </div>
                                        <hr className="light-grey-hr ma-0"/>
                                        <div className="sl-item">
                                            <a href="javascript:void(0)">
                                                <div className="sl-content">
                                                        <span
                                                            className="inline-block capitalize-font  pull-left truncate head-notifications">New subscription created</span>
                                                    <span
                                                        className="inline-block font-11  pull-right notifications-time">2pm</span>
                                                    <div className="clearfix"></div>
                                                    <p className="truncate">Your customer subscribed for the basic plan.
                                                        The customer will pay $25 per month.</p>
                                                </div>
                                            </a>
                                        </div>
                                        <hr className="light-grey-hr ma-0"/>
                                        <div className="sl-item">
                                            <a href="javascript:void(0)">
                                                <div className="sl-content">
                                                        <span
                                                            className="inline-block capitalize-font  pull-left truncate head-notifications">New subscription created</span>
                                                    <span
                                                        className="inline-block font-11  pull-right notifications-time">2pm</span>
                                                    <div className="clearfix"></div>
                                                    <p className="truncate">Your customer subscribed for the basic plan.
                                                        The customer will pay $25 per month.</p>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="sl-item">
                                            <a href="javascript:void(0)">
                                                <div className="sl-content">
                                                        <span
                                                            className="inline-block capitalize-font  pull-left truncate head-notifications">New subscription created</span>
                                                    <span
                                                        className="inline-block font-11  pull-right notifications-time">2pm</span>
                                                    <div className="clearfix"></div>
                                                    <p className="truncate">Your customer subscribed for the basic plan.
                                                        The customer will pay $25 per month.</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="notification-box-bottom-wrap">
                                        <hr className="light-grey-hr ma-0"/>
                                        <a className="block text-center read-all" href="javascript:void(0)"> read
                                            all </a>
                                        <div className="clearfix"></div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown auth-drp">
                            <a href="#" className="dropdown-toggle pr-0" data-toggle="dropdown" style={{cursor: "default"}}>
                                <img src={require("../../../../static/images/candidate.jpg")} alt="user_auth"
                                     className="user-auth-img img-circle"/><span> Admin</span>
                            </a>
                        </li>
                        <li className="dropdown auth-drp">
                            <a href="#" onClick={this.openSignoutAccountDialog.bind(this)} className="dropdown-toggle pr-0" data-toggle="dropdown">
                                     <span> SignOut</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <DeleteDialogBox
                    formName="Signout-account"
                    submitForm={this.signout}
                    operation="Signout Account"
                    keyword="Signout"
                    closeForm={this.closeSignoutAccountDialog}
                    pageLoading={false}
                    selected=""
                    name=""
                />
            </nav>
        )
    }
}

function mapStateToProps(state) {
    const {logoutMe} = state.LoginReducer;
    return {logoutMe, state};
}

export default withRouter(connect(mapStateToProps)(AdminToolbar))