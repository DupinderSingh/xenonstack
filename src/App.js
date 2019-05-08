import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {store} from '../src/index';
import Login from "./container/account/login/Login";
import EmailVerification from './container/account/email_verification/email-verification';
import UserDashboard from "./container/dashboard/user/index";
import HiringProcess from "./container/dashboard/user/hiring_process/hiring-process";
import Activities from "./container/dashboard/user/activities/activities";
import TestInstruction from './container/dashboard/user/drive/test/test-instructions';
import AptitudeTest from './container/dashboard/user/drive/test/test';
import DriveDetails from "./container/dashboard/user/drive/drive-details";
import Profile from './container/dashboard/user/profile/index';
import UpdatePassword from './container/dashboard/user/profile/change-password';
import Feedback from './container/dashboard/user/feedback/send-feedback';
import Head from "./components/app/header/header";
import ForgotPassword from './container/account/forgot_password/forgot-password';
import ResetPassword from './container/account/reset_password/reset-password';
import Register from './container/account/register/manual/register';
import RegisterThroughLinkedIn from './container/account/register/linkedin/register-through-linkedin';
import Footer from "./components/app/footer/footer";
import Jobs from "./container/dashboard/user/jobs/jobs/jobs";
import JobDetails from "./container/dashboard/user/jobs/job-details/job-details";
import ApplyJob from './container/dashboard/user/jobs/apply/apply-job';
import CheckEmailSection from "./components/account/register/manual/section/check-email-section";
import ChatBox from './components/dashboard/index/chatBox/chat-box';
// import Drawer from './components/admin/admin/drawer/Index';
import Toolbar from "./components/dashboard/user/sections/toolbar-section";
import Menubar from "./components/dashboard/user/sections/menubar-section";
import AdminDashboard from './container/dashboard/admin/index/index';
import AdminFeedback from './container/dashboard/admin/user_feedback/user-feedback';
import AdminToolbar from './components/dashboard/admin/toolbar/toolbar';
import AdminSidebar from './components/dashboard/admin/sidebar/sidebar';
import AdminFooter from './components/dashboard/admin/footer/footer';
import ListPool from './container/dashboard/admin/pool/list/list';
import PoolDetails from './container/dashboard/admin/pool/details/Details';
import AddQuestionsToPool from './container/dashboard/admin/pool/questions/question/details/Details';
import PreviewSection from "./components/account/register/manual/section/preview/index";
import CreateTeam from "./container/dashboard/admin/team/create/team";
import ListTeam from './container/dashboard/admin/team/list/list';
import CreateJob from "./container/dashboard/admin/job/create/create";
import ListJob from "./container/dashboard/admin/job/list/list";
import {NotificationContainer} from 'react-notifications';
import Candidates from "./container/dashboard/admin/user/all-users";
import CandidateDetails from "./container/dashboard/admin/user/user-details";
import CreateDrive from './container/dashboard/admin/drive/create/create';
import ViewDrive from './container/dashboard/admin/drive/view/view';
import AssignDrive from "./container/dashboard/admin/drive/assign/assign";
import AdminDriveDetails from "./container/dashboard/admin/drive/details/Details";
import UserScoreList from './container/dashboard/admin/user/user-score-list';
import CreateTest from './container/dashboard/admin/test/create/create';
import ListTest from './container/dashboard/admin/test/list/list';
import College from './container/dashboard/admin/college/index';
import ViewUser from './container/dashboard/admin/drive/assign/assign-list';

import WekanBoard from './container/dashboard/admin/wekan/WekanBoard'
import {GET_API} from "./middleware/token/get-api";
import {REFRESH_TOKEN_FAILURE, REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS} from "./types/account/Login";

let rt = 15000, authenticated = null;

/**
 *
 * This function checks wheather the user is logged in or logged out.
 * isAuthenticated(true) - logged in
 * isAuthenticated(false) - logged out
 */
function checkAuth() {
    const {auth} = store.getState().LoginReducer;
    const {isAuthenticated} = auth;
    return isAuthenticated
}

/**
 *
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 * The purpose of this constant is to-
 * check wheather user is logged in or logged out,
 * if logged in - user can visit any routes (eg. /tenants, /users, /hosta)
 */
export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        return checkAuth() ?
            <Component {...props}/>
            : <Redirect to='/login'/>
    }
    }/>
);


