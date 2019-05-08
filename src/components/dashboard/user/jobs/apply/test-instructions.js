import React, {Component} from 'react';

export default class TestInstruction extends Component{
    render() {
        return (
            <ul className="doc-list unordered plus-list-item">
                <li>You have to clear all the rounds to get selected.</li>
                <li>Your are not allowed to skip any test.</li>
                <li>You are not able to go next step until you appeared for first step.</li>
                <li>you are allowed to apply again only after 6 months of applying.</li>
            </ul>

        )
    }
}