import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class AdminFooter extends Component {
    render() {
        return (
            <footer className="footer custom-footer" style={{position: "fixed"}}>
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <p>&copy; 2018 <a href={"http://www.xenonstack.com/"} target="_blank">XenonStack</a>. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default withRouter(connect(mapStateToProps)(AdminFooter))