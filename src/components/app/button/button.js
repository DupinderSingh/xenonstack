import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Button extends Component{
    render() {
        return (
                <button
                    type={this.props.type}
                    onClick={this.props.onClick}
                    tabIndex={this.props.tabIndex}
                    id={this.props.id}
                    className={this.props.className}>
                    {this.props.text}
                </button>
        )
    }
}

export default withRouter(connect(null)(Button))