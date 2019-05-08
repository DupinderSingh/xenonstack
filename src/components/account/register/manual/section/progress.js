import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class RegistrationProgress extends Component{
    render() {
        return (
            (this.props.location.pathname !== "/apply-manual/preview" && this.props.location.pathname !== "/apply-manual/review") &&
            <section className="progressbar">
                <div className="container">
                    <div className="wrapper error-wrapper ">
                        <div className="progressbar-outer">
                            <ul className="progressbar">
                                <li className={(this.props.location.pathname === "/apply-manual/personal-information") ? "active" : ""}><span> Personal information </span> </li>
                                <li className={(this.props.location.pathname === "/apply-manual/education") ? "active" : ""}><span> Education </span> </li>
                                <li className={(this.props.location.pathname === "/apply-manual/experience") ? "active" : ""}><span> Experience </span> </li>
                                <li className={(this.props.location.pathname === "/apply-manual/information") ? "active" : ""}><span> Basic Information </span> </li>
                                <li className={(this.props.location.pathname === "/apply-manual/create-password") ? "active" : ""}><span> Create Password </span> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
function mapStateToProps(state) {
    return state
}

export default withRouter(connect(mapStateToProps)(RegistrationProgress))
