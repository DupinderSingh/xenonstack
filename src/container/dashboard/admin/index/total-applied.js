import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class TotalApplied extends Component {
    render() {
        return (
            <div className="col-12 col-sm-6 col-md-3">
                <div className="info-box">
                              <span className="info-box-icon bg-green">
                                <i className="fa fa-tag" aria-hidden="true"></i>

                              </span>
                    <div className="info-box-content">
                        <span className="info-box-text">Total Applied</span>
                        <span className="info-box-number">{this.props.pageLoading ? "" : this.props.all_records_count}</span>
                        {/*<span className="progress-description">  Total candidates applied  </span>*/}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {all_records_count, pageLoading} = state.userReducer
    return {all_records_count, pageLoading}
}

export default withRouter(connect(mapStateToProps)(TotalApplied))