/*eslint-disable*/
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {NotificationContainer} from 'react-notifications'; // S6
import {
    doNotGoToRegistration,
    updateSkipEducation,
    updateSkipExperience
} from "../../../actions/account/registration-action";
import {noApplyJob, saveApplyJob} from "../../../actions/dashboard/user/jobs/jobs";
import {clearAll as clearDriveResponse, clearStatus, driveList} from "../../../actions/dashboard/user/drives/drives";
import BarLoaderSpinner from "../../../components/app/spinner/barloader";
import {
    clearAll as clearActivitiesResponse,
    getActivities
} from "../../../actions/dashboard/user/activities/activities";
import moment from "moment";
import createNotification from "../../../components/app/notification/notification";

class UserDashboard extends Component {
    componentWillMount() {
        document.title = "Dashboard | Xenonstack Hiring Portal";
        this.props.dispatch(clearDriveResponse());
        this.props.dispatch(updateSkipEducation(false));
        this.props.dispatch(updateSkipExperience(false));
        this.props.dispatch(clearActivitiesResponse());
        this.forceUpdate();
        this.props.dispatch(driveList());
        if (this.props.applyForJob.apply) {
            // hit the api here to save the job
            this.props.dispatch(saveApplyJob({jobid: this.props.applyForJob.job, teamid: this.props.applyForJob.team}));
            this.props.dispatch(noApplyJob())
        } else {
            this.props.dispatch(getActivities("/v1/apply"))
        }
        if (this.props.goToRegistration)
            this.props.dispatch(doNotGoToRegistration())
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.saveApplyJobMessage !== "") {
            if (nextProps.saveApplyJobError) {
                createNotification('error', nextProps.saveApplyJobMessage);
                nextProps.dispatch(clearStatus());
                nextProps.dispatch(getActivities("/v1/apply"))

            } else {
                createNotification('success', nextProps.saveApplyJobMessage);
                nextProps.dispatch(clearStatus());
                nextProps.dispatch(getActivities("/v1/apply"))
            }
        }
    }

    render() {
        return (
            <section className="">
                <BarLoaderSpinner
                    pageLoading={this.props.saveApplyJobPageLoading || this.props.pageLoading || this.props.activitiesPageLoading}/>
                <div className="container">
                    <div className="content-detail">
                        <div className="text-center">
                            <h1 className="main-heading-h1">Welcome to XenonStack Hiring Portal</h1>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-8">
                                <div className="dash-status">

                                    <div className="activity-status">
                                        <h2>Recent Activity</h2>

                                        {
                                            !this.props.activitiesPageLoading && this.props.activities.length > 0 &&

                                            <div className="activity-show" id="activity-show">
                                                <div className="status-div" style={{cursor: "pointer"}}>
                                                    <ul className="dashboard-activity-ul">
                                                        <li><h3>Applied For :</h3>
                                                            <span> {this.props.activities[0]["job_name"]}</span></li>
                                                    </ul>
                                                    <ul>
                                                        <li>Team Name<p>{this.props.activities[0]["team_name"]}</p></li>
                                                        <li>Applied On
                                                            <p>{moment(this.props.activities[0]["applied_date"] * 1000).format('Do MMM YYYY')}</p>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        }

                                        {
                                            !this.props.activitiesPageLoading && this.props.activities.length === 0 && this.props.activitiesMessage === "" &&
                                            <div className="no-activity text-center">
                                                <div className="">
                                                    <figure><img src={require("../../../static/images/activity.svg")}
                                                                 alt={"No Activity"}/></figure>
                                                </div>
                                                <h3>No Activity Recorded</h3>
                                                <p>You have not apply for any job yet or may be your job completed</p>

                                            </div>

                                        }

                                        {
                                            !this.props.activitiesPageLoading && this.props.activitiesMessage !== "" &&
                                            <div className="no-activity text-center">
                                                <div className="">
                                                    <figure><img src={require("../../../static/images/activity.svg")}
                                                                 alt={"No Activity"}/></figure>
                                                </div>
                                                <h3>Something Went wrong...</h3>
                                                <p>{this.props.activitiesMessage}</p>

                                            </div>

                                        }
                                    </div>

                                    <div className="current-status">
                                        <h2>Your Test Status</h2>

                                        <div className="no-activity text-center">
                                            <div className="">
                                                <figure><img src={require("../../../static/images/status.svg")}
                                                             alt={"No status"}/></figure>
                                            </div>
                                            <h3>No Test to Show</h3>
                                            <p>You have not apply for any job yet or may be your job completed</p>
                                        </div>

                                        {/*<div className="activity-show" id="activity-show">*/}
                                        {/*<p>Progress 50%</p>*/}
                                        {/*<div className="progress2">*/}
                                        {/*<div className="progress-bar2"></div>*/}
                                        {/*</div>*/}
                                        {/*<div className="status-div">*/}
                                        {/*<ul>*/}
                                        {/*<li>Test name<p>Online apptitude</p></li>*/}
                                        {/*<li>Given Date<p>12 january 2019</p></li>*/}
                                        {/*<li>Test Status<p>completed</p></li>*/}
                                        {/*</ul>*/}
                                        {/*</div>*/}
                                        {/*</div>*/}
                                    </div>

                                    <div className="upcoming-status">
                                        <h2>Upcoming Round</h2>
                                        {
                                            (!this.props.pageLoading && this.props.drives.length > 0) &&
                                            this.props.drives.map((d, i) => (
                                                <div className="activity-show" id="activity-show">
                                                    <div className="status-div upcoming">
                                                        <h3>{d.name.charAt(0).toUpperCase() + d.name.slice(1)} Test</h3>
                                                        <p>Online Apptitude test contain MCQ type questions
                                                            including
                                                            reasoning,
                                                            English and Quantatives.</p>
                                                        <div>
                                                            <a href={"https://career-test.xenon.team?token=" + localStorage.getItem("token") + "&&drive_id=" + d.id + "&&test_id=" + d.test_id}
                                                               target="_blank" className="btn mar-t-2">Start Test</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                        {
                                            !this.props.pageLoading && this.props.drives.length === 0 && this.props.message === "" &&
                                            <div className="no-activity text-center">
                                                <div className="">
                                                    <figure><img
                                                        src={require("../../../static/images/upcoming.svg")}
                                                        alt={"No Tet"}/></figure>
                                                </div>
                                                <h3>No Upcoming Test</h3>
                                                <p>You have not apply for any job yet or may be your job
                                                    completed</p>
                                            </div>
                                        }

                                        {
                                            !this.props.pageLoading && this.props.message !== "" &&
                                            <div className="no-activity text-center">
                                                <div className="">
                                                    <figure><img
                                                        src={require("../../../static/images/upcoming.svg")}
                                                        alt={"No Tet"}/></figure>
                                                </div>
                                                <h3>Something Went wrong...</h3>
                                                <p>{this.props.message}</p>
                                            </div>
                                        }


                                    </div>

                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-4">


                                <div className="dash-side">
                                    <div className="all-test">
                                        <ul>
                                            <li>Selection Rounds</li>
                                            <li className="ongoing"><span>01</span> Online Apptitude Test</li>
                                            <li><span>02</span> Online Technical Test</li>
                                            <li><span>03</span> Written Technical Test/ Technical Interview</li>
                                            <li><span>04</span> HR Interview Round</li>
                                            <li><span>05</span>Final Discussion/ Psychometric Test <Link
                                                to="/hiring-process" className="light-btn">View
                                                Detail</Link>
                                            </li>
                                        </ul>
                                    </div>


                                </div>
                            </div>
                            {/*<div className="note-status">Note: Once you applied for the test, you can apply*/}
                            {/*again only after six*/}
                            {/*months.*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
                <NotificationContainer/>
            </section>
        )
    }
}

function mapStateToProps(state) {
    const {activities, activitiesError, activitiesMessage, activitiesStatus, activitiesPageLoading} = state.activitiesReducer;
    const {
        saveApplyJobPageLoading, saveApplyJobStatus, saveApplyJobError, saveApplyJobMessage,
        drives, error, message, pageLoading
    } = state.userDrivesReducer;
    const {applyForJob} = state.userJobsReducer;
    const {goToRegistration} = state.RegisterReducer;
    return {
        activities, activitiesError, activitiesMessage, activitiesStatus, activitiesPageLoading,
        saveApplyJobPageLoading, saveApplyJobStatus, saveApplyJobError, saveApplyJobMessage,
        applyForJob, goToRegistration,
        drives, error, message, pageLoading
    }
}

export default withRouter(connect(mapStateToProps)(UserDashboard))
