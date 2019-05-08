/*eslint-disable*/
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearAll, driveList} from '../../../../actions/dashboard/user/drives/drives'
import BarLoaderSpinner from "../../../../components/app/spinner/barloader";

class DriveDetails extends Component {
    componentWillMount() {
        document.title = "Drive Details | Xenonstack Hiring Portal";
        this.props.dispatch(clearAll());
        this.props.dispatch(driveList())
    }

    render() {
        return (
            <section className="">
                <BarLoaderSpinner pageLoading={this.props.pageLoading}/>
                <div className="container">
                    <div className="content-detail">
                        <div className="text-center">
                            <h1 className="main-heading-h1">Drive Detail</h1>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12">
                                <div className="dash-status">
                                    <div className="current-status">
                                        <h2>Upcoming Tests</h2>
                                        {
                                            (!this.props.pageLoading && this.props.drives.length > 0) &&
                                            this.props.drives.map((d, i) => (
                                                <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-6">
                                                        <div className="status-div upcoming">
                                                            <h3>{d.name.charAt(0).toUpperCase() + d.name.slice(1)} Test</h3>
                                                            <p>Online Technical test contain MCQ type questions
                                                                including
                                                                reasoning, English and Quantatives.</p>
                                                            <div>
                                                                <a href={"https://career-test.xenon.team?token=" + localStorage.getItem("token") + "&&drive_id=" + d.id + "&&test_id=" + d.test_id}
                                                                   target="_blank" className="btn mar-t-2">Start Test</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                        {
                                            !this.props.pageLoading && this.props.drives.length === 0 && this.props.message === "" &&
                                            <div className="no-activity text-center">
                                                <div className="">
                                                    <figure><img src={require("../../../../static/images/upcoming.svg")}
                                                                 alt={"No Tet"}/></figure>
                                                </div>
                                                <h3>No Upcoming Test</h3>
                                                <p>You have not apply for any job yet or may be your job completed</p>
                                            </div>
                                        }

                                        {
                                            !this.props.pageLoading && this.props.message !== "" &&
                                            <div className="no-activity text-center">
                                                <div className="">
                                                    <figure><img src={require("../../../../static/images/upcoming.svg")}
                                                                 alt={"No Tet"}/></figure>
                                                </div>
                                                <h3>Something went wrong...</h3>
                                                <p>{this.props.message}</p>
                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12">
                                <div className="dash-status">
                                    <div className="current-status">
                                        <h2>Completed Tests</h2>
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-md-6">
                                                <div className="status-div upcoming">
                                                    <h3>Online Technical Test</h3>
                                                    <p>Online Technical test contain MCQ type questions including
                                                        reasoning, English and Quantatives.</p>
                                                    <div className="right"><p
                                                        style={{
                                                            color: "#1AAA55",
                                                            fontSize: "16px",
                                                            margin: "0"
                                                        }}>completed on 22 jan
                                                        2019</p></div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6">
                                                <div className="status-div upcoming">
                                                    <h3>Online Technical Test</h3>
                                                    <p>Online Technical test contain MCQ type questions including
                                                        reasoning, English and Quantatives.</p>
                                                    <div className="right"><p
                                                        style={{
                                                            color: "#1AAA55",
                                                            fontSize: "16px",
                                                            margin: "0"
                                                        }}>completed on 22 jan
                                                        2019</p></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
    const {drives, error, message, pageLoading} = state.userDrivesReducer;
    return {drives, error, message, pageLoading}
}

export default withRouter(connect(mapStateToProps)(DriveDetails))