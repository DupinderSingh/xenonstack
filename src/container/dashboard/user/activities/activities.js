import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import BarLoaderSpinner from "../../../../components/app/spinner/barloader";
import {getActivities, clearAll} from "../../../../actions/dashboard/user/activities/activities";
import moment from "moment";

class Activities extends Component {
    componentWillMount() {
        document.title = "My Activities | Xenonstack Hiring Portal";
        this.props.dispatch(clearAll());
        this.props.dispatch(getActivities("/v1/apply"))
    }

    render() {
        return (
            <section className="">
                <BarLoaderSpinner pageLoading={this.props.activitiesPageLoading}/>
                <div className="container">
                    <div className="content-detail">
                        <div className="text-center">
                            <h1 className="main-heading-h1">My Job Activities</h1>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 offset-md-1 col-md-10">
                                <div className="activity-page">
                                    <table id="job-activity">
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
                                                <td colSpan={3} style={{textAlign: "center"}}>No activities found...
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
            </section>
        )
    }
}


function mapStateToProps(state) {
    const {activities, activitiesError, activitiesMessage, activitiesStatus, activitiesPageLoading} = state.activitiesReducer;
    return {activities, activitiesError, activitiesMessage, activitiesStatus, activitiesPageLoading}
}

export default withRouter(connect(mapStateToProps)(Activities))