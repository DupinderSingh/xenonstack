import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import BarLoaderSpinner from '../../../../../components/app/spinner/barloader';
import AdminOnPageNavigation from '../../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import {clearAll, getTest, deleteTest, clearStatus, selectedDeleteTest} from "../../../../../actions/dashboard/admin/test/test";
import createNotification from "../../../../../components/app/notification/notification";
import {NotificationContainer} from 'react-notifications';
import moment from 'moment';
import DeleteDialogBox from "../../../../../components/app/dialogBox/delete-dialog-box";

class ListTest extends Component {
    componentWillMount() {
        this.props.dispatch(clearAll());
        this.props.dispatch(getTest())
    }

    deleteTest(e) {
        e.preventDefault();
        this.props.dispatch(deleteTest(this.props.selected));
        if (!!document.getElementsByClassName("overlay-delete")[1]) {
            document.getElementsByClassName("overlay-delete")[1].style.display = "none";
        }
    }

    openDeleteTestDialog(test_id, test_name) {
        this.props.dispatch(selectedDeleteTest({test_id, test_name}));
        console.log(document.getElementsByClassName("overlay-delete"), "overlayyy");
        document.getElementsByClassName("overlay-delete")[1].style.display = "block";
    }

    closeDeleteTestDialog() {
        console.log(document.getElementsByClassName("overlay-delete"), "overllll");
        if (!!document.getElementsByClassName("overlay-delete")[1]) {
            document.getElementsByClassName("overlay-delete")[1].style.display = "none";
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.delete_test_message !== "") {
            console.log(nextProps.delete_test_message, "delete_team_message")
            if (nextProps.delete_test_error) {
                createNotification('error', nextProps.delete_test_message);
                nextProps.dispatch(clearStatus());
            }
            else {
                createNotification('success', nextProps.delete_test_message);
                nextProps.dispatch(getTest())
            }
        }
    }

    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard" childRoute="Test List"/>
                <BarLoaderSpinner pageLoading={this.props.getTestPageLoading}/>
                <div className="row">
                    <div className="col-sm-12">
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
                                                    <th className="">Test Name</th>
                                                    <th className="">Duration</th>
                                                    <th className="">Total Questions</th>
                                                    <th className="">Test Created</th>
                                                    <th className=""> Pools</th>
                                                    <th className="">Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    (!this.props.getTestPageLoading && this.props.tests.length > 0) &&
                                                    this.props.tests.map((t, i) => (
                                                        <tr>
                                                            <td>{i + 1}</td>
                                                            <td>{t.name}</td>
                                                            <td>{t.duration}</td>
                                                            <td>{t.total}</td>
                                                            <td>{moment(t.date * 1000).format('Do MMM YYYY')}</td>
                                                            <td>{t.pools.map((d, i) => <span>{t.pools.length -1 === i ? d : d+", "}</span>)}
                                                            </td>
                                                            <td>
                                                                <span onClick={() => this.openDeleteTestDialog(t.id, t.name)}><i class="material-icons">delete</i></span>
                                                                <span  onClick={() => this.props.history.push("/dashboard/test/"+t.id+"/edit")}><i class="material-icons">create</i>
                                                                </span>
                                                            </td>


                                                        </tr>
                                                    ))
                                                }
                                                {
                                                    (!this.props.getTestPageLoading && this.props.tests.length === 0 && this.props.getTest_message === "") &&
                                                    <tr>
                                                        <td colSpan={7}>
                                                            <div className="table-body-loader">
                                                                <div className="flex-center">
                                                                    <div className="server-error-response">
                                                                        No test found.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                }
                                                {
                                                    (!this.props.getTestPageLoading && this.props.getTest_message !== "") &&
                                                    <tr>
                                                        <td colSpan={7}>
                                                            <div className="table-body-loader">
                                                                <div className="flex-center">
                                                                    <div className="server-error-response">
                                                                        {this.props.getTest_message}
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
                    submitForm={this.deleteTest}
                    operation="Delete Job"
                    keyword={"Delete"}
                    closeForm={this.closeDeleteTestDialog}
                    pageLoading={this.props.delete_test_pageLoading}
                    selected={this.props.deleteTest.test_id}
                    name={this.props.deleteTest.test_name}
                />
                <NotificationContainer/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {
        deleteTest,
        getTestPageLoading, getTest_status, getTest_error, getTest_message, tests,
        delete_test_pageLoading, delete_test_error, delete_test_message, delete_test_status
    } = state.adminTestReducer;
    console.log(deleteTest, "deleteTest")
    return {
        deleteTest,
        getTestPageLoading, getTest_status, getTest_error, getTest_message, tests,
        delete_test_pageLoading, delete_test_error, delete_test_message, delete_test_status
    }
};

export default withRouter(connect(mapStateToProps)(ListTest))
