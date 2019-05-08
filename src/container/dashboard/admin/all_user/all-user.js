import React, {Component} from 'react';
import AdminOnPageNavigation from '../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';

export default class Candidates extends Component {
    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard" childRoute="Candidates List"/>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="panel panel-default card-view custom-panel pool-panel">
                            <div className="panel-heading">
                                <h5 className="panel-title">All Candidates</h5>
                                <div className="clearfix"></div>
                            </div>
                            <div className="panel-wrapper collapse in">
                                <div className="panel-body">
                                    <div className="filter-holder mb-15">
                                        <div className="row">
                                            <div className="col-12 col-md-8 col-sm-6">
                                                <h3 className="filter-name">Filter By</h3>
                                            </div>
                                            <div className="col-12 col-md-4 col-sm-6 right">
                                                <button className="btn">Apply</button>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className=" col-md-3 col-sm-6">
                                                <div className="form-group">
                                                    <label for="Location">Location</label>
                                                    <select id="location-val" className="form-control" tabindex="-1"
                                                            aria-hidden="true">
                                                        <option value="">Location</option>
                                                        <option value="Mumbai">Mumbai</option>
                                                        <option value="Delhi">Delhi</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className=" col-md-3 col-sm-6">
                                                <div className="form-group">
                                                    <label for="Location">Location</label>
                                                    <select id="location-val" className="form-control"
                                                            style={{width: "100%"}}
                                                            tabindex="-1" aria-hidden="true">
                                                        <option value="">Location</option>
                                                        <option value="Mumbai">Mumbai</option>
                                                        <option value="Delhi">Delhi</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className=" col-md-3 col-sm-6">
                                                <div className="form-group">
                                                    <label for="Location">Location</label>
                                                    <select id="location-val" className="form-control"
                                                            style={{width: "100%"}}
                                                            tabindex="-1" aria-hidden="true">
                                                        <option value="">Location</option>
                                                        <option value="Mumbai">Mumbai</option>
                                                        <option value="Delhi">Delhi</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className=" col-md-3 col-sm-6">
                                                <div className="form-group">
                                                    <label for="Location">Location</label>
                                                    <select id="location-val" className="form-control"
                                                            style={{width: "100%"}}
                                                            tabindex="-1" aria-hidden="true">
                                                        <option value="">Location</option>
                                                        <option value="Mumbai">Mumbai</option>
                                                        <option value="Delhi">Delhi</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-wrap ">
                                        <div className="table-responsive">
                                            <table id="myTable1" className="table display table-hover pb-30">
                                                <thead>
                                                <tr>
                                                    <th className="column1">S.No</th>
                                                    <th className="">Name</th>
                                                    <th className="">email</th>
                                                    <th className="">Qualification</th>
                                                    <th className="">Location</th>
                                                    <th className="">Mobile number</th>
                                                    <th className="">Experience</th>
                                                    <th className="">Applied On</th>
                                                    <th className="">Applied For</th>
                                                    <th className="">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>John smith</td>
                                                    <td>jhghg@gmail.com</td>
                                                    <td>usufdjgjhgt</td>
                                                    <td>Chandigarh</td>
                                                    <td>45621589632</td>
                                                    <td>5</td>
                                                    <td>5/12/23</td>
                                                    <td>skjkldjfk jdklfjljfkl</td>
                                                    <td><span className="action-btn delete">Rejected</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>1</td>
                                                    <td>John smith</td>
                                                    <td>jhghg@gmail.com</td>
                                                    <td>usufdjgjhgt</td>
                                                    <td>Chandigarh</td>
                                                    <td>45621589632</td>
                                                    <td>5</td>
                                                    <td>5/12/23</td>
                                                    <td>skjkldjfk jdklfjljfkl</td>
                                                    <td><span className="action-btn">Applied</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>1</td>
                                                    <td>John smith</td>
                                                    <td>jhghg@gmail.com</td>
                                                    <td>usufdjgjhgt</td>
                                                    <td>Chandigarh</td>
                                                    <td>45621589632</td>
                                                    <td>5</td>
                                                    <td>5/12/23</td>
                                                    <td>skjkldjfk jdklfjljfkl</td>
                                                    <td><span className="action-btn">Applied</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>1</td>
                                                    <td>John smith</td>
                                                    <td>jhghg@gmail.com</td>
                                                    <td>usufdjgjhgt</td>
                                                    <td>Chandigarh</td>
                                                    <td>45621589632</td>
                                                    <td>5</td>
                                                    <td>5/12/23</td>
                                                    <td>skjkldjfk jdklfjljfkl</td>
                                                    <td><span className="action-btn delete">Rejected</span>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
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