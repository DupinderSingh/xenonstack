/*eslint-disable*/
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class HiringProcess extends Component {
    componentWillMount() {
        document.title = "Hiring Process | Xenonstack Hiring Portal";
    }

    render() {
        return (
            <div>
                <section className="jobpage-banner">
                    <div className="jobpage-banner-container">
                        <div className="banner-background hiring-banner-image">
                            <div className="banner-content">
                                {/*<h2 className="banner-heading">Looking for job? you are at right place</h2>*/}
                                {/*<h4 className="subtitle">We are here to provide you best opportunities you are waiting for!!</h4>*/}
                            </div>
                        </div>
                    </div>
                </section>
            <section className="">
                <div className="container">
                    <div className="content-detail">
                        <div className="text-center">
                            <h1 className="main-heading-h1">XenonStack Hiring Process</h1>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-12 offset-md-1 col-md-10 ">
                                <div className="hiring-wrapper-div">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-2 p-0">
                                            <div className="hiring-step-img">
                                                <figure> <img src={require("../../../../static/images/Online tst icons-01.svg")} alt="image" /> </figure>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-10">
                                            <div className="hiring-step">
                                                <div>
                                                    <div><span>01</span> <h2>Online Aptitude Test</h2></div>
                                                    <p>Aptitude test consist of 3 sections English, Quantitative Analysis, and Logical Reasoning. It helps in identifying the potential of the individual to perform well in that specific job role. </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 offset-md-1 col-md-10 ">
                                <div className="hiring-wrapper-div">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-2 p-0">
                                            <div className="hiring-step-img">
                                                <figure> <img src={require("../../../../static/images/Online tst icons-02.svg")} alt="image" /> </figure>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-10">
                                            <div className="hiring-step">
                                                <div>
                                                    <div><span>02</span><h2>Online Technical Test</h2></div>
                                                    <p>This step will help us judge your theoretical computer skills related to database, operating systems and algorithms. </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 offset-md-1 col-md-10 ">
                                <div className="hiring-wrapper-div">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-2 p-0">
                                            <div className="hiring-step-img">
                                                <figure> <img src={require("../../../../static/images/Online tst icons-03.svg")} alt="image" /> </figure>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-10">
                                            <div className="hiring-step">
                                                <div>
                                                    <div><span>03</span><h2>Written Technical Test/ Technical Interview</h2></div>
                                                    <p>You will have the opportunity to demonstration your Practical Programing Skills.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 offset-md-1 col-md-10 ">
                                <div className="hiring-wrapper-div">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-2 p-0">
                                            <div className="hiring-step-img">
                                                <figure> <img src={require("../../../../static/images/Online tst icons-04.svg")} alt="image" /> </figure>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-10">
                                            <div className="hiring-step">
                                                <div>
                                                    <div><span>04</span><h2>HR Interview Round</h2></div>
                                                    <p>You will be judged on communication skills, presentation skills, behavioural attributes, leadership skills, participation and confidence</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 offset-md-1 col-md-10 ">
                                <div className="hiring-wrapper-div">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-2 p-0">
                                            <div className="hiring-step-img">
                                                <figure> <img src={require("../../../../static/images/Online tst icons-05.svg")} alt="image" /> </figure>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-10">
                                            <div className="hiring-step">
                                                <div>
                                                    <div><span>05</span><h2>Final Discussion/ Psychometric Test </h2></div>
                                                    <p>Discussion with the Head of Engineering and Business, Mr. Navdeep Singh and followed by Psychometric Test. </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {goToRegistration} = state.RegisterReducer;
    return {goToRegistration}
}

export default withRouter(connect(mapStateToProps)(HiringProcess))
