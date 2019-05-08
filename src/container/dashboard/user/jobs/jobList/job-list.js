/*eslint-disable*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getJobs, getTeamJobs, clearAll} from '../../../../../actions/dashboard/user/jobs/jobs';

class JobList extends Component {
  componentWillMount() {
      document.title = "Jobs | Xenonstack Hiring Portal";
      this.props.dispatch(clearAll());
      this.props.dispatch(getJobs());
      this.props.dispatch(getTeamJobs(this.props.match.params.job));
  }
matchTeam = (query) => (item) => !query || item.teamId.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    render() {
        return (
            <div>
                <section className="joblist-banner">
                    <div className="jobpage-banner-container joblist-banner-container">
                        <div className="banner-background joblist-image"></div>
                    </div>
                </section>
                <section className="joblist-content">
                    <div className="wrapper">
                        <div className="team-content">
                            <div
                                className="row">
                                <div
                                    className="col-sm-12">
                                    <div
                                        className="page-heading-outer mar-b-6">
                                        <h2
                                            className="page-heading"> Find a team and begin your own story </h2>
                                        <h3 className="subtitle">Work with our team from different techonlogy stacks like Data Engineering, Data Science, DevOps, Data Visualization and Many More</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 mar-xs-30">
                                {
                                    (!this.props.pageLoading && this.props.jobs.length > 0) &&
                                    (
                                      this.props.jobs.map((d, i) => (
                                          (d.team_id === this.props.match.params.job) &&
                                      <div className="oneteam-detail">
                                          <h2 className="title_head">Account Management</h2>
                                          <p className="page-heading-desc">XenonStack is a Software Company developing
                                              Productivity,
                                              Monitoring,
                                              Intelligence Platforms for DevOps, Data Integration, Analysis & Security
                                              and provides Big Data
                                              Solutions, Decision Science and Enterprise Application Development on
                                              Cloud.XenonStack is a
                                              Software
                                              Company developing Productivity, Monitoring, Intelligence Platforms for
                                              DevOps, Data
                                              Integration,
                                              Analysis & Security and provides Big Data Solutions, Decision Science
                                              and Enterprise Application
                                              Development on Cloud.</p>
                                      </div>
                                  ))
                                )
                                }
                                {
                                    (!this.props.pageLoading && this.props.jobs.length > 0 && (this.props.jobs).filter(this.matchTeam(this.props.match.params.job)) === -1) &&
                                      <div>Current no team found.</div>
                                }
                                {
                                    (!this.props.pageLoading && this.props.jobs.length === 0 && this.props.message === "") &&
                                    <div>No team found..</div>
                                }
                                {
                                    (!this.props.pageLoading && this.props.message !== "") &&
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
                                        <h2 className="page-heading text-center">Open Positions of {this.props.match.params.job}</h2>
                                        <h3 className="subtitle text-center">Find the best Jobs opportunity based on
                                            your area
                                            of
                                            interest</h3>
                                    </div>
                                </div>
                            </div>
                            <section class="opening-jobs">
                                <div class="wrapper">
                                    <div class="job-post-content">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="page-heading-outer mar-b-6">
                                                    <h2 class="page-heading text-center"> More Open Positions of HR and Recruitment</h2>
                                                    <h3 class="subtitle text-center">Find the best Jobs opportunity based on your area of interest</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                        {
                                            !this.props.pageLoading && this.props.team_jobs.length > 0 &&
                                            (
                                              this.props.team_jobs.map((d, i) => (
                                            <div class="col-12 col-sm-6 col-md-6 mar-xs-30">
                                                <div class="job-post-item">
                                                    <h4 class="subtitle job-post-heading">Sales Development Representative</h4>
                                                    <p class="page-heading-desc">Chandigarh - India</p>
                                                    <Link to={"/teams/"+this.props.match.params.job+"/"+d.job+"/job-details"} class="full-link-hover"></Link>
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
                    </div>
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {jobs, error, message, status, pageLoading,
    team_jobs, team_jobs_error, team_jobs_message, team_jobs_status} = state.userJobsReducer;
    return {jobs, error, message, status, pageLoading,
    team_jobs, team_jobs_error, team_jobs_message, team_jobs_status}
}
export default connect(mapStateToProps)(JobList)
