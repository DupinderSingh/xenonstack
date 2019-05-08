import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Interviews extends Component {
    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                <div className="panel panel-info card-view custom-panel pool-panel ">
                    <div className="panel-heading">
                        <h5 className="panel-title">Interviews</h5>
                        <div>
                            <a className="pull-left inline-block mr-15 txt-light" data-toggle="collapse"
                               href="#collapse_4" aria-expanded="true">
                                <i className="zmdi zmdi-chevron-down"></i> <i
                                className="zmdi zmdi-chevron-up"></i>
                            </a>
                        </div>
                    </div>
                    <div id="collapse_4" className="panel-wrapper collapse in">
                        <div className="panel-body">
                            <div className="table-wrap fix-height">
                                <div className="table-responsive">
                                    <table id="myTable1" className="table display table-hover pb-30">
                                        <thead>
                                        <tr>
                                            <th className="">Candidate</th>
                                            <th className="">Job Role</th>
                                            <th className="">Interview On</th>
                                            <th className="">Interview Detail</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>John smith</td>
                                            <td>Software Engineer</td>
                                            <td>5/12/23</td>
                                            <td>skjkldjfk jdklfjljfkl</td>
                                        </tr>
                                        <tr>
                                            <td>John smith</td>
                                            <td>Software Engineer</td>
                                            <td>5/12/23</td>
                                            <td>skjkldjfk jdklfjljfkl</td>
                                        </tr>
                                        <tr>
                                            <td>John smith</td>
                                            <td>Software Engineer</td>
                                            <td>5/12/23</td>
                                            <td>skjkldjfk jdklfjljfkl</td>
                                        </tr>
                                        <tr>
                                            <td>John smith</td>
                                            <td>Software Engineer</td>
                                            <td>5/12/23</td>
                                            <td>skjkldjfk jdklfjljfkl</td>
                                        </tr>
                                        <tr>
                                            <td>John smith</td>
                                            <td>Software Engineer</td>
                                            <td>5/12/23</td>
                                            <td>skjkldjfk jdklfjljfkl</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="index-btn"><a href="#" className="table-inside-btn right ">View All
                                Interviews</a></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

export default withRouter(connect(mapStateToProps)(Interviews))
