import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import BarLoaderSpinner from '../../../../../components/app/spinner/barloader';
import AdminOnPageNavigation from '../../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import {
    clearAll,
    clearStatus,
    deleteTeam,
    getTeams,
    selectedDeleteTeam
} from "../../../../../actions/dashboard/admin/team/team";
import createNotification from "../../../../../components/app/notification/notification";
import {NotificationContainer} from 'react-notifications';
import DeleteDialogBox from "../../../../../components/app/dialogBox/delete-dialog-box";

class ListTeam extends Component {
    componentWillMount() {
        this.props.dispatch(selectedDeleteTeam(""));
        this.props.dispatch(clearAll());
        this.props.dispatch(getTeams())
    }

    deleteTeam(e) {
        e.preventDefault();
        console.log(this.props, "props....");
        this.props.dispatch(deleteTeam(this.props.selected));
        if (!!document.getElementsByClassName("overlay-delete")[1]) {
            document.getElementsByClassName("overlay-delete")[1].style.display = "none";
        }
    }

    openDeleteTeamDialog(team) {
        this.props.dispatch(selectedDeleteTeam(team));
        console.log(document.getElementsByClassName("overlay-delete"), "overlayyy")
        document.getElementsByClassName("overlay-delete")[1].style.display = "block";
    }

    closeDeleteTEamDialog() {
        console.log(document.getElementsByClassName("overlay-delete"), "overllll")
        if (!!document.getElementsByClassName("overlay-delete")[1]) {
            document.getElementsByClassName("overlay-delete")[1].style.display = "none";
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log(nextProps.state.adminTeamReducer, "adminTeamReducer");
        if (nextProps.delete_team_message !== "") {
            console.log(nextProps.delete_team_message, "delete_team_message");
            if (nextProps.delete_team_error) {
                createNotification('error', nextProps.delete_team_message);
                nextProps.dispatch(clearStatus());
            } else {
                createNotification('success', nextProps.delete_team_message);
                nextProps.dispatch(getTeams())
            }
        }
    }

    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard" childRoute="View Team"/>
                <BarLoaderSpinner pageLoading={this.props.pageLoading}/>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="panel panel-default card-view custom-panel pool-panel">
                            <div className="panel-heading">
                                <h5 className="panel-title">All Teams</h5>
                                <div className="clearfix"></div>
                            </div>
                            <div className="panel-wrapper collapse in">
                                <div className="panel-body">
                                    <div className="table-wrap">
                                        <div className="table-responsive">
                                            <table id="myTable1" className="table display pb-30">
                                                <thead>
                                                <tr>
                                                    <th className="column1">S.No</th>
                                                    <th className="">Team Name</th>
                                                    <th className="">Team Description</th>
                                                    <th className="">Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    (!this.props.pageLoading && this.props.get_teams.length > 0) &&
                                                    this.props.get_teams.map((t, i) => (
                                                        <tr>
                                                            <td>{i + 1}</td>
                                                            <td>{t.Name}</td>
                                                            <td>{t.Description}</td>
                                                            <td>
                                                                <span
                                                                    onClick={() => this.props.history.push("/dashboard/team/" + t.Id + "/edit")}><i
                                                                    class="material-icons">create</i></span>
                                                                <span onClick={() => this.openDeleteTeamDialog(t.Id)}><i
                                                                    class="material-icons">delete</i></span>
                                                            </td>


                                                        </tr>
                                                    ))
                                                }
                                                {
                                                    (!this.props.pageLoading && this.props.get_teams.length === 0 && this.props.get_teams_message === "") &&
                                                    <tr>
                                                        <td colSpan={3}>
                                                            <div className="table-body-loader">
                                                                <div className="flex-center">
                                                                    <div className="server-error-response">
                                                                        No teams found.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                }
                                                {
                                                    (!this.props.pageLoading && this.props.get_teams_message !== "") &&
                                                    <tr>
                                                        <td colSpan={3}>
                                                            <div className="table-body-loader">
                                                                <div className="flex-center">
                                                                    <div className="server-error-response">
                                                                        {this.props.get_teams_message}
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
                    formName="Delete Team"
                    submitForm={this.deleteTeam}
                    operation="Delete Team"
                    keyword={"Delete"}
                    closeForm={this.closeDeleteTEamDialog}
                    pageLoading={this.props.pageLoading}
                    selected={this.props.deleteTeam}
                    name={this.props.deleteTeam}
                />
                <NotificationContainer/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {
        deleteTeam,
        pageLoading, get_teams_status, get_teams_error, get_teams_message, get_teams,
        delete_team_error, delete_team_message, delete_team_status
    } = state.adminTeamReducer;
    return {
        deleteTeam,
        pageLoading, get_teams_status, get_teams_error, get_teams_message, get_teams,
        delete_team_error, delete_team_message, delete_team_status, state
    }
};

export default withRouter(connect(mapStateToProps)(ListTeam))
