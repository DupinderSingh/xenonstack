import React, {Component} from 'react';

export default class TestList extends Component{
    render() {
        return (
            <div className="tests-list">
                <ul className="doc-list unordered num-list-item">
                    <li className="appeared"><p><span className="test-list-count">1</span>Online Apptitude Test <small></small></p></li>
                    <li className="ongoing"><span className="test-list-count">2</span>Online Technical Test</li>
                    <li><span className="test-list-count">3</span>Written Technical Test</li>
                    <li><span className="test-list-count">4</span>Face to Face HR round</li>
                    <li><span className="test-list-count">5</span>Final Discussion</li>
                </ul>
            </div>
        )
    }
}