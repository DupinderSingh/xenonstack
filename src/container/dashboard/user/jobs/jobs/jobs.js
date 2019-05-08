/*eslint-disable*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {clearAll, getJobs, searchJobs} from '../../../../../actions/dashboard/user/jobs/jobs';

class Jobs extends Component {
    componentWillMount() {
        document.title = "Jobs | Xenonstack Hiring Portal";
        this.props.dispatch(clearAll());
        this.props.dispatch(getJobs())
    }

    searchJobs(e) {
        this.props.dispatch(searchJobs(e.target.value))
    }

    searchRelatedJobs(query) {
        return function (item) {
            const jobs = item.jobs;
            for (let j in jobs) {
                let skills = jobs[j].skills;
                for (let s in skills) {
                    if (skills[s].toLowerCase().match(query.toLowerCase())) {
                        return item
                    }
                }
            }
        }
    };

    render() {
        return (
            <div>
                <section className="jobpage-banner">
                    <div className="jobpage-banner-container">
                        <div className="banner-background job-banner-image">
                            <div className="banner-content">
                                <h2 className="banner-heading">Looking for job? you are at right place</h2>
                                <h4 className="subtitle">We are here to provide you best opportunities you are waiting
                                    for
                                    !!</h4>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="jobpage-content">
                    <div className="wrapper">
                        <div className="team-content">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12">
                                    <div className="page-heading-outer mar-b-3">
                                        <h2 className="page-heading">Jobs at XenonStack </h2>
                                        <p className="subtitle">Work with our team from different techonlogy stacks like
                                            Data Engineering, Data Science, DevOps , Data Visualization and Many
                                            More</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12">
                                    <div className="mar-b-6">
                                        <input type="text" className="search-input" placeholder="Search Jobs"
                                               value={this.props.search} onChange={this.searchJobs.bind(this)}
                                               name="search"/>
                                        {/*<button type="submit" className="jobsearch-btn"><i className="fa fa-search"></i></button>*/}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12">
                                    {
                                        (!this.props.pageLoading && this.props.jobs.length > 0) &&
                                        (
                                            this.props.jobs.filter(this.searchRelatedJobs(this.props.search)).length > 0 &&

                                            this.props.jobs.filter(this.searchRelatedJobs(this.props.search)).map((t, i) => (
                                                t.jobs.length > 0 &&
                                                (
                                                    <div>
                                                        <div><h2 className="box-title">{t.teamName}</h2></div>
                                                        {/*<div className="">*/}
                                                        <div className="row">
                                                            {
                                                                t.jobs.map((d) => (
                                                                    <div
                                                                        className="col-12 col-sm-12 col-md-12">
                                                                        <div className="job-post-item">
                                                                            <div
                                                                                onClick={() => this.props.history.push("/jobs/" + t.teamId + "/" + d.id)}>
                                                                                <h4 className="subtitle job-post-heading">{d.name}</h4>
                                                                                <p
                                                                                    className="page-heading-desc">{d.location}</p>
                                                                                <p className="page-heading-desc">{d.summary}</p>
                                                                            </div>
                                                                            <Link
                                                                                to={"/jobs/" + t.teamId + "/" + d.id}
                                                                                className="btn job-btn mar-t-2">Apply
                                                                                for this Job</Link>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                        {/*</div>*/}
                                                    </div>

                                                )
                                            ))
                                        )
                                    }


                                    {
                                        (!this.props.pageLoading && this.props.jobs.length > 0) &&
                                        (
                                            this.props.jobs.filter(this.searchRelatedJobs(this.props.search)).length === 0 &&
                                            <div>No jobs found..</div>
                                        )
                                    }

                                    {
                                        (!this.props.pageLoading && this.props.jobs.length === 0 && this.props.message === "") &&
                                        <div>No jobs found..</div>
                                    }
                                    {
                                        (!this.props.pageLoading && this.props.message !== "") &&
                                        <div>No jobs found..</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {search, jobs, error, message, status, pageLoading} = state.userJobsReducer;
    return {search, jobs, error, message, status, pageLoading}
}

export default connect(mapStateToProps)(Jobs)
