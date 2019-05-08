import React, {Component} from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearAll, getAllUsers} from '../../../../actions/dashboard/admin/user/user';

class Candidates extends Component {
    componentWillMount() {
        this.props.dispatch(clearAll());
        this.props.dispatch(getAllUsers(1, "", "", ""));
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
                <div className="panel panel-default card-view custom-panel pool-panel">
                    <div className="panel-heading">
                        <h5 className="panel-title">Latest Candidates</h5>
                        <div>
                            <a className="pull-left inline-block mr-15 txt-light" data-toggle="collapse"
                               href="#collapse_1" aria-expanded="true">
                                <i className="zmdi zmdi-chevron-down"></i> <i
                                className="zmdi zmdi-chevron-up"></i>
                            </a>
                        </div>
                    </div>
                    <div id="collapse_1" className="panel-wrapper collapse in">
                        <div className="panel-body">
                            <div className="table-wrap fix-height">
                                <div className="table-responsive">
                                    <table id="myTable1" className="table display table-hover pb-30">
                                        <thead>
                                        <tr>
                                            {/*<th className="">S.No</th>*/}
                                            <th className="column2">Name</th>
                                            <th className="column2">Email</th>
                                            {/*<th className="">Contact</th>*/}
                                            <th className="column2">Location</th>
                                            {/*<th className="">Applied Date</th>*/}
                                            <th className="column2">Qualification</th>
                                            <th className="column2">Applied For</th>
                                            <th className="column2">Experience</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            (!this.props.state.userReducer.pageLoading && this.props.state.userReducer.allUsers.length > 0) &&
                                            this.props.state.userReducer.allUsers.slice(0, 5).map((u, i) => (
                                                <tr onClick={() => this.props.history.push("/dashboard/candidate/" + u.email + "/details")}>
                                                    {/*<td>{i + 1}</td>*/}
                                                    <td>{u.name}</td>
                                                    <td>{u.email}</td>
                                                    {/*<td>{u.contact}</td>*/}
                                                    <td>{u.location}</td>
                                                    {/*<td>{moment(u.appliedDate * 1000).format('Do MMM YYYY')}</td>*/}
                                                    <td>{u.qualification === "nil" ? "" : u.qualification}</td>
                                                    <td>{u.AppliedFor}</td>
                                                    <td>{u.experience}</td>
                                                </tr>
                                            ))
                                        }
                                        {
                                            (!this.props.state.userReducer.pageLoading && this.props.state.userReducer.allUsers.length === 0 && this.props.state.userReducer.getUserDetailsMessage === "") &&
                                            <tr>
                                                <td colSpan={10}>
                                                    <div className="table-body-loader text-center">
                                                        <div className="flex-center">
                                                            <div className="server-error-response">
                                                                No candidate found.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        }
                                        {
                                            (!this.props.state.userReducer.pageLoading && this.props.state.userReducer.getUserDetailsMessage !== "") &&
                                            <tr>
                                                <td colSpan={10}>
                                                    <div className="table-body-loader">
                                                        <div className="flex-center">
                                                            <div className="server-error-response">
                                                                {this.props.state.userReducer.getUserDetailsMessage}
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
                            <div className="index-btn"><NavLink to={"/dashboard/candidate/list"} className="table-inside-btn right ">View All
                                Candidates</NavLink></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {state}
}

export default withRouter(connect(mapStateToProps)(Candidates))
