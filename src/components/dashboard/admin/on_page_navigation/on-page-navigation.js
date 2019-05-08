import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';

class AdminOnPageNavigation extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-lg-12 col-sm-12 col-md-12">
                    <div className="heading-bg">
                        <h4 className="txt-dark">
                            <Link to="/dashboard">{this.props.parentRoute}</Link>
                            {
                                this.props.location.pathname !== "/dashboard" && " /"
                            }
                            <small><Link to={this.props.location.pathname}>{this.props.childRoute}</Link></small>
                        </h4>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default withRouter(connect(mapStateToProps)(AdminOnPageNavigation))