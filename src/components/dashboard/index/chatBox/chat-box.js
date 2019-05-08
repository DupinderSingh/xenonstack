import React, {Component} from 'react';
import {connect} from 'react-redux';
let chatBox = [];

class ChatBox extends Component {
    componentDidMount() {
        chatBox = document.querySelectorAll(".chatbox-close, .chatbox-popup");
    }
    openBox() {
        chatBox.forEach((d)=> {d.style.display = "block"})
    }
    closeBox() {
        chatBox.forEach((d)=> {d.style.display = "none"})
    }
    render() {
        return (
            <div>
                <div className="chatbox-open" id="openBox" onClick={this.openBox}>
                    <figure><img src={require("../../../../static/images/chatbox.svg")} className="chatbox-icon" alt="chat"/></figure>
                </div>
                <div className="chatbox-close" id="closeBox" onClick={this.closeBox}>
                    <figure><img src={require("../../../../static/images/Cross.svg")} className="chatbox-icon" alt="chat"/></figure>
                </div>
                <section className="chatbox-popup" id="box">
                    <header className="chatbox-popup_header">
                        <h1>Sussanah Austin</h1>
                        <span className="chat-minimize" onClick={this.closeBox}>---</span>
                    </header>
                    <main className="chatbox-popup_main">
                        <div className="chat-content">
                            <ul className="chatbox-message">
                                <li className="other">How can I help you?</li>
                                <li className="other">erteytryutryyteutruytruteutututututyaszahghgf</li>
                                <li className="self">hello</li>
                            </ul>
                        </div>
                    </main>
                    <footer className="chatbox-popup_footer">
                        <textarea type="text" placeholder="Type your message here..."
                                  className="chatbox-textarea"></textarea>
                        <span><figure><img src={require("../../../../static/images/send.svg")} className="chatbox-icon" alt="chat"/></figure></span>
                    </footer>
                </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(ChatBox)