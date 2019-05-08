import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {clearAll, getDrive} from '../../../../actions/dashboard/admin/drive/drive';

class Drives extends Component {
    componentWillMount() {
        this.props.dispatch(clearAll());
        this.props.dispatch(getDrive("ongoing"))
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <div className="panel panel-success card-view custom-panel pool-panel ">
                    <div className="panel-heading">
                        <h5 className="panel-title">Ongoing Drives</h5>
                        <div>
                            <a className="pull-left inline-block mr-15 txt-light" data-toggle="collapse"
                               href="#collapse_3" aria-expanded="true">
                                <i className="zmdi zmdi-chevron-down"></i> <i
                                className="zmdi zmdi-chevron-up"></i>
                            </a>
                        </div>
                    </div>
                    <div id="collapse_3" className="panel-wrapper collapse in">
                        <div className="panel-body">
                            <div className="row fix-height">
                                {
                                    !this.props.getDrivePageLoading && this.props.drives.length > 0 &&
                                    this.props.drives.slice(0, 5).map((d, i) => (
                                        <div className="col-12 col-md-12 col-sm-12">
                                            <div className="feedback-section main-dashboard">
                                                <div className="heading-div">
                                                    <h5 className="head">{d.name} <span>( {d.type} )</span></h5>
                                                    <p className="page-heading-desc"> {d.users} users</p>
                                                </div>
                                                <div className="feedback-detail">
                                                <p className="date-text">{d.start + " - " + d.end}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                {
                                    (!this.props.getDrivePageLoading && this.props.drives.length === 0) &&
                                    <div className="col-12 col-md-12 col-sm-12">
                                        <div className="feedback-section main-dashboard">
                                            <div className="heading-div">
                                                <h5 className="head"><span></span></h5>
                                                <p className="date-text"></p>
                                            </div>
                                            <div className="feedback-detail">
                                                <p className="page-heading-desc"></p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="index-btn"><Link to={"/dashboard/drive/view"} className="table-inside-btn right ">View All
                                Drives</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {
        drives,
        getDrivePageLoading, getDrive_status, getDrive_error, getDrive_message,
        delete_drive_pageLoading, delete_drive_error, delete_drive_message, delete_drive_status,
    } = state.adminDriveReducer;
    return {
        drives,
        getDrivePageLoading, getDrive_status, getDrive_error, getDrive_message,
        delete_drive_pageLoading, delete_drive_error, delete_drive_message, delete_drive_status,
    }
}

export default withRouter(connect(mapStateToProps)(Drives))
