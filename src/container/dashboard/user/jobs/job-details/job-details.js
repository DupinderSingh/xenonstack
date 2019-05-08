/*eslint-disable*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {applyJob, getTeamJobs} from "../../../../../actions/dashboard/user/jobs/jobs";
import {getJobDetails} from "../../../../../actions/dashboard/admin/job/job";

// data will come from backend and will be updated after the response we get....

class JobDetails extends Component {
    componentWillMount() {
        document.title = "Job Details | Xenonstack Hiring Portal";
        this.props.dispatch(getJobDetails(this.props.match.params.team, this.props.match.params.job));
        this.props.dispatch(getTeamJobs(this.props.match.params.team));
    }

    applyForJob() {
        this.props.dispatch(applyJob({team: this.props.match.params.team, job: this.props.match.params.job}));
        if (this.props.isAuthenticated) {
            this.props.history.push("/dashboard")
        } else {
            this.props.history.push("/dashboard")
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.match.params.job !== nextProps.match.params.job) {
            nextProps.dispatch(getJobDetails(nextProps.match.params.team, nextProps.match.params.job));
            nextProps.dispatch(getTeamJobs(nextProps.match.params.team));
        }
    }

    render() {
        return (
            <div>
                <section className="jobdetail-content">
                    <div className="wrapper">
                        <div className="detail-content">
                            <div className="row">
                                <div className="col-12 col-sm-10">
                                    {
                                        (!this.props.pageLoading && !this.props.error && this.props.job_details.id !== undefined && this.props.job_details.id !== null) &&
                                        <div>
                                            <div className="post-detail-header">
                                                <h2 className="page-heading">{this.props.job_details.name}</h2>
                                                <p className="page-heading-desc"> {this.props.job_details.location}</p>
                                                <Link to={this.props.isAuthenticated ? "/dashboard" : "/login"}
                                                      onClick={this.applyForJob.bind(this)} className="btn mar-t-2">Apply
                                                    for this Job</Link>
                                            </div>
                                            <div className="post-content">
                                                <div
                                                    dangerouslySetInnerHTML={{__html: this.props.job_details.body}}/>
                                            </div>
                                            <Link to={this.props.isAuthenticated ? "/dashboard" : "/login"}
                                                  onClick={this.applyForJob.bind(this)} className="btn mar-t-2">Apply
                                                for this Job</Link>
                                        </div>
                                    }
                                    {
                                        (!this.props.pageLoading && this.props.error) &&
                                        <div>{this.props.message}</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <section className="opening-jobs">
                    <div className="wrapper">
                        <div className="job-post-content">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="page-heading-outer mar-b-6">
                                        <h2 className="page-heading text-center"> More Open Positions
                                            of {(((this.props.match.params.team).split("-")).map((d) => d.charAt(0).toUpperCase() + d.slice(1))).join(" ")}</h2>
                                        <h3 className="subtitle text-center">Find the best Jobs opportunity based on
                                            your area of interest</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {
                                    !this.props.pageLoading && this.props.team_jobs.length > 0 &&
                                    (
                                        this.props.team_jobs.map((d, i) => (
                                            d.id !== this.props.match.params.job &&
                                                <div className="col-12 col-sm-12 col-md-6 mar-xs-30" onClick={() => this.props.history.push("/jobs/" + this.props.match.params.team + "/" + d.id)}
                                                     style={{cursor: "none"}}>
                                                    <div className="job-post-item">
                                                        <h4 className="subtitle job-post-heading">{d.name}</h4>
                                                        <p className="page-heading-desc">{d.location}</p>
                                                    </div>
                                                </div>
                                        ))
                                    )
                                }
                                {
                                    (!this.props.pageLoading && this.props.team_jobs.length === 0 && this.props.team_jobs_message === "") &&
                                    <div>No jobs found..</div>
                                }
                                {
                                    (!this.props.pageLoading && this.props.team_jobs_message !== "") &&
                                    <div>{this.props.team_jobs_message}</div>
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {auth} = state.LoginReducer;
    const {isAuthenticated} = auth;
    const {
        job_details, error, message, status, pageLoading,
        team_jobs, team_jobs_error, team_jobs_message, team_jobs_status
    } = state.userJobsReducer;
    console.log(team_jobs, "team_jobs")
    return {
        isAuthenticated,
        job_details, error, message, status, pageLoading,
        team_jobs, team_jobs_error, team_jobs_message, team_jobs_status
    }
}

export default connect(mapStateToProps)(JobDetails)
