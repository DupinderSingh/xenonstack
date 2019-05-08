import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AdminOnPageNavigation from '../../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import {getQuestions, clearStatus, deleteQuestion, clearAll} from "../../../../../actions/dashboard/admin/pool/pool";
import createNotification from "../../../../../components/app/notification/notification";
import {NotificationContainer} from 'react-notifications';

class PoolDetails extends Component {
    componentWillMount() {
        this.props.dispatch(clearAll());
        this.props.dispatch(getQuestions(this.props.match.params.pool_id));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deleteQuestionMessage !== "") {
            console.log("image add api message", nextProps.addImageMessage, nextProps.error)
            if (nextProps.error) {
                createNotification('error', nextProps.deleteQuestionMessage);
                nextProps.dispatch(clearStatus());
            }
            else {
                createNotification('success', nextProps.deleteQuestionMessage);
                nextProps.dispatch(getQuestions(nextProps.match.params.pool_id));
            }
        }
    }

    editPoolQuestion(question) {
        // /dashboard/pool/:pool_id/details/questions/:question/edit
        this.props.history.push("/dashboard/pool/" + this.props.match.params.pool_id + "/details/questions/" + question + "/edit")
    }

    deletePoolQuestion(question) {
        this.props.dispatch(deleteQuestion(this.props.match.params.pool_id, question))
    }

    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard" childRoute="Pool Details"/>
                <button className="btn mar-b-3"
                    onClick={() => this.props.history.push("/dashboard/pool/" + this.props.match.params.pool_id + "/add/questions")}>Add
                    question
                </button>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="panel panel-default card-view custom-panel pool-panel">
                            <div className="panel-heading">
                                <h5 className="panel-title">Questions List</h5>
                                <div className="clearfix"></div>
                            </div>
                            <div className="panel-wrapper collapse in">
                                <div className="panel-body">
                                    <div className="table-wrap">
                                        <div className="">
                                            <table id="myTable1" className="table display  pb-30">
                                                <thead>
                                                <tr>
                                                    <th className="column1">S.No</th>
                                                    <th className="">Question</th>
                                                    <th className="column5">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    !this.props.pageLoading && this.props.questions.length > 0 &&
                                                    this.props.questions.map((d, i) => (
                                                        <tr>
                                                            <td>{i + 1}</td>
                                                            <td>{d.title}</td>
                                                            <td><span onClick={() => this.editPoolQuestion(d.id)} ><i class="material-icons">create</i></span>
                                                                <span onClick={() => this.deletePoolQuestion(d.id)} ><i class="material-icons">delete</i></span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                                {
                                                    !this.props.pageLoading && this.props.questions.length === 0 && this.props.message === "" &&
                                                    <tr>
                                                        <td colSpan={3} >
                                                            <div style={{textAlign: "center"}}>No data found..</div>
                                                        </td>
                                                    </tr>
                                                }
                                                {
                                                    !this.props.pageLoading && this.props.message !== "" &&
                                                    <tr>
                                                        <td colSpan={3} >
                                                            <div style={{textAlign: "center"}}>{this.props.message}</div>
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
                <NotificationContainer/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {questions, pageLoading, error, message, status, deleteQuestionMessage} = state.poolReducer;
    return {questions, pageLoading, error, message, status, deleteQuestionMessage}
}

export default withRouter(connect(mapStateToProps)(PoolDetails))
