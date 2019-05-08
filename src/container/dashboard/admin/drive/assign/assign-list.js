import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AdminOnPageNavigation from '../../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import {
    clear,
    clearAll,
    deleteUser,
    getUserFailure,
    getUserRequest,
    getUserSuccess, selectedDeleteUser
} from '../../../../../actions/dashboard/admin/drive/drive';
import createNotification from "../../../../../components/app/notification/notification";
import BarLoaderSpinner from "../../../../../components/app/spinner/barloader";
import DeleteDialogBox from "../../../../../components/app/dialogBox/delete-dialog-box";

let ws = null, props = null;

class ViewUser extends Component {
    componentWillMount() {
        this.props.dispatch(clearAll());
        props = this.props
    }

    componentDidMount() {
        const serverApi = "wss://career-admin.xenon.team/api/drive-portal/v1/ws/drives/" + this.props.match.params.drive + "/" + localStorage.getItem("token");
        ws = new WebSocket(serverApi);
        this.props.dispatch(getUserRequest());

        ws.onerror = () => {
            console.log("error");
            this.props.dispatch(getUserFailure({
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
            this.props.dispatch(getUserSuccess({
                status: 200,
                data: {
                    error: false,
                    message: "",
                    users: response
                }
            }));
            console.log(response, "response...")
        };
        ws.onclose = () => {
            // loading false
            this.props.dispatch(getUserFailure({
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

    componentWillReceiveProps(nextProps) {
        props = nextProps;
        if (nextProps.delete_user_message !== "") {
            if (nextProps.delete_user_error) {
                createNotification('error', nextProps.delete_user_message);
                nextProps.dispatch(clear());
            } else {
                createNotification('success', nextProps.delete_user_message);
                nextProps.dispatch(clear());
            }
        }
    }

    deleteUser(e) {
        e.preventDefault();
        this.props.dispatch(deleteUser(props.match.params.drive, this.props.selected, this.props.selected));
        if (!!document.getElementsByClassName("overlay-delete")[1]) {
            document.getElementsByClassName("overlay-delete")[1].style.display = "none";
        }
    }

    openDeleteUserDialog(uid) {
        this.props.dispatch(selectedDeleteUser(uid));
        console.log(document.getElementsByClassName("overlay-delete"), "overlayyy");
        document.getElementsByClassName("overlay-delete")[1].style.display = "block";
    }

    closeDeleteUserDialog() {
        console.log(document.getElementsByClassName("overlay-delete"), "overllll");
        if (!!document.getElementsByClassName("overlay-delete")[1]) {
            document.getElementsByClassName("overlay-delete")[1].style.display = "none";
        }
    }

    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard" childRoute="View User"/>
                <div className="form-group ">
                    <button className="btn"
                            onClick={() => this.props.history.push("/dashboard/drive/" + this.props.match.params.drive + "/assign")}>Assign
                    </button>
                </div>
                <BarLoaderSpinner pageLoading={this.props.getUserPageLoading}/>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                        <div className="panel panel-default card-view custom-panel pool-panel">
                            <div className="panel-heading">
                                <h5 className="panel-title">All User</h5>
                            </div>
                            <div className="panel-wrapper collapse in">
                                <div className="panel-body">
                                    <div className="table-wrap">
                                        <div className="table-responsive">
                                            <table id="myTable1" className="table display table-hover pb-30">
                                                <thead>
                                                <tr>
                                                    <th className="">S.No</th>
                                                    <th className="">User</th>
                                                    <th className="">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    !this.props.getUserPageLoading && this.props.users.length > 0 &&
                                                    this.props.users.map((d, i) => (
                                                        <tr>
                                                            <td className="column1">{i + 1}</td>
                                                            <td onClick={() => this.props.history.push("/dashboard/"+this.props.match.params.drive+"/users/"+d.email+"/score")}>{d.email}</td>
                                                            <td>
                                                                <span onClick={() => this.openDeleteUserDialog(d.email)}><i
                                                                    className="material-icons">delete</i></span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                                {
                                                    (!this.props.getUserPageLoading && this.props.users.length === 0 && this.props.getUser_message === "") &&
                                                    <tr>
                                                        <td colSpan={3}>
                                                            <div className="table-body-loader">
                                                                <div className="flex-center">
                                                                    <div className="server-error-response">
                                                                        No user found.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                }
                                                {
                                                    this.props.getUser_message !== "" &&
                                                    <tr>
                                                        <td colSpan={3}>
                                                            <div className="table-body-loader">
                                                                <div className="flex-center">
                                                                    <div className="server-error-response">
                                                                        {this.props.getUser_message}
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
                    formName="Delete Candidate"
                    submitForm={this.deleteUser}
                    operation="Delete Candidate"
                    keyword={"Delete"}
                    closeForm={this.closeDeleteUserDialog}
                    pageLoading={this.props.delete_user_pageLoading}
                    selected={this.props.deleteUser}
                    name={this.props.deleteUser}
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const {
        deleteUser,
        users,
        getUserPageLoading, getUser_status, getUser_error, getUser_message,
        delete_user_pageLoading, delete_user_error, delete_user_message, delete_user_status,
    } = state.adminDriveReducer;
    return {
        deleteUser,
        users,
        getUserPageLoading, getUser_status, getUser_error, getUser_message,
        delete_user_pageLoading, delete_user_error, delete_user_message, delete_user_status,
    }
}

export default withRouter(connect(mapStateToProps)(ViewUser))
