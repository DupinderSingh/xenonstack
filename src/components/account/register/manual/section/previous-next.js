import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Button from '../../../../app/button/button';
import {updateSkipEducation, updateSkipExperience} from "../../../../../actions/account/registration-action";

class PreviousNextSection extends Component {
    previous() {
        const self = this.props;
        switch (self.location.pathname) {
            case "/apply-manual/check-email":
                return self.history.push("/login");
            case "/apply-linkedIn/check-email":
                return self.history.push("/login");
            case "/apply-manual/education":
                return self.history.push("/apply-manual/personal-information");
            case "/apply-manual/experience":
                return self.history.push("/apply-manual/education");
            case "/apply-manual/information":
                return self.history.push("/apply-manual/experience");
            case "/apply-manual/create-password":
                return self.history.push("/apply-manual/information");
            default:
                return 0
        }
    }

    next() {
        const self = this.props;
        switch (self.location.pathname) {
            case "/apply-manual/personal-information":
                return self.history.push("/apply-manual/education");
            case "/apply-manual/education":
                self.dispatch(updateSkipEducation(false));
                return self.history.push("/apply-manual/experience");
            case "/apply-manual/experience":
                self.dispatch(updateSkipExperience(false));
                return self.history.push("/apply-manual/information");
            case "/apply-manual/information":
                return self.history.push("/apply-manual/create-password");
            case "/apply-manual/create-password":
                return self.history.push("/apply-manual/preview");
            default:
                return 0
        }
    }

    render() {
        return (
            <div className="col-12 col-sm-7 col-md-6 right">
                {
                    this.props.isAuthenticated ?
                        <div className=" btn-group ">
                            <Button type="button" onClick={() => this.props.history.push("/profile")}
                                    className="btn signin mar-t-2" text="Cancel" style={{marginRight: "30px"}}/>
                            <Button type="submit" className="btn signin mar-t-2"
                                    disabled={this.props.state.RegisterReducer.pageLoading ? true : false}
                                    text="Submit"/>
                        </div>

                        :
                        <div className=" btn-group ">
                            {
                                this.props.location.pathname === "/apply-manual/review" &&
                                <Button type="button" onClick={() => this.props.history.push("/apply-manual/preview")}
                                        className="btn signin mar-t-2" text="Back" style={{marginRight: "30px"}}/>
                            }

                            {
                                (this.props.location.pathname !== "/apply-manual/personal-information" && this.props.location.pathname !== "/apply-manual/review" && this.props.location.pathname !== "/profile/edit" && this.props.location.pathname !== "/apply-linkedIn/register") &&
                                <Button type="button" tabIndex={1} onClick={this.previous.bind(this)}
                                        className="btn signin mar-t-2" style={{marginRight: "20px"}} text="Previous"/>
                            }
                            <Button type="submit" className="btn signin mar-t-2"
                                    tabIndex={0}
                                    disabled={this.props.state.RegisterReducer.pageLoading ? true : false}
                                    text={((this.props.location.pathname === "/apply-manual/review") || (this.props.location.pathname === "/profile/edit") || (this.props.location.pathname === "/apply-linkedIn/register") ? "Submit" : "Next")}/>
                        </div>


                }
            </div>

        )
    }
}

function mapStateToProps(state) {
    const {auth} = state.LoginReducer;
    const {isAuthenticated, sys_role} = auth;
    return {isAuthenticated, sys_role, state}
}

export default withRouter(connect(mapStateToProps)(PreviousNextSection))