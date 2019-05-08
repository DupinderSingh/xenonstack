import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AdminOnPageNavigation from '../../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';

class ManagePool extends Component {
    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard" childRoute="Manage Pool"/>
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <div className="panel panel-warning card-view custom-panel pool-panel">
                            <div className="panel-heading">
                                <span>Java</span>
                                <div className="">
                                    <a className="mr-15" href="#"> <i className="zmdi zmdi-edit txt-light"></i> </a>
                                    <a href="#"><i className="zmdi zmdi-delete txt-light"></i></a>
                                </div>
                            </div>
                            <div className="panel-wrapper collapse in">
                                <div className="panel-body">
                                    <div>
                                        <span className="txt-dark">12 Questions</span>
                                        <a className="view-pool" href="">View Pool</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <div className="panel panel-danger card-view custom-panel pool-panel">
                            <div className="panel-heading">
                                <span>UI/UX Designer</span>
                                <div className="">
                                    <a className="mr-15" href="#"> <i className="zmdi zmdi-edit txt-light"></i> </a>
                                    <a href="#"><i className="zmdi zmdi-delete txt-light"></i></a>
                                </div>
                            </div>
                            <div className="panel-wrapper collapse in">
                                <div className="panel-body">
                                    <div>
                                        <span className="txt-dark">12 Questions</span>
                                        <a className="view-pool" href="">View Pool</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <div className="panel panel-info card-view custom-panel pool-panel">
                            <div className="panel-heading">
                                <span>Data Engineering</span>
                                <div className="">
                                    <a className="mr-15" href="#"> <i className="zmdi zmdi-edit txt-light"></i> </a>
                                    <a href="#"><i className="zmdi zmdi-delete txt-light"></i></a>
                                </div>
                            </div>
                            <div className="panel-wrapper collapse in">
                                <div className="panel-body">
                                    <div>
                                        <span className="txt-dark">10 Questions</span>
                                        <a className="view-pool" href="">View Pool</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <div className="panel panel-success card-view custom-panel pool-panel">
                            <div className="panel-heading">
                                <span>Testing</span>
                                <div className="">
                                    <a className="mr-15" href="#"> <i className="zmdi zmdi-edit txt-light"></i> </a>
                                    <a href="#"><i className="zmdi zmdi-delete txt-light"></i></a>
                                </div>
                            </div>
                            <div className="panel-wrapper collapse in">
                                <div className="panel-body">
                                    <div>
                                        <span className="txt-dark">12 Questions</span>
                                        <a className="view-pool" href="">View Pool</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                        <div className="panel panel-primary card-view custom-panel pool-panel">
                            <div className="panel-heading">
                                <span>Business Analyst</span>
                                <div className="">
                                    <a className="mr-15" href="#"> <i className="zmdi zmdi-edit txt-light"></i> </a>
                                    <a href="#"><i className="zmdi zmdi-delete txt-light"></i></a>
                                </div>
                            </div>
                            <div className="panel-wrapper collapse in">
                                <div className="panel-body">
                                    <div>
                                        <span className="txt-dark">12 Questions</span>
                                        <a className="view-pool" href="">View Pool</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default withRouter(connect(mapStateToProps)(ManagePool))