import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearAll, getUserFeedbacks} from '../../../../actions/dashboard/admin/user_feedback/user-feedback';
import moment from "moment/moment";

class Feedbacks extends Component {
    componentWillMount() {
        this.props.dispatch(clearAll());
        this.props.dispatch(getUserFeedbacks("unarchived"))
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                <div className="panel panel-warning card-view custom-panel pool-panel ">
                    <div className="panel-heading">
                        <h5 className="panel-title">Latest Feedback</h5>
                        <div>
                            <a className="pull-left inline-block mr-15 txt-light" data-toggle="collapse"
                               href="#collapse_2" aria-expanded="true">
                                <i className="zmdi zmdi-chevron-down"></i> <i
                                className="zmdi zmdi-chevron-up"></i>
                            </a>
                        </div>
                    </div>
                    <div id="collapse_2" className="panel-wrapper collapse in dash-feedback-panel">
                        <div className="panel-body">
                            <div className="table-wrap fix-height">
                                <div className="table-responsive">
                                    <table id="dash-feedback-table" className="table display table-hover pb-30">
                                        <thead>
                                        <tr>
                                            <th className="column3">Name</th>
                                            <th className="">Comment</th>
                                            <th className="column2">Date</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            (!this.props.pageLoading && this.props.feedbacks.length > 0) &&

                                            this.props.feedbacks.slice(0, 5).map((d, i) => (
                                                <tr>
                                                    <td>{d.Name}</td>
                                                    <td>{d.Comment}</td>
                                                    <td>{(moment(d.Date * 1000)).fromNow()}</td>
                                                </tr>
                                            ))
                                        }
                                        {
                                            (!this.props.pageLoading && this.props.feedbacks.length === 0 && this.props.message === "") &&
                                            <tr>
                                                <td colSpan={3} height="150px">
                                                    <div style={{textAlign: "center"}}>No feedback found..</div>
                                                </td>
                                            </tr>
                                        }
                                        {
                                            this.props.message !== "" &&
                                            <tr>
                                                <td colSpan={3} height="150px">
                                                    <div
                                                        style={{textAlign: "center"}}>{this.props.message}</div>
                                                </td>
                                            </tr>
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="index-btn"><Link to={"/dashboard/feedback/unarchived"} className="table-inside-btn right ">View All
                                Feedback</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {
        archUnarch_PageLoading, archUnarch_error, archUnarch_message,
        pageLoading, feedbacks, error, message
    } = state.UserFeedbackReducer;
    return {
        archUnarch_PageLoading, archUnarch_error, archUnarch_message,
        pageLoading, feedbacks, error, message
    }
}

export default withRouter(connect(mapStateToProps)(Feedbacks))
