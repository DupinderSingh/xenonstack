import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    clearAll,
    clearStatus,
    getCollege,
    deleteCollege,
    getCollegeDetails,
    selectedDeleteCollege
} from '../../../../../actions/dashboard/admin/college/college';
import createNotification from "../../../../../components/app/notification/notification";
import DeleteDialogBox from "../../../../../components/app/dialogBox/delete-dialog-box";

class ListCollege extends Component {
    componentWillMount() {
        this.props.dispatch(getCollege())
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.delete_college_message !== "") {
            if (nextProps.delete_college_error) {
                createNotification('error', nextProps.delete_college_message);
                nextProps.dispatch(clearStatus());
            } else {
                createNotification('success', nextProps.delete_college_message);
                this.props.dispatch(clearAll());
                nextProps.dispatch(getCollege());
                this.props.history.push("/dashboard/college/add")
            }
        }
    }
    deleteCollege(e) {
        e.preventDefault();
        console.log(this.props, "props....");
        this.props.dispatch(deleteCollege(this.props.selected));
        if (!!document.getElementsByClassName("overlay-delete")[1]) {
            document.getElementsByClassName("overlay-delete")[1].style.display = "none";
        }
    }

    openDeleteCollegeDialog(id, name) {
        this.props.dispatch(selectedDeleteCollege({id, name}));
        console.log(document.getElementsByClassName("overlay-delete"), "overlayyy")
        document.getElementsByClassName("overlay-delete")[1].style.display = "block";
    }

    closeDeleteCollegeDialog() {
        console.log(document.getElementsByClassName("overlay-delete"), "overllll")
        if (!!document.getElementsByClassName("overlay-delete")[1]) {
            document.getElementsByClassName("overlay-delete")[1].style.display = "none";
        }
    }




    editCollege(id) {
        this.props.dispatch(getCollegeDetails(id));
        this.props.history.push("/dashboard/college/" + id + "/edit");
    }

    render() {
        return (
            <div className="panel-wrapper collapse in">
                <div className="panel-body">
                    <div className="table-wrap">
                        <div className="table-responsive">
                            <table id="myTable1" className="table display table-hover pb-30">
                                <thead>
                                <tr>
                                    <th className="column1">S.No</th>
                                    <th className="">Name</th>
                                    <th className="">Location</th>
                                    <th className="">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    (!this.props.getCollegePageLoading && this.props.colleges.length > 0) &&
                                    this.props.colleges.map((c, i) => (
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{c.name}</td>
                                            <td>{c.location}</td>
                                            <td>
                                                <span onClick={() => this.editCollege(c.id)}><i
                                                    class="material-icons">create</i></span>
                                                    <span onClick={() => this.openDeleteCollegeDialog(c.id, c.name)}><i
                                                                                                        class="material-icons">delete</i></span>
                                            </td>
                                        </tr>
                                    ))
                                }
                                {
                                    (!this.props.getCollegePageLoading && this.props.colleges.length === 0 && this.props.getCollege_message === "") &&
                                    <tr>
                                        <td colSpan={7}>
                                            <div className="table-body-loader">
                                                <div className="flex-center">
                                                    <div className="server-error-response">
                                                        No college found.
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                }
                                {
                                    (!this.props.getCollegePageLoading && this.props.getCollege_message !== "") &&
                                    <tr>
                                        <td colSpan={7}>
                                            <div className="table-body-loader">
                                                <div className="flex-center">
                                                    <div className="server-error-response">
                                                        {this.props.getCollege_message}
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
                <DeleteDialogBox
                    formName="Delete College"
                    submitForm={this.deleteCollege}
                    operation="Delete College"
                    keyword={"Delete"}
                    closeForm={this.closeDeleteCollegeDialog}
                    pageLoading={this.props.pageLoading}
                    selected={this.props.deleteCollege.id}
                    name={this.props.deleteCollege.name}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {
        deleteCollege,
        getCollegePageLoading, getCollege_status, getCollege_error, getCollege_message, colleges,
        delete_college_pageLoading, delete_college_error, delete_college_message, delete_college_status
    } = state.adminCollegeReducer;
    return {
        deleteCollege,
        getCollegePageLoading, getCollege_status, getCollege_error, getCollege_message, colleges,
        delete_college_pageLoading, delete_college_error, delete_college_message, delete_college_status
    }
}

export default withRouter(connect(mapStateToProps)(ListCollege))
