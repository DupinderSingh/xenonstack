import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Menubar extends Component {
    render() {
        return (
            (this.props.location.pathname !== "/drive/test/aptitude-test" &&
                !this.props.location.pathname.match("/jobs") &&
                !this.props.location.pathname.match("/hiring-process")
            ) &&
            <div className="dash-navbar">
                <ul className="dash-navMenu">
                    <li className={this.props.location.pathname === "/dashboard" ? "active" : ""}><Link to="/dashboard"><i
                        className="material-icons">dashboard</i> Dashboard </Link></li>
                    <li className={this.props.location.pathname === "/drive-details" ? "active" : ""}><Link
                        to="/drive-details"><i className="material-icons">build</i> Drive Detail </Link></li>
                    <li className={this.props.location.pathname === "/my-activities" ? "active" : ""}><Link
                        to="/my-activities"><i className="material-icons">business_center</i> My Jobs </Link>
                    </li>
                    <li className={this.props.location.pathname === "/profile" ? "active" : ""}><Link to="/profile"><i
                        className="material-icons">person</i>
                        {this.props.location.pathname === "/profile" && "Profile"}
                        {this.props.location.pathname === "/profile/edit" && "Profile (edit)"}
                        {(this.props.location.pathname !== "/profile" && this.props.location.pathname !== "/profile/edit") && "Profile"}
                    </Link></li>
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default withRouter(connect(mapStateToProps)(Menubar))