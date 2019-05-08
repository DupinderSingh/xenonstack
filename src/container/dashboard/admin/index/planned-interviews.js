import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class PlannedInterviews extends Component {
    render() {
        return (
            <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box">
                              <span className="info-box-icon bg-gold">
                                <i className="fa fa-table" aria-hidden="true"></i>

                              </span>
                    <div className="info-box-content">
                        <span className="info-box-text">Planned Interviews</span>
                        <span className="info-box-number">0</span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

export default withRouter(connect(mapStateToProps)(PlannedInterviews))