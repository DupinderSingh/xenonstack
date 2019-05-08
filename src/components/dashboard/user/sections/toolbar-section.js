import React, {Component} from 'react';
import {clearApiErrorMessage, logout, logoutAccount} from "../../../../actions/account/login-actions";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import DeleteDialogBox from "../../../app/dialogBox/delete-dialog-box";

class Menubar extends Component {
    componentWillMount() {
        this.props.dispatch(clearApiErrorMessage())
    }

    openSignoutAccountDialog() {
        document.getElementsByClassName("overlay-delete")[0].style.display = "block";
    }

    closeSignoutAccountDialog() {
        console.log(document.getElementsByClassName("overlay-delete"), "overllll")
        if (!!document.getElementsByClassName("overlay-delete")[0]) {
            document.getElementsByClassName("overlay-delete")[0].style.display = "none";
        }
    }

    signout(e) {
        e.preventDefault();
        this.props.dispatch(logoutAccount());
        if (!!document.getElementsByClassName("overlay-delete")[0]) {
            document.getElementsByClassName("overlay-delete")[0].style.display = "none";
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.logoutMe === true) {
            nextProps.dispatch(logout());
        }
    }

    render() {
        return (
            <div>
                <div className="dash-heading">
                    <h3>Welcome {this.props.userName}</h3>
                    <div style={{cursor: "pointer"}} onClick={this.openSignoutAccountDialog.bind(this)}><i className="material-icons" style={{cursor: "pointer"}} >logout</i> <span style={{fontSize: "20px"}}>Logout </span>
                    </div>
                </div>
                <DeleteDialogBox
                    formName="Logout-account"
                    submitForm={this.signout}
                    operation="Logout Account"
                    keyword="Logout"
                    closeForm={this.closeSignoutAccountDialog}
                    pageLoading={false}
                    selected=""
                    name=""
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {logoutMe, userName} = state.LoginReducer;
    return {logoutMe, userName, state};

}

export default withRouter(connect(mapStateToProps)(Menubar))
