import React, {Component} from 'react';
import AdminOnPageNavigation from '../../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';

export default class AdminDriveDetails extends Component {
    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard" childRoute="Drive Details"/>
                <div className="form-group "><button className="btn" >Assign Users</button></div>
                <div className="row">
                <div className="col-lg-12 col-sm-12 col-md-12">
                    <div className="panel panel-default card-view custom-panel pool-panel">
                        <div className="panel-heading">
                            <h5 className="panel-title">Drive Detail</h5>
                        </div>
                        <div className="panel-wrapper collapse in">
                            <div className="panel-body">
                                <div className="table-wrap">
                                    <div className="table-responsive">
                                        <table id="myTable1" className="table display table-hover pb-30">
                                            <thead>
                                            <tr>
                                                <th className="">S.No</th>
                                                <th className="">Name</th>
                                                <th className="">Email</th>
                                                <th className="">Attempted Questions</th>
                                                <th className="">Time Taken</th>
                                                <th className="">Result</th>
                                                <th className="">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td className="column1">01</td>
                                                <td>Harpreet Kaur</td>
                                                <td>Meena34@gmail.com</td>
                                                <td>21</td>
                                                <td>90 min</td>
                                                <td className='fail'>Fail</td>
                                                <td><button  className="action-btn delete">View Result</button>
                                                    <button className="action-btn" >View Profile</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="column1">02</td>
                                                <td>Meenakshi</td>
                                                <td>Meena34@gmail.com</td>
                                                <td>74</td>
                                                <td>90 min</td>
                                                <td className="pass">Pass</td>
                                                <td><button  className="action-btn delete">View Result</button>
                                                    <button className="action-btn" >View Profile</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="column1">03</td>
                                                <td>Sandeep Singh</td>
                                                <td>Meena34@gmail.com</td>
                                                <td>89</td>
                                                <td>90 min</td>
                                                <td className="pass">Pass</td>
                                                <td><button  className="action-btn delete">View Result</button>
                                                    <button className="action-btn" >View Profile</button>
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