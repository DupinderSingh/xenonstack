import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AdminOnPageNavigation from '../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import {clearAll, getUserDetails} from '../../../../actions/dashboard/admin/user/user';
import moment from 'moment';
import BarLoaderSpinner from "../../../../components/app/spinner/barloader";
import {
    clearAll as clearActivitiesResponse,
    getActivities
} from "../../../../actions/dashboard/user/activities/activities";
import GoogleDocsViewer from "react-google-docs-viewer";

let interests = "";

class CandidateDetails extends Component {
    componentWillMount() {
        this.props.dispatch(clearActivitiesResponse());
        this.props.dispatch(clearAll());
        this.props.dispatch(getUserDetails(this.props.match.params.email));
        this.props.dispatch(getActivities("/v1/users/" + this.props.match.params.email + "/jobs"))
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!!nextProps.userDetails.profile) {
            if (nextProps.userDetails.profile.interests.length > 0) {
                interests = "";
                const selectedInterest = nextProps.userDetails.profile.interests;
                for (let i in selectedInterest) {
                    interests = interests + selectedInterest[i] + " , ";
                }
                interests = interests.slice(0, interests.length - 2)
            }
        }
    }

    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard" childRoute="Candidates List"/>
                <div className="row">
                    <BarLoaderSpinner
                        pageLoading={this.props.pageLoading || this.props.activitiesPageLoading}/>
                    <div className="col-lg-12 col-sm-12 col-md-12">
                        <div className="pool-form-wrapper">
                            <div className="row" id="personal">
                                <div className="col-lg-9 col-sm-12 col-md-12">
                                    <div className="user-profile-flex">
                                        <h3 className="">Personal Information </h3>
                                    </div>
                                    <div className="profile-wrap">
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-6 "><label>Name :</label>
                                                    </div>
                                                    <span
                                                        className="col-12 col-sm-6 col-md-6 ">{!!this.props.userDetails.profile && (this.props.userDetails.profile.fname + " " + this.props.userDetails.profile.lname)}</span>
                                                </div>
                                            </div>

                                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-6"><label>Email Address
                                                        :</label></div>
                                                    <span
                                                        className="col-12 col-sm-6 col-md-6">{!!this.props.userDetails.profile && this.props.userDetails.profile.email}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-6"><label>Contact Number
                                                        :</label></div>
                                                    <span
                                                        className="col-12 col-sm-6 col-md-6">{!!this.props.userDetails.profile && this.props.userDetails.profile.contact}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-6">
                                                        <label>Country :</label></div>
                                                    <span
                                                        className="col-12 col-sm-6 col-md-6">{!!this.props.userDetails.profile && this.props.userDetails.profile.country}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-6">
                                                        <label>State :</label></div>
                                                    <span
                                                        className="col-12 col-sm-6 col-md-6">{!!this.props.userDetails.profile && this.props.userDetails.profile.state}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-6 "><label>City :</label>
                                                    </div>
                                                    <span
                                                        className="col-12 col-sm-6 col-md-6 ">{!!this.props.userDetails.profile && this.props.userDetails.profile.city}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 form-group ">
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-6"><label>Postal Code
                                                        :</label></div>
                                                    <span
                                                        className="col-12 col-sm-6 col-md-6">{!!this.props.userDetails.profile && this.props.userDetails.profile.postal}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-9 col-sm-12 col-md-12">
                                    <div className="user-profile-flex">
                                        <h3 className="">Education </h3>
                                    </div>
                                    <div className="profile-wrap">
                                        {
                                            !!this.props.userDetails.profile ?
                                                (
                                                    this.props.userDetails.profile.education.length > 0 ?
                                                        (
                                                            this.props.userDetails.profile.education.map((d, i) => (
                                                                <div>
                                                                    <div className="row">
                                                                        <div
                                                                            className="col-12 col-sm-12  col-md-6 form-group mobile-profile">
                                                                            <div className="row">
                                                                                <div
                                                                                    className="col-12 col-sm-6 col-md-6 ">
                                                                                    <label>College/University :</label>
                                                                                </div>
                                                                                <span
                                                                                    className="col-12 col-sm-6 col-md-6 ">{d.degree}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                                                            <div className="row">
                                                                                <div
                                                                                    className="col-12 col-sm-6 col-md-6 ">
                                                                                    <label>{i === 0 ? "Highest Qualification :" : "Other Qualification :"}</label>
                                                                                </div>
                                                                                <span
                                                                                    className="col-12 col-sm-6 col-md-6 ">{d.school}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="col-12 col-sm-12 col-md-6 form-group ">
                                                                            <div className="row">
                                                                                <div
                                                                                    className="col-12 col-sm-6 col-md-6 ">
                                                                                    <label>Duration :</label></div>
                                                                                <span
                                                                                    className="col-12 col-sm-6 col-md-6 ">{d.start} to {d.end}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )))
                                                        :
                                                        (
                                                            <div>
                                                                <div className="row">
                                                                    <div
                                                                        className="col-12 col-sm-12 col-md-6 form-group ">
                                                                        <div className="row">
                                                                            <div
                                                                                className="col-12 col-sm-6 col-md-6 ">
                                                                                <label>College/University :</label>
                                                                            </div>
                                                                            <span
                                                                                className="col-12 col-sm-6 col-md-6 "></span>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="col-12 col-sm-12  col-md-6 form-group mobile-profile">
                                                                        <div className="row">
                                                                            <div
                                                                                className="col-12 col-sm-6 col-md-6  ">
                                                                                <label>Highest Qualification :</label>
                                                                            </div>
                                                                            <span
                                                                                className="col-12 col-sm-6 col-md-6  "></span>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="col-12 col-sm-12 col-md-6 form-group ">
                                                                        <div className="row">
                                                                            <div
                                                                                className="col-12 col-sm-6 col-md-6 ">
                                                                                <label>Duration :</label></div>
                                                                            <span
                                                                                className="col-12 col-sm-6 col-md-6 "></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                )
                                                :

                                                (<div>
                                                        <div className="row">
                                                            <div
                                                                className="col-12 col-sm-12  col-md-6 form-group mobile-profile">
                                                                <div className="row">
                                                                    <div
                                                                        className="col-12 col-sm-6 col-md-6  ">
                                                                        <label>College/University :</label>
                                                                    </div>
                                                                    <span
                                                                        className="col-12 col-sm-6 col-md-6  "></span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                                                <div className="row">
                                                                    <div
                                                                        className="col-12 col-sm-6 col-md-6 ">
                                                                        <label>Highest Qualification :</label></div>
                                                                    <span
                                                                        className="col-12 col-sm-6 col-md-6 "></span>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-sm-12 col-md-6 form-group">
                                                                <div className="row">
                                                                    <div
                                                                        className="col-12 col-sm-6 col-md-6 ">
                                                                        <label>Duration :</label></div>
                                                                    <span
                                                                        className="col-12 col-sm-6 col-md-6 "></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        }

                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-9 col-sm-12 col-md-12">
                                    <div className="user-profile-flex">
                                        <h3 className="">Experience </h3>
                                    </div>
                                    <div className="profile-wrap">
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-md-6 form-group ">
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-6 ">
                                                        <label>Experience :</label>
                                                        <span
                                                            className="col-12 col-sm-6 col-md-6 ">{!!this.props.userDetails.profile && this.props.userDetails.profile.whoYouAre}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12">
                                                <div className="divider"></div>
                                            </div>
                                        </div>
                                        {

                                            !!this.props.userDetails.profile ?
                                                (
                                                    this.props.userDetails.profile.experience.length > 0 ?
                                                        (
                                                            this.props.userDetails.profile.experience.map((d, i) => (
                                                                <div className="row">
                                                                    <div
                                                                        className="col-12 col-sm-12 col-md-6 form-group">
                                                                        <div className="row">
                                                                            <div
                                                                                className="col-12 col-sm-6 col-md-6 ">
                                                                                <label>Company
                                                                                    :</label></div>
                                                                            <span
                                                                                className="col-12 col-sm-6 col-md-6  ">{d.name}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="col-12 col-sm-12 col-md-6 form-group">
                                                                        <div className="row">
                                                                            <div
                                                                                className="col-12 col-sm-6 col-md-6 ">
                                                                                <label>Designation
                                                                                    :</label></div>
                                                                            <span
                                                                                className="col-12 col-sm-6 col-md-6 ">{d.position}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="col-12 col-sm-12 col-md-6 form-group">
                                                                        <div className="row">
                                                                            <div
                                                                                className="col-12 col-sm-6 col-md-6 ">
                                                                                <label>Duration
                                                                                    :</label></div>
                                                                            <span
                                                                                className="col-12 col-sm-6 col-md-6 ">{d.start + " to " + d.end}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 col-sm-12 col-md-12">
                                                                        <div className="divider"></div>
                                                                    </div>
                                                                </div>
                                                            )))
                                                        :
                                                        (

                                                            <div className="row">
                                                                <div className="col-12 col-sm-12 col-md-6 form-group">
                                                                    <div className="row">
                                                                        <div
                                                                            className="col-12 col-sm-6 col-md-6 ">
                                                                            <label>Company
                                                                                :</label></div>
                                                                        <span
                                                                            className="col-12 col-sm-6 col-md-6  "></span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-12 col-md-6 form-group">
                                                                    <div className="row">
                                                                        <div
                                                                            className="col-12 col-sm-6 col-md-6 ">
                                                                            <label>Designation
                                                                                :</label></div>
                                                                        <span
                                                                            className="col-12 col-sm-6 col-md-6 "></span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-12 col-md-6 form-group">
                                                                    <div className="row">
                                                                        <div
                                                                            className="col-12 col-sm-6 col-md-6 ">
                                                                            <label>Duration
                                                                                :</label></div>
                                                                        <span
                                                                            className="col-12 col-sm-6 col-md-6 "></span>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-12 col-md-12">
                                                                    <div className="divider"></div>
                                                                </div>
                                                            </div>

                                                        )
                                                )
                                                :

                                                (<div className="row">
                                                        <div className="col-12 col-sm-12 col-md-6 form-group">
                                                            <div className="row">
                                                                <div className="col-12 col-sm-6 col-md-6 ">
                                                                    <label>Company
                                                                        :</label></div>
                                                                <span
                                                                    className="col-12 col-sm-6 col-md-6  "></span>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-md-6 form-group">
                                                            <div className="row">
                                                                <div className="col-12 col-sm-6 col-md-6 ">
                                                                    <label>Designation
                                                                        :</label></div>
                                                                <span
                                                                    className="col-12 col-sm-6 col-md-6 "></span>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-md-6 form-group">
                                                            <div className="row">
                                                                <div className="col-12 col-sm-6 col-md-6 ">
                                                                    <label>Duration
                                                                        :</label></div>
                                                                <span
                                                                    className="col-12 col-sm-6 col-md-6 "></span>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-12 col-md-12">
                                                            <div className="divider"></div>
                                                        </div>
                                                    </div>
                                                )
                                        }
                                        {
                                            (!!this.props.userDetails.profile) &&
                                            this.props.userDetails.profile.projects.map((d, i) => (
                                                <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-12">Project {i + 1}</div>
                                                    <div className="col-12 col-sm-12 col-md-6 form-group">
                                                        <div className="row">
                                                            <div className="col-12 col-sm-6 col-md-6  ">
                                                                <label>Project Name
                                                                    :</label></div>
                                                            <span
                                                                className="col-12 col-sm-6 col-md-6  ">{d["name"]}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-6 form-group">
                                                        <div className="row">
                                                            <div className="col-12 col-sm-6 col-md-6  ">
                                                                <label>Description
                                                                    :</label></div>
                                                            <span
                                                                className="col-12 col-sm-6 col-md-6  ">{d["description"]}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-6 form-group">
                                                        <div className="row">
                                                            <div className="col-12 col-sm-6 col-md-6  ">
                                                                <label>Skills Applied
                                                                    :</label></div>
                                                            <span
                                                                className="col-12 col-sm-6 col-md-6  ">{d["skills"]}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-12 col-md-12">
                                                        <div className="divider"></div>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-9 col-sm-12 col-md-12" id="basicinfo">
                                    <div className="user-profile-flex">
                                        <h3 className="">Basic Information </h3>
                                    </div>
                                    <div className="profile-wrap">
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-6">
                                                        <label>Area of Interest
                                                            :</label>
                                                    </div>
                                                    <span
                                                        className="col-12 col-sm-6 col-md-6 ">{interests}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-6   "><label>Job
                                                        Notification
                                                        :</label></div>
                                                    <span
                                                        className="col-12 col-sm-6 col-md-6  ">{!!this.props.userDetails.profile && (this.props.userDetails.profile.notify ? "Yes" : "No")}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6 form-group">
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-6  "><label>Resume
                                                        :</label></div>
                                                    <span
                                                        className="col-12 col-sm-6 col-md-6  ">{!!this.props.userDetails.profile && (this.props.userDetails.profile.resume ? "Resume Uploaded" : "")}

                                                        {
                                                            !!this.props.userDetails.profile && !!this.props.userDetails.profile.resume &&
                                                            <a style={{marginLeft: "10px"}}
                                                               href={this.props.userDetails.profile.resume}
                                                               target="_blank">download</a>
                                                        }
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="col-12 col-sm-12 col-md-6 form-group mobile-profile">
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-6   "><label>Applied
                                                        Date
                                                        :</label></div>
                                                    <span
                                                        className="col-12 col-sm-6 col-md-6  ">{!!this.props.userDetails.profile && (moment(this.props.userDetails.profile.appliedDate * 1000)).format('Do MMM YYYY')}</span>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-12 form-group mobile-profile">
                                                    <div className="row">
                                                        <div className="col-12 col-sm-6 col-md-3 "><label>LinkedIn URL
                                                            :</label></div>
                                                        <div className="col-12 col-sm-6 col-md-6 ">
                                                        <span>{!!this.props.userDetails.profile &&

                                                        !!this.props.userDetails.profile.linkedin ?
                                                            <a href={this.props.userDetails.profile.linkedin}
                                                               target="_blank">{this.props.userDetails.profile.linkedin}</a> : ""
                                                        }
                                                            </span>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-12 form-group mobile-profile">
                                                    <div className="row">
                                                        <div className="col-12 col-sm-6 col-md-6 "><label>Github
                                                            URL
                                                            :</label>
                                                        </div>
                                                        <div className="col-12 col-sm-6 col-md-6 ">
                                                       <span>{!!this.props.userDetails.profile &&

                                                       !!this.props.userDetails.profile.github ?
                                                           <a href={this.props.userDetails.profile.github}
                                                              target="_blank">{this.props.userDetails.profile.github}</a> : ""
                                                       }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-12 form-group mobile-profile">
                                                    <div className="row">
                                                        <div className="col-12 col-sm-6 col-md-6 "><label>Other
                                                            URL
                                                            :</label>
                                                        </div>
                                                        <div className="col-12 col-sm-6 col-md-6 ">
                                                        <span>{!!this.props.userDetails.profile &&

                                                        !!this.props.userDetails.profile.otherLink ?
                                                            <a href={this.props.userDetails.profile.otherLink}
                                                               target="_blank">{this.props.userDetails.profile.otherLink}</a> : ""
                                                        }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                !!this.props.userDetails.resumeLink &&
                                                <GoogleDocsViewer
                                                    width={!!document.getElementById('basicinfo') && (document.getElementById('basicinfo').offsetWidth - 25)}
                                                    height="1000px"
                                                    fileUrl={this.props.userDetails.resumeLink}
                                                />
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-9 col-sm-12 col-md-12">
                                    <div className="user-profile-flex">
                                        <h3 className="">Applied Jobs </h3>
                                    </div>
                                    <div className="profile-wrap">
                                        <div className="activity-page">
                                            <table id="job-activity" className="admin-job-activity">
                                                <tr>
                                                    <th>Job Name</th>
                                                    <th>Team Name</th>
                                                    <th>Applied Date</th>
                                                </tr>
                                                {
                                                    !this.props.activitiesPageLoading && this.props.activities.length > 0 &&
                                                    (
                                                        this.props.activities.map((a, i) => (
                                                            <tr>
                                                                <td>{a.job_name}</td>
                                                                <td>{a.team_name}</td>
                                                                <td>{moment(a.applied_date * 1000).format('Do MMM YYYY')}</td>
                                                            </tr>
                                                        ))
                                                    )
                                                }


                                                {
                                                    !this.props.activitiesPageLoading && this.props.activities.length === 0 && this.props.activitiesMessage === "" &&
                                                    <tr>
                                                        <td colSpan={3} style={{textAlign: "center"}}>No applied jobs
                                                            found...
                                                        </td>
                                                    </tr>

                                                }

                                                {
                                                    !this.props.activitiesPageLoading && this.props.activitiesMessage !== "" &&
                                                    <tr>
                                                        <td colSpan={3}
                                                            style={{textAlign: "center"}}>{this.props.activitiesMessage}</td>
                                                    </tr>
                                                }
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const {activities, activitiesError, activitiesMessage, activitiesStatus, activitiesPageLoading} = state.activitiesReducer;
    const {pageLoading, getUserDetailsError, getUserDetailsMessage, getUserDetailsStatus, userDetails} = state.userReducer;
    console.log(userDetails, "userdetails");
    console.log(userDetails.profile, "get it....");
    return {
        activities, activitiesError, activitiesMessage, activitiesStatus, activitiesPageLoading,
        pageLoading, getUserDetailsError, getUserDetailsMessage, getUserDetailsStatus, userDetails, state
    }
}

export default withRouter(connect(mapStateToProps)(CandidateDetails))
