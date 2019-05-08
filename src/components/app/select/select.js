import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Select extends Component{
    render() {
        return (
            <select
                id={this.props.id}
                onChange={this.props.onChange}
                name={this.props.name}
                required={this.props.required}
                className={this.props.className}
                value={this.props.value}>
                {this.props.children}
            </select>
        )
    }
}

export default withRouter(connect(null)(Select))