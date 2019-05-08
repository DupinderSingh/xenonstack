import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class DeleteDialogBox extends Component {
    render() {
        return (
            <div id="popup1" className="overlay overlay-delete">
                <form className={this.props.formName} onSubmit={this.props.submitForm.bind(this)} noValidate={true}>
                    <div className="popup">
                        <div className="popup-heading">
                            <h4>{this.props.operation}</h4>
                            <a className="close" onClick={this.props.closeForm.bind(this)}>&times;</a></div>
                        <div className="content">
                            <div className="">
                                Are you sure you want to {this.props.keyword.toLowerCase()} {this.props.name}?
                            </div>
                            <div className="btn-group">
                                <button type="submit" style={{marginRight: "3rem"}} disabled={this.props.pageLoading ? true : false}
                                        className="btn mar-t-2">{this.props.keyword}</button>
                                <button type="button"  onClick={this.props.closeForm.bind(this)}
                                        className="btn mar-t-2">Cancel</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {state}
}
export default withRouter(connect(mapStateToProps)(DeleteDialogBox))