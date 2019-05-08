import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AdminOnPageNavigation from '../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import AddCollegeCsv from './Add/csv';
import AddCollegeManually from './Add/manually';
import ListCollege from './list/list';
import {clearAll} from "../../../../actions/dashboard/admin/college/college";

class College extends Component {
    componentWillMount() {
        this.props.dispatch(clearAll())
    }
    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard" childRoute={this.props.location.pathname.match("/edit") ? "Edit College" : "Add College"}/>
                <div className="row">
                    <div className="col-lg-4 col-md-12 col-sm-12">
                        <div className="pool-form-wrapper">
                            <h4 className="content-heading">Add College</h4>
                            <div className="divider"></div>
                            <div className="">
                                <AddCollegeCsv/>
                                <AddCollegeManually/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-8">
                        <div className="pool-form-wrapper">
                            <h4 className="content-heading">All Colleges</h4>
                            <div className="divider"></div>
                            <div className="panel panel-default card-view custom-panel pool-panel">
                                <div className="panel-heading">
                                    <h5 className="panel-title">College List</h5>
                                </div>
                                <ListCollege/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {state}
}

export default withRouter(connect(mapStateToProps)(College))
