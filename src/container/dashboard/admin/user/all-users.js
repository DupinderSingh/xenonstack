import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AdminOnPageNavigation from '../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import {
    changePageNumber,
    clearAll,
    dropdownFilterData,
    filterUser,
    getAllUsers
} from '../../../../actions/dashboard/admin/user/user';
import moment from "moment/moment";
import Pagination from "react-js-pagination";

class Candidates extends Component {
    componentWillMount() {
        this.props.dispatch(clearAll());
        this.props.dispatch(dropdownFilterData());
        this.props.dispatch(changePageNumber(1, 0));
        this.props.dispatch(getAllUsers(1, "", "", ""));
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(changePageNumber(pageNumber, this.props.state.userReducer.all_records_count));
        this.props.dispatch(getAllUsers(pageNumber, this.props.state.userReducer.loca, this.props.state.userReducer.qual, this.props.state.userReducer.appl));
    }

    onChange(e) {
        const newState = Object.assign(this.props.state.userReducer, {[e.target.name]: e.target.value});
        this.props.dispatch(filterUser(newState));
        switch (e.target.name) {
            case "loca":
                return this.props.dispatch(getAllUsers(this.props.state.userReducer.userActivePage, e.target.value, this.props.state.userReducer.qual, this.props.state.userReducer.appl));

            case "qual":
                return this.props.dispatch(getAllUsers(this.props.state.userReducer.userActivePage, this.props.state.userReducer.loca, e.target.value, this.props.state.userReducer.appl));

            case "appl":
                return this.props.dispatch(getAllUsers(this.props.state.userReducer.userActivePage, this.props.state.userReducer.loca, this.props.state.userReducer.qual, e.target.value));
            default:
                return 0
        }
    }

    clearFilter() {
        this.props.dispatch(filterUser({loca: "", qual: "", appl: ""}));
        this.props.dispatch(getAllUsers(1, "", "", ""));
    }

    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard" childRoute="Candidates List"/>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="panel panel-default card-view custom-panel pool-panel">
                            <div className="panel-heading">
                                <h5 className="panel-title">All Candidates</h5>
                                <div className="clearfix"></div>
                            </div>
                            <div className="panel-wrapper collapse in">
                                <div className="panel-body">
                                    <div className="filter-holder mb-15">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-sm-6">
                                                <h5 className="filter-name">Filter By</h5>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-2 col-md-3 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="Location">Location</label>
                                                    <select id="location-val" className="form-control" tabindex="1"
                                                            aria-hidden="true"
                                                            name="loca"
                                                            value={this.props.state.userReducer.loca}
                                                            autoComplete={"off"}
                                                            required={false}
                                                            onChange={this.onChange.bind(this)}
                                                            data-placeholder="Select Location">
                                                        <option value="">Select Location</option>
                                                        {
                                                            this.props.state.userReducer.locations.map((d) => (
                                                                <option value={d}>{d}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-md-3 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="Location">Qualification</label>
                                                    <select id="location-val" className="form-control"
                                                            style={{width: "100%"}}
                                                            tabindex="2" aria-hidden="true"
                                                            name="qual"
                                                            value={this.props.state.userReducer.qual}
                                                            autoComplete={"off"}
                                                            required={false}
                                                            onChange={this.onChange.bind(this)}
                                                            data-placeholder="Select Qualification"
                                                    >
                                                        <option value="">Select Qualification</option>
                                                        {
                                                            this.props.state.userReducer.qualifications.map((d) => (
                                                                <option value={d}>{d}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-2 col-md-3 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="Location">Applied For</label>
                                                    <select id="location-val" className="form-control"
                                                            style={{width: "100%"}}
                                                            tabindex="3" aria-hidden="true"
                                                            name="appl"
                                                            value={this.props.state.userReducer.appl}
                                                            autoComplete={"off"}
                                                            required={false}
                                                            onChange={this.onChange.bind(this)}
                                                            data-placeholder="Select Applied For"
                                                    >
                                                        <option value="">Select Applied For</option>
                                                        {
                                                            this.props.state.userReducer.applied.map((d) => (
                                                                <option value={d}>{d}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <button type="button"
                                                    style={{margin: "32px"}}
                                                    className="btn form-group"
                                                    onClick={this.clearFilter.bind(this)}>Clear Filter
                                            </button>
                                        </div>
                                    </div>
                                    <div className="table-wrap feedback-table">
                                        <div className="table-responsive">
                                            <table id="myTable1" className="table display table-hover pb-30">
                                                <thead>
                                                <tr>
                                                    <th className="">S.No</th>
                                                    <th className="column5">Name</th>
                                                    <th className="">Email</th>
                                                    <th className="column5">Contact</th>
                                                    <th className="">Location</th>
                                                    <th className="column5">Applied Date</th>
                                                    <th className="">Qualification</th>
                                                    <th className="">Applied For</th>
                                                    <th className="">Experience</th>
                                                    <th className="">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    (!this.props.state.userReducer.pageLoading && this.props.state.userReducer.allUsers.length > 0) &&
                                                    this.props.state.userReducer.allUsers.map((u, i) => (
                                                        <tr onClick={() => this.props.history.push("/dashboard/candidate/" + u.email + "/details")}>
                                                            <td>{i + 1}</td>
                                                            <td>{u.name}</td>
                                                            <td>{u.email}</td>
                                                            <td>{u.contact}</td>
                                                            <td>{u.location}</td>
                                                            <td>{moment(u.appliedDate * 1000).format('Do MMM YYYY')}</td>
                                                            <td>{u.qualification === "nil" ? "" : u.qualification}</td>
                                                            <td>{u.AppliedFor}</td>
                                                            <td>{u.experience}</td>
                                                            <td><span>Reject</span></td>
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
                                        <div className=" pagin" style={{float: "right"}}>
                                            <Pagination
                                                activePage={this.props.state.userReducer.userActivePage}
                                                itemsCountPerPage={this.props.state.userReducer.itemPerPage}
                                                totalItemsCount={this.props.state.userReducer.all_records_count}
                                                pageRangeDisplayed={2}
                                                onChange={this.handlePageChange.bind(this)}
                                            />
                                        </div>
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
    return {state}
}

export default withRouter(connect(mapStateToProps)(Candidates))
