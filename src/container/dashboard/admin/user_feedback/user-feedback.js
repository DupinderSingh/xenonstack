import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AdminOnPageNavigation from '../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import {
    archiveUnarchiveFeedback, clearAll, clearStatus,
    getUserFeedbacks
} from '../../../../actions/dashboard/admin/user_feedback/user-feedback';
import BarLoaderSpinner from "../../../../components/app/spinner/barloader";
import createNotification from "../../../../components/app/notification/notification";
import moment from 'moment';

class Feedback extends Component {
    componentWillMount() {
        this.props.dispatch(clearAll());
        if (this.props.match.params.type === "archived") {
            this.props.dispatch(getUserFeedbacks("archived"))
        }
        else {
            this.props.dispatch(getUserFeedbacks("unarchived"))
        }
    }

    archiveUnarchive(id) {
        let value = true;
        if (this.props.match.params.type === "unarchived") {
            value = false
        }
        this.props.dispatch(archiveUnarchiveFeedback(id, !value))
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.type !== nextProps.match.params.type) {
            nextProps.dispatch(getUserFeedbacks(nextProps.match.params.type));
        }
        if (nextProps.archUnarch_message !== "") {
            if (nextProps.archUnarch_error) {
                createNotification('error', nextProps.archUnarch_message);
                nextProps.dispatch(clearStatus());
            }
            else {
                createNotification('success', nextProps.archUnarch_message);
                let type = "archived";
                if (nextProps.match.params.type === "unarchived") {
                    type = "unarchived";
                }
                nextProps.dispatch(getUserFeedbacks(type))
            }
        }
    }

    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard"
                                       childRoute={this.props.match.params.type === "archived" ? "Feedback (archived)" : "Feedback (unarchived)"}/>
                <BarLoaderSpinner pageLoading={this.props.pageLoading}/>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="">
                            {
                                (!this.props.pageLoading && this.props.feedbacks.length > 0) &&

                                this.props.feedbacks.map((d, i) => (
                                    <div className="row">
                                        <div className="col-sm-12 col-md-10 col-lg-10">
                                            <div className="feedback-section">
                                                <div className="heading-div">
                                                    <h5 className="head">{d.Name}
                                                    </h5><span>{"(" + d.Email + ")"}</span>
                                                    <span className="feedback-dlt"><i
                                                        onClick={() => this.archiveUnarchive(d.id)}
                                                        className="material-icons"
                                                        onClick={() => this.archiveUnarchive(d.Id)}>{this.props.match.params.type === "archived" ? "unarchive" : "archive"}</i>
                                                        </span>
                                                </div>
                                                <p className="date-text">{(moment(d.Date * 1000)).fromNow()}</p>
                                                <div className="feedback-detail">
                                                    <p className="page-heading-desc">{d.Comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                            {
                                (!this.props.pageLoading && this.props.feedbacks.length === 0 && this.props.message === "") &&
                                <tr>
                                    <td colSpan={5} height="150px">
                                        <div style={{textAlign: "center"}}>No feedback found..</div>
                                    </td>
                                </tr>
                            }
                            {
                                this.props.message !== "" &&
                                <tr>
                                    <td colSpan={5} height="150px">
                                        <div
                                            style={{textAlign: "center"}}>{this.props.message}</div>
                                    </td>
                                </tr>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {
        archUnarch_PageLoading, archUnarch_error, archUnarch_message,
        pageLoading, feedbacks, error, message
    } = state.UserFeedbackReducer;
    return {
        archUnarch_PageLoading, archUnarch_error, archUnarch_message,
        pageLoading, feedbacks, error, message
    }
}

export default withRouter(connect(mapStateToProps)(Feedback))
