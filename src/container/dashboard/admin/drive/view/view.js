import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AdminOnPageNavigation from '../../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import {clearAll, clear, deleteDrive, getDrive, selectedDeleteDrive} from '../../../../../actions/dashboard/admin/drive/drive';
import createNotification from "../../../../../components/app/notification/notification";
import DeleteDialogBox from "../../../../../components/app/dialogBox/delete-dialog-box";
import moment from "moment";

class ViewDrive extends Component {
    componentWillMount() {
        this.props.dispatch(clearAll());
        this.props.dispatch(getDrive())
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.delete_drive_message !== "") {
            if (nextProps.delete_drive_error) {
                createNotification('error', nextProps.delete_drive_message);
                nextProps.dispatch(clear());
            }
            else {
                createNotification('success', nextProps.delete_drive_message);
                nextProps.dispatch(getDrive())
            }
        }
    }

    deleteDrive(e) {
        e.preventDefault();
        this.props.dispatch(deleteDrive(this.props.selected)); //team , job
        if (!!document.getElementsByClassName("overlay-delete")[1]) {
            document.getElementsByClassName("overlay-delete")[1].style.display = "none";
        }
    }

    openDeleteDriveDialog(drive_id, drive_name) {
        this.props.dispatch(selectedDeleteDrive({drive_id, drive_name}));
        console.log(document.getElementsByClassName("overlay-delete"), "overlayyy");
        document.getElementsByClassName("overlay-delete")[1].style.display = "block";
    }

    closeDeleteDriveDialog() {
        console.log(document.getElementsByClassName("overlay-delete"), "overllll");
        if (!!document.getElementsByClassName("overlay-delete")[1]) {
            document.getElementsByClassName("overlay-delete")[1].style.display = "none";
        }
    }

    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard" childRoute="View Drive"/>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12">
                        <div className="panel panel-default card-view custom-panel pool-panel">
                            <div className="panel-heading">
                                <h5 className="panel-title">All Drives</h5>
                            </div>
                            <div className="panel-wrapper collapse in">
                                <div className="panel-body">
                                    <div className="table-wrap">
                                        <div className="table-responsive">
                                            <table id="myTable1" className="table display table-hover pb-30">
                                                <thead>
                                                <tr>
                                                    <th className="">S.No</th>
                                                    <th className="">Drive Type</th>
                                                    <th className="">Drive Name</th>
                                                    <th className="">Publish Date</th>
                                                    <th className="">Total students</th>
                                                    <th className="">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    !this.props.getDrivePageLoading && this.props.drives.length > 0 &&
                                                    this.props.drives.map((d, i) => (
                                                        <tr>
                                                            <td onClick={() => this.props.history.push("/dashboard/drive/"+d.id+"/assign/list")} className="column1">{i + 1}</td>
                                                            <td onClick={() => this.props.history.push("/dashboard/drive/"+d.id+"/assign/list")}>{d.type}</td>
                                                            <td onClick={() => this.props.history.push("/dashboard/drive/"+d.id+"/assign/list")}>{d.name}</td>
                                                            <td onClick={() => this.props.history.push("/dashboard/drive/"+d.id+"/assign/list")}>{moment(d.start * 1000).format('Do MMM YYYY')} - {moment(d.end * 1000).format('Do MMM YYYY')}</td>
                                                            <td onClick={() => this.props.history.push("/dashboard/drive/"+d.id+"/assign/list")}>{d.users}</td>
                                                            <td>
                                                              <span onClick={() => this.props.history.push("/dashboard/drive/"+d.id+"/edit")}><i class="material-icons">create</i></span>
                                                              <span onClick={() => this.openDeleteDriveDialog(d.id, d.name)}><i class="material-icons">delete</i></span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                                {
                                                    (!this.props.getDrivePageLoading && this.props.drives.length === 0 && this.props.getDrive_message === "") &&
                                                    <tr>
                                                        <td colSpan={6}>
                                                            <div className="table-body-loader">
                                                                <div className="flex-center">
                                                                    <div className="server-error-response">
                                                                        No drive found.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                }
                                                {
                                                    this.props.getDrive_message !== "" &&
                                                    <tr>
                                                        <td colSpan={6}>
                                                            <div className="table-body-loader">
                                                                <div className="flex-center">
                                                                    <div className="server-error-response">
                                                                        {this.props.getDrive_message}
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
                    formName="Delete Job"
                    submitForm={this.deleteDrive}
                    operation="Delete Job"
                    keyword={"Delete"}
                    closeForm={this.closeDeleteDriveDialog}
                    pageLoading={this.props.delete_drive_pageLoading}
                    selected={this.props.deleteDrive.drive_id}
                    name={this.props.deleteDrive.drive_name}
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const {
        deleteDrive,
        drives,
        getDrivePageLoading, getDrive_status, getDrive_error, getDrive_message,
        delete_drive_pageLoading, delete_drive_error, delete_drive_message, delete_drive_status,
    } = state.adminDriveReducer;
    return {
        deleteDrive,
        drives,
        getDrivePageLoading, getDrive_status, getDrive_error, getDrive_message,
        delete_drive_pageLoading, delete_drive_error, delete_drive_message, delete_drive_status,
    }
};

export default withRouter(connect(mapStateToProps)(ViewDrive))
