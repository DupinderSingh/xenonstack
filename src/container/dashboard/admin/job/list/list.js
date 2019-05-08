import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import BarLoaderSpinner from '../../../../../components/app/spinner/barloader';
import AdminOnPageNavigation from '../../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import createNotification from "../../../../../components/app/notification/notification";
import {
    clearAll,
    clearStatus,
    deleteJob,
    getJobs,
    selectedDeleteJob
} from "../../../../../actions/dashboard/user/jobs/jobs";
import {NotificationContainer} from 'react-notifications';
import DeleteDialogBox from "../../../../../components/app/dialogBox/delete-dialog-box";

let props = null;

class ListJob extends Component {
    componentWillMount() {
        this.props.dispatch(clearAll());
        this.props.dispatch(getJobs());
        props = this.props;
    }


    deleteJob(e) {
        e.preventDefault();
        console.log(this.props, "props....");
        console.log(props.deleteJob, "pops..");
        this.props.dispatch(deleteJob(props.deleteJob.team_id, this.props.selected)); //team , job
        if (!!document.getElementsByClassName("overlay-delete")[1]) {
            document.getElementsByClassName("overlay-delete")[1].style.display = "none";
        }
    }

    openDeleteTeamDialog(team_id, job_id, job_name) {
        this.props.dispatch(selectedDeleteJob({team_id, job_id, job_name}));
        console.log(document.getElementsByClassName("overlay-delete"), "overlayyy");
        document.getElementsByClassName("overlay-delete")[1].style.display = "block";
    }

    closeDeleteJobDialog() {
        console.log(document.getElementsByClassName("overlay-delete"), "overllll");
        if (!!document.getElementsByClassName("overlay-delete")[1]) {
            document.getElementsByClassName("overlay-delete")[1].style.display = "none";
        }
    }


    componentWillReceiveProps(nextProps) {
        props = nextProps;
        if (nextProps.delete_job_message !== "") {
            if (nextProps.delete_job_error) {
                createNotification('error', nextProps.delete_job_message);
                nextProps.dispatch(clearStatus());
            } else {
                createNotification('success', nextProps.delete_job_message);
                nextProps.dispatch(getJobs())
            }
        }
    }

    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard" childRoute="View Job"/>
                <BarLoaderSpinner pageLoading={this.props.pageLoading}/>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="panel panel-default card-view custom-panel pool-panel">
                            <div className="panel-heading">
                                <h5 className="panel-title">All Jobs</h5>
                                <div className="clearfix"></div>
                            </div>
                            <div className="panel-wrapper collapse in">
                                <div className="panel-body">
                                    <div className="table-wrap">
                                        <div className="table-responsive">
                                            <table id="myTable1" className="table display pb-30">
                                                <thead>
                                                <tr>
                                                    <th className="">Team Name</th>
                                                    <th className="">Job Name</th>
                                                    <th className="">Job Summary</th>
                                                    <th className="">Location</th>
                                                    <th className="">Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    (!this.props.pageLoading && this.props.jobs.length > 0) &&
                                                    this.props.jobs.map((t, i) => (
                                                        t.jobs.map((j, i) => (
                                                            <tr style={{cursor: "default"}}>
                                                                <td>{t.teamName}</td>
                                                                <td>{j.name}</td>
                                                                <td>{(j.summary).substring(0, 100)}...</td>
                                                                <td>{j.location}</td>
                                                                <td>
                                                                    <span
                                                                        onClick={() => this.props.history.push("/dashboard/job/" + t.teamId + "/" + j.id + "/edit")}><i
                                                                        style={{cursor: "pointer"}}
                                                                        class="material-icons">create</i></span>
                                                                    <span
                                                                        onClick={() => this.openDeleteTeamDialog(t.teamId, j.id, j.name)}><i
                                                                        style={{cursor: "pointer"}}
                                                                        class="material-icons">delete</i></span>

                                                                </td>
                                                            </tr>
                                                        ))
                                                    ))
                                                }
                                                {
                                                    (!this.props.pageLoading && this.props.jobs.length === 0 && this.props.message === "") &&
                                                    <tr>
                                                        <td colSpan={4}>
                                                            <div className="table-body-loader">
                                                                <div className="flex-center">
                                                                    <div className="server-error-response">
                                                                        No jobs found.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                }
                                                {
                                                    (!this.props.pageLoading && this.props.message !== "") &&
                                                    <tr>
                                                        <td colSpan={4}>
                                                            <div className="table-body-loader">
                                                                <div className="flex-center">
                                                                    <div className="server-error-response">
                                                                        {this.props.message}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DeleteDialogBox
                    formName="Delete Job"
                    submitForm={this.deleteJob}
                    operation="Delete Job"
                    keyword={"Delete"}
                    closeForm={this.closeDeleteJobDialog}
                    pageLoading={this.props.pageLoading}
                    selected={this.props.deleteJob.job_id}
                    name={this.props.deleteJob.job_name}
                />
                <NotificationContainer/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {
        deleteJob,
        pageLoading, status, error, message, jobs,
        delete_job_status, delete_job_error, delete_job_message
    } = state.userJobsReducer;
    return {
        deleteJob,
        pageLoading, status, error, message, jobs,
        delete_job_status, delete_job_error, delete_job_message
    }
};

export default withRouter(connect(mapStateToProps)(ListJob))
