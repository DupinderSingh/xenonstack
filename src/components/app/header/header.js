/*eslint-disable*/
// import $ from 'jquery';
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearApiErrorMessage, logout, logoutAccount} from "../../../actions/account/login-actions";

class Head extends Component {
    toggleHeader(e) {
        const navMenu = document.querySelectorAll(".navigation-menu");
        for (let i = 0; i < navMenu.length; i++) {
            navMenu[i].classList.toggle("Navbar__ToggleShow");
        }
        // document.getElementById("navigation-bar").style.borderBottom = "2px solid #0562e8";
    }

    hideToggleHeader() {
        document.getElementsByClassName("navigation-menu nav-left")[0].classList.remove("Navbar__ToggleShow");
        document.getElementsByClassName("navigation-menu nav-right")[0].classList.remove("Navbar__ToggleShow");
    }
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
            <div>
                {/*<header  className={(this.props.location.pathname === "/drive/test/aptitude-test" || this.props.location.pathname === "/drive/test/instruction") ? "header header-fixed" : "header"}*/}
                {/*id="header">*/}
                <header className="header header-fixed" id="header">
                    <div
                        className={(this.props.location.pathname === "/drive/test/aptitude-test" || this.props.location.pathname === "/drive/test/instruction") ? "" : "main-container"}>
                        <nav className="navigation-bar" id="navigation-bar">
                            <div className="brand-wrapper">
                                <div className="brand-image">
                                    <Link to="/dashboard" id="brand-logo">
                                        <figure><img src={require("../../../static/images/xenon-stack-logo3.png")}
                                                     alt="XenonStack" style={{width: "100%", height: "100%"}}/>
                                        </figure>
                                    </Link>
                                </div>
                            </div>
                            <div className="toggle-topMenu" onClick={this.toggleHeader.bind(this)}>
                                <div className="one"></div>
                                <div className="two"></div>
                                <div className="three"></div>
                            </div>
                            {
                                <div className="navigation-menu nav-left">
                                    {
                                        (this.props.isAuthenticated && this.props.location.pathname !== "/drive/test/aptitude-test" && this.props.location.pathname !== "/drive/test/instruction") &&
                                        <ul className="navbar-menu" id="navigation-menu-left"
                                            onClick={this.hideToggleHeader.bind(this)}>
                                            <li className="drop-down-menu">
                                                <Link to="/dashboard" className="nav-links">Dashboard</Link>
                                            </li>
                                        </ul>
                                    }
                                    {
                                        (this.props.location.pathname !== "/drive/test/aptitude-test" && this.props.location.pathname !== "/drive/test/instruction") &&
                                        <ul className="navbar-menu" id="navigation-menu-left"
                                            onClick={this.hideToggleHeader.bind(this)}>
                                            <li className="drop-down-menu">
                                                <Link to="/jobs" className="nav-links">Jobs</Link>
                                            </li>
                                            <li className="drop-down-menu">
                                                <Link to="/hiring-process" className="nav-links">Hiring Process</Link>
                                            </li>
                                        </ul>
                                    }
                                </div>
                            }
                            {
                                <div className="navigation-menu nav-right" onClick={this.hideToggleHeader.bind(this)}>
                                    {
                                        (!this.props.state.RegisterReducer.goToRegistration && !this.props.state.LoginReducer.auth.isAuthenticated && this.props.location.pathname !== "/login") &&
                                        <ul className="navbar-menu" id="navigation-menu-right">
                                            <li className="drop-down-menu">
                                                <Link className="nav-links boxed-links" to="/login">Sign In</Link>
                                            </li>
                                        </ul>
                                    }
                                    {
                                        (this.props.isAuthenticated && this.props.location.pathname !== "/drive/test/aptitude-test" && this.props.location.pathname !== "/drive/test/instruction") &&
                                        <ul className="navbar-menu" id="navigation-menu-right">
                                            {/*<li className="drop-down-menu">*/}
                                            {/*    <a className="nav-links" href="https://www.xenonstack.com/contact-us/"*/}
                                            {/*       target="_blank"><i*/}
                                            {/*        className="material-icons">phone</i> Contact</a>*/}
                                            {/*</li>*/}
                                            <li className="drop-down-menu">
                                                <a className="nav-links" href="https://www.xenonstack.com/careers/"
                                                   target="_target"><i className="material-icons"
                                                                       style={{fontSize: "20px"}}>home</i> Careers home</a>
                                            </li>
                                            <li className="drop-down-menu">
                                                <Link to="/feedback" className="nav-links"><i
                                                    className="material-icons">feedback</i> Feedback</Link>
                                            </li>
                                            <li className="drop-down-menu profile-nav">
                                                <Link className="nav-links profile-pic" to="/profile">
                                                    <img src={require("../../../static/images/avatar.jpg")}
                                                         alt="profile picture"/>
                                                    {/*<span> {localStorage.getItem("name")}</span> */}
                                                </Link>
                                            </li>
                                            <li className="drop-down-menu logout-nav">
                                                <a className="nav-links" onClick={this.openSignoutAccountDialog.bind(this)}
                                                   target="_target"><i className="material-icons" style={{cursor: "pointer"}} >logout</i> Logout</a>
                                            </li>
                                        </ul>
                                    }
                                </div>
                            }
                        </nav>
                    </div>
                </header>
            </div>
        )
    }
}

// function classToggle() {
//     const navs = document.querySelectorAll('.navigation-menu')
//
//     navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
// }
// document.querySelector('.toggle-topMenu').addEventListener('click', classToggle);

function mapStateToProps(state) {
    const {auth} = state.LoginReducer;
    const {goToRegistration} = state.RegisterReducer;
    const {isAuthenticated} = auth;
    return {isAuthenticated, goToRegistration, state}
}

export default withRouter(connect(mapStateToProps)(Head))