/**
 *
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */

export const ProtectedRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        return checkAuth() ?
            <Redirect to='/dashboard'/>
            : <Component {...props}/>
    }}/>
);


function refreshToken() {
    console.log("refresh token api called");
    return {
        [GET_API]: {
            endpoint: 'https://career-admin.xenon.team/api/auth/v1/refresh_token',
            types: [REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE]
        }
    }
}


export function BodyWrapper(props) {
    return (
        <Switch>
            {
                props.props.sys_role === "admin" &&
                <div className="custom-content page-wrapper">
                    <div className="container-fluid">
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={AdminDashboard}/>
                            <PrivateRoute exact path="/dashboard/candidate/list" component={Candidates}/>
                            <PrivateRoute path="/dashboard/candidate/:email/details" component={CandidateDetails}/>
                            <PrivateRoute exact path="/dashboard/feedback/:type" component={AdminFeedback}/>
                            <PrivateRoute exact path="/dashboard/:drive/users/:email/score" component={UserScoreList}/>
                            <PrivateRoute exact path="/dashboard/pool/list" component={ListPool}/>
                            <PrivateRoute exact path="/dashboard/pool/:pool_id/details" component={PoolDetails}/>
                            <PrivateRoute exact path="/dashboard/pool/:pool_id/add/questions"
                                          component={AddQuestionsToPool}/> // // csv required also
                            <PrivateRoute exact path="/dashboard/pool/:pool_id/details/questions/:question/edit"
                                          component={AddQuestionsToPool}/>
                            <PrivateRoute exact path="/dashboard/pool/:pool_id/details/add-question"
                                          component={AddQuestionsToPool}/>
                            <PrivateRoute exact path="/dashboard/drive/create" component={CreateDrive}/>
                            <PrivateRoute exact path="/dashboard/drive/view" component={ViewDrive}/>
                            <PrivateRoute exact path="/dashboard/drive/:drive/edit" component={CreateDrive}/>
                            <PrivateRoute exact path="/dashboard/drive/details" component={AdminDriveDetails}/>
                            <PrivateRoute exact path="/dashboard/drive/:drive/assign" component={AssignDrive}/> // csv required also
                            <PrivateRoute exact path="/dashboard/drive/:drive/assign/list" component={ViewUser}/>
                            <PrivateRoute path="/dashboard/team/create" component={CreateTeam}/>
                            <PrivateRoute path="/dashboard/team/list" component={ListTeam}/>
                            <PrivateRoute path="/dashboard/team/:team/edit" component={CreateTeam}/>
                            <PrivateRoute path="/dashboard/job/create" component={CreateJob}/>
                            <PrivateRoute path="/dashboard/job/list" component={ListJob}/>
                            <PrivateRoute path="/dashboard/job/:team/:job/edit" component={CreateJob}/>
                            <PrivateRoute path="/dashboard/test/create" component={CreateTest}/>
                            <PrivateRoute path="/dashboard/test/:test_id/edit" component={CreateTest}/>
                            <PrivateRoute path="/dashboard/test/list" component={ListTest}/>
                            <PrivateRoute path="/dashboard/college/add" component={College}/> // csv required also
                            <PrivateRoute path="/dashboard/college/:college/edit" component={College}/>
                            <PrivateRoute path="/dashboard/board" component={WekanBoard}/>
                            <Redirect from="*" to='/dashboard'/>
                        </Switch>
                        <NotificationContainer/>
                    </div>
                </div>
            }
            {
                props.props.sys_role === "user" &&
                <div>
                    <Switch>
                        <PrivateRoute exact path="/dashboard" component={UserDashboard}/>
                        <Route path="/hiring-process" component={HiringProcess}/>
                        <PrivateRoute path="/my-activities" component={Activities}/>
                        <PrivateRoute path="/drive-details" component={DriveDetails}/>
                        <PrivateRoute exact path="/test/instructions" component={TestInstruction}/>
                        <PrivateRoute path="/test/started" component={AptitudeTest}/>
                        <PrivateRoute exact path="/profile" component={Profile}/>
                        <PrivateRoute path="/profile/:section/edit" component={RegisterThroughLinkedIn}/>
                        <PrivateRoute path="/profile/change-password" component={UpdatePassword}/>
                        <PrivateRoute path="/feedback" component={Feedback}/>
                        <Route exact path="/jobs" component={Jobs}/>
                        <Route exact path="/jobs/:team/:job" component={JobDetails}/>
                        <Route path="/jobs/:job/job-details/apply-job" component={ApplyJob}/>
                        <Redirect from="*" to='/dashboard'/>
                    </Switch>
                </div>
            }
            <Redirect from="*" to='/jobs'/>
        </Switch>
    )
}

