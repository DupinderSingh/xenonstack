import React, {Component} from 'react';
import {
    clearAll,
    getUserScoreFailure,
    getUserScoreRequest,
    getUserScoreSuccess,
} from '../../../../actions/dashboard/admin/drive/drive';
import AdminOnPageNavigation from '../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import BarLoaderSpinner from "../../../../components/app/spinner/barloader";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

let ws = null;

class UserScoreList extends Component {
    componentWillMount() {
        this.props.dispatch(clearAll())
    }

    componentDidMount() {
        const serverApi = "wss://career-admin.xenon.team/api/drive-portal/v1/ws/drive/" + this.props.match.params.drive + "/" + this.props.match.params.email + "/" + localStorage.getItem("token");
        ws = new WebSocket(serverApi);
        this.props.dispatch(getUserScoreRequest());

        ws.onerror = () => {
            console.log("error");
            this.props.dispatch(getUserScoreFailure({
                status: 500,
                data: {
                    message: "Internal Server Error",
                    error: true
                }
            }))
            // this.props.dispatch(homeResponseError("Server error.", 500))
        };
        ws.onopen = function () {
            console.log("open");
        };
        ws.onmessage = (e) => {
            // loading false
            console.log("message");
            const response = JSON.parse(e.data);
            console.log(response, "on message.......");
            this.props.dispatch(getUserScoreSuccess({
                status: 200,
                data: {
                    error: false,
                    message: "",
                    userScore: response
                }
            }));
            console.log(response, "response...")
        };
        ws.onclose = () => {
            // loading false
            this.props.dispatch(getUserScoreFailure({
                status: 500,
                data: {
                    message: "Internal Server Error",
                    error: true
                }
            }));
            console.log("close")
            // this.props.dispatch(homeResponseError("Server error.", 500))
        };
    }

    componentWillUnmount() {
        console.log(ws, "ws status unmount....");
        if (ws !== null && ws.onclose !== null) {
            ws.close();
        }
    }


    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard" childRoute="User Scoreboard"/>
                <BarLoaderSpinner pageLoading={this.props.getUserScorePageLoading}/>
                <div className="row">
                    {
                        !this.props.getUserScorePageLoading &&
                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                            <div
                                className="panel panel-warning card-view custom-panel pool-panel scoreboard">
                                <div className="panel-heading"><span>User Score Details:</span></div>
                                <div className="panel-wrapper collapse in">
                                    <div className="panel-body test-panel-body">
                                        <div className="user-score-div">
                                            <ul>
                                                <li>Attempted :<span>{this.props.userScore.result.attempted}</span></li>
                                                <li>Correct :<span>{this.props.userScore.result.correct}</span></li>
                                                <li>Email :<span>{this.props.userScore.result.email}</span></li>
                                                <li>Time Taken :<span>{this.props.userScore.result.time_taken}</span>
                                                </li>
                                                <li>Total :<span>{this.props.userScore.result.total}</span></li>
                                                <li>Wrong :<span>{this.props.userScore.result.wrong}</span></li>
                                            </ul>
                                            <div className="progress-status">
                                                {this.props.userScore.pool_result}
                                            </div>
                                        </div>
                                        {/*<div className="bottom-body pt-15">*/}
                                        {/*<span>Attempted :</span>*/}
                                        {/*<span className="txt-dark">{this.props.userScore.result.attempted}</span>*/}

                                        {/*<span style={{marginLeft: "5px"}}>Correct :</span>*/}
                                        {/*<span className="txt-dark">{this.props.userScore.result.correct}</span>*/}

                                        {/*<span style={{marginLeft: "5px"}}>Email :</span>*/}
                                        {/*<span className="txt-dark">{this.props.userScore.result.email}</span>*/}

                                        {/*<span style={{marginLeft: "5px"}}>Time Taken :</span>*/}
                                        {/*<span className="txt-dark">{this.props.userScore.result.time_taken}</span>*/}

                                        {/*<span style={{marginLeft: "5px"}}>Total :</span>*/}
                                        {/*<span className="txt-dark">{this.props.userScore.result.total}</span>*/}

                                        {/*<span style={{marginLeft: "5px"}}>Wrong :</span>*/}
                                        {/*<span className="txt-dark">{this.props.userScore.result.wrong}</span>*/}

                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const {
        userScore,
        getUserScorePageLoading, getUserScore_status, getUserScore_error, getUserScore_message
    } = state.adminDriveReducer;
    return {
        userScore,
        getUserScorePageLoading, getUserScore_status, getUserScore_error, getUserScore_message
    }
};

export default withRouter(connect(mapStateToProps)(UserScoreList))