class RouteComponent extends Component {
    componentWillMount() {
        authenticated = this.props.isAuthenticated;
        setInterval(() => {
            console.log(authenticated, "authenticated")
            if (authenticated) {
                rt = setInterval(() => {
                    clearInterval(rt);
                    if (authenticated) {
                        this.props.dispatch(refreshToken())
                    }
                }, 100)
            } else {
                console.log("no need to refresh token")
                clearInterval(rt);
            }
        }, 540000)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isAuthenticated !== nextProps.isAuthenticated)
            authenticated = nextProps.isAuthenticated
    }

    render() {
        return (
            <div id="theme-6" className={this.props.sys_role === "admin" ? "theme-6-active" : ""}>
                {this.props.sys_role === "admin" ? <AdminToolbar/> : <Head/>}
                {this.props.sys_role === "admin" && <AdminSidebar/>}
                <div
                    className={this.props.sys_role === "admin" ? "" : ((this.props.location.pathname === "/drive/test/aptitude-test" || this.props.location.pathname === "/drive/test/instruction") ? "" : "main-container")}>
                    <div
                        className={this.props.sys_role === "admin" ? "" : ((this.props.location.pathname === "/drive/test/aptitude-test" || this.props.location.pathname === "/drive/test/instruction") ? "" : "outer-wrapper")}>
                        {
                            this.props.sys_role !== "admin" && (
                                <div>
                                    {
                                        this.props.isAuthenticated &&
                                        (this.props.location.pathname !== "/drive/test/aptitude-test" &&
                                            this.props.location.pathname !== "/drive/test/instruction") &&
                                        <Toolbar/>
                                    }
                                    {
                                        this.props.isAuthenticated &&
                                        (this.props.location.pathname !== "/drive/test/aptitude-test" && this.props.location.pathname !== "/drive/test/instruction") &&
                                        <Menubar/>
                                    }
                                </div>
                            )
                        }
                        <Switch>
                            <Route exact path="/jobs" component={Jobs}/>
                            <Route exact path="/jobs/:team/:job" component={JobDetails}/>

                            <ProtectedRoute path="/login" component={Login}/>
                            <ProtectedRoute path="/forgot-password" component={ForgotPassword}/>
                            <ProtectedRoute path="/reset-password" component={ResetPassword}/>
                            <ProtectedRoute path="/verify-email" component={EmailVerification}/>

                            <ProtectedRoute exact path="/apply-linkedIn/check-email"
                                            component={CheckEmailSection}/>

                            <ProtectedRoute exact path="/apply-manual/check-email" component={Register}/>
                            <ProtectedRoute path="/apply-manual/personal-information" component={Register}/>
                            <ProtectedRoute exact path="/apply-manual/education" component={Register}/>
                            <ProtectedRoute exact path="/apply-manual/experience" component={Register}/>
                            <ProtectedRoute exact path="/apply-manual/information" component={Register}/>
                            <ProtectedRoute exact path="/apply-manual/create-password" component={Register}/>
                            <ProtectedRoute exact path="/apply-manual/preview" component={Register}/>
                            <ProtectedRoute exact path="/apply-manual/review" component={Register}/>
                            <ProtectedRoute exact path="/apply-manual/preview" component={PreviewSection}/>

                            <ProtectedRoute path="/apply-linkedIn/register"
                                            component={RegisterThroughLinkedIn}/>

                            <Route path="/hiring-process" component={HiringProcess}/>

                            <BodyWrapper props={this.props}/>

                        </Switch>
                    </div>
                </div>
                {
                    this.props.sys_role === "admin" ? <AdminFooter/> : <Footer/>
                }
                {
                    this.props.isAuthenticated &&
                    <ChatBox/>
                }
            </div>

        )
    }
}

function mapStateToProps(state) {
    const {auth} = state.LoginReducer;
    const {isAuthenticated, sys_role} = auth;
    return {isAuthenticated, sys_role}
}

export default withRouter(connect(mapStateToProps)(RouteComponent));
