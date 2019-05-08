import React, {Component} from 'react';
import {connect} from 'react-redux';
import PersonalDetail from './personal-detail';
import EducationDetail from './education-detail';
import Experience from './experience';
import BasicInformation from './basic-information';
import {
    changeRegistrationForm,
    changeUserName,
    clearApiErrorMessage
} from "../../../../actions/account/registration-action";
import {getProfile} from "../../../../actions/dashboard/profile";
import BarLoaderSpinner from "../../../../components/app/spinner/barloader";
import {defaultRegistrationForm} from "../../../../reducers/account/register-reducer";

let ProgressBar = require('progressbar.js');

class Profile extends Component {
    componentWillMount() {
        document.title = "My Profile | Xenonstack Hiring Portal";
        this.props.dispatch(clearApiErrorMessage());
        const registrationForm = defaultRegistrationForm;
        this.props.dispatch(changeRegistrationForm(registrationForm));
        this.props.dispatch(getProfile());
    }

    componentDidMount() {
        const total = Number(this.props.profileStatus.total).toFixed(2);
        const personal = Number(this.props.profileStatus.personal).toFixed(2);
        const education = Number(this.props.profileStatus.education).toFixed(2);
        const experience = Number(this.props.profileStatus.experience).toFixed(2);
        const basic = Number(this.props.profileStatus.basic).toFixed(2);

        let progressTotal = new ProgressBar.Circle("#profileCompletedTotal", {
            color: '#aaa',
            strokeWidth: 20,
            trailWidth: 10,
            duration: 3000,
            height: 100,
            text: {
                autoStyleContainer: false
            },
            from: {color: '#aaa', width: 1},
            to: {color: '#333', width: 5},
            step: function (state, circle) {
                if (total >= 0 && total <= 25) {
                    circle.path.setAttribute('stroke', '#FF5722');
                }
                if (total >= 26 && total <= 50) {
                    circle.path.setAttribute('stroke', '#FF9800');
                }
                if (total >= 51 && total <= 99) {
                    circle.path.setAttribute('stroke', '#FFEB3B');
                }
                if (total == 100) {
                    circle.path.setAttribute('stroke', '#8BC34A');
                }
                circle.path.setAttribute('stroke-width', 10);
                let value = Number(total).toFixed(2);
                if (value === 0) {
                    circle.setText('');
                } else {
                    circle.setText((Math.round(value)) + "%");
                }
            }
        });

        progressTotal.text.style.font = 'normal normal bold normal 36px Arial';
        progressTotal.text.style.color = '#0562e8';
        progressTotal.text.style.fontSize = '15px';
        progressTotal.text.style.top = '50%';

        progressTotal.animate(total / 100);  // Number from 0.0 to 1.0


        let progressPersonal = new ProgressBar.Line("#profileCompletedPersonal", {
            color: '#aaa',
            strokeWidth: 50,
            trailWidth: 10,
            duration: 3000,
            height: 100,
            text: {
                autoStyleContainer: false
            },
            from: {color: '#aaa', width: 1},
            to: {color: '#333', width: 5},
            step: function (state, circle) {
                if (personal >= 0 && personal <= 25) {
                    circle.path.setAttribute('stroke', '#FF5722');
                }
                if (personal >= 26 && personal <= 50) {
                    circle.path.setAttribute('stroke', '#FF9800');
                }
                if (personal >= 51 && personal <= 99) {
                    circle.path.setAttribute('stroke', '#FFEB3B');
                }
                if (personal == 100) {
                    circle.path.setAttribute('stroke', '#8BC34A');
                }
                circle.path.setAttribute('stroke-width', 10);
                let value = personal;
                if (value === 0) {
                    // circle.setText('');
                } else {
                    // circle.setText((Math.round(value)) + "%");
                }
            }
        });

        // progressPersonal.text.style.font = 'normal normal bold normal 36px Arial';
        // progressPersonal.text.style.color = '#0562e8';
        // progressPersonal.text.style.fontSize = '25px';

        progressPersonal.animate(personal / 100);  // Number from 0.0 to 1.0


        let progressEducation = new ProgressBar.Line("#profileCompletedEducation", {
            color: '#aaa',
            strokeWidth: 50,
            trailWidth: 10,
            duration: 3000,
            height: 100,
            text: {
                autoStyleContainer: false
            },
            from: {color: '#aaa', width: 1},
            to: {color: '#333', width: 5},
            step: function (state, circle) {
                if (education >= 0 && education <= 25) {
                    circle.path.setAttribute('stroke', '#FF5722');
                }
                if (education >= 26 && education <= 50) {
                    circle.path.setAttribute('stroke', '#FF9800');
                }
                if (education >= 51 && education <= 99) {
                    circle.path.setAttribute('stroke', '#FFEB3B');
                }
                if (education == 100) {
                    circle.path.setAttribute('stroke', '#8BC34A');
                }
                circle.path.setAttribute('stroke-width', 10);
                let value = education;
                if (value === 0) {
                    // circle.setText('');
                } else {
                    // circle.setText((Math.round(value)) + "%");
                }
            }
        });

        // progressEducation.text.style.font = 'normal normal bold normal 36px Arial';
        // progressEducation.text.style.color = '#0562e8';
        // progressEducation.text.style.fontSize = '25px';

        progressEducation.animate(education / 100);  // Number from 0.0 to 1.0


        let progressExperience = new ProgressBar.Line("#profileCompletedExperience", {
            color: '#aaa',
            strokeWidth: 50,
            trailWidth: 10,
            duration: 3000,
            height: 100,
            text: {
                autoStyleContainer: false
            },
            from: {color: '#aaa', width: 1},
            to: {color: '#333', width: 5},
            step: function (state, circle) {
                if (experience >= 0 && experience <= 25) {
                    circle.path.setAttribute('stroke', '#FF5722');
                }
                if (experience >= 26 && experience <= 50) {
                    circle.path.setAttribute('stroke', '#FF9800');
                }
                if (experience >= 51 && experience <= 99) {
                    circle.path.setAttribute('stroke', '#FFEB3B');
                }
                if (experience == 100) {
                    circle.path.setAttribute('stroke', '#8BC34A');
                }
                circle.path.setAttribute('stroke-width', 10);
                let value = experience;
                if (value === 0) {
                    // circle.setText('');
                } else {
                    // circle.setText((Math.round(value)) + "%");
                }
            }
        });

        // progressExperience.text.style.font = 'normal normal bold normal 36px Arial';
        // progressExperience.text.style.color = '#0562e8';
        // progressExperience.text.style.fontSize = '25px';


        progressExperience.animate(experience / 100);  // Number from 0.0 to 1.0


        let progressBasic = new ProgressBar.Line("#profileCompletedBasic", {
            color: '#aaa',
            strokeWidth: 50,
            trailWidth: 10,
            duration: 3000,
            height: 100,
            text: {
                autoStyleContainer: false
            },
            from: {color: '#aaa', width: 1},
            to: {color: '#333', width: 5},
            step: function (state, circle) {
                if (basic >= 0 && basic <= 25) {
                    circle.path.setAttribute('stroke', '#FF5722');
                }
                if (basic >= 26 && basic <= 50) {
                    circle.path.setAttribute('stroke', '#FF9800');
                }
                if (basic >= 51 && basic <= 99) {
                    circle.path.setAttribute('stroke', '#FFEB3B');
                }
                if (basic == 100) {
                    circle.path.setAttribute('stroke', '#8BC34A');
                }
                circle.path.setAttribute('stroke-width', 10);
                let value = basic;
                if (value === 0) {
                    // circle.setText('');
                } else {
                    // circle.setText((Math.round(value)) + "%");
                }
            }
        });

        // progressBasic.text.style.font = 'normal normal bold normal 36px Arial';
        // progressBasic.text.style.color = '#0562e8';
        // progressBasic.text.style.fontSize = '25px';

        progressBasic.animate(basic / 100);  // Number from 0.0 to 1.0

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.state.RegisterReducer.userName !== nextProps.state.RegisterReducer.userName) {
            nextProps.dispatch(changeUserName(nextProps.state.RegisterReducer.userName))
        }
        if (nextProps.error) {
            document.querySelector('#profileCompletedTotal').innerHTML = '';
            let progressTotal = new ProgressBar.Circle("#profileCompletedTotal", {
                color: '#aaa',
                strokeWidth: 50,
                trailWidth: 10,
                duration: 3000,
                height: 100,
                text: {
                    autoStyleContainer: false
                },
                from: {color: '#aaa', width: 1},
                to: {color: '#333', width: 5},
                step: function (state, circle) {
                    circle.path.setAttribute('stroke', 'white');
                    circle.path.setAttribute('stroke-width', 10);
                    circle.setText('');
                }
            });

            progressTotal.text.style.font = 'normal normal bold normal 36px Arial';
            progressTotal.text.style.color = '#0562e8';
            progressTotal.text.style.fontSize = '15px';
            progressTotal.text.style.top = '50%';
            progressTotal.animate(0.0);  // Number from 0.0 to 1.0


            document.querySelector('#profileCompletedPersonal').innerHTML = '';
            let progressPersonal = new ProgressBar.Circle("#profileCompletedPersonal", {
                color: '#aaa',
                strokeWidth: 50,
                trailWidth: 10,
                duration: 3000,
                height: 100,
                text: {
                    autoStyleContainer: false
                },
                from: {color: '#aaa', width: 1},
                to: {color: '#333', width: 5},
                step: function (state, circle) {
                    circle.path.setAttribute('stroke', 'white');
                    circle.path.setAttribute('stroke-width', 10);
                    circle.setText('');
                }
            });
            progressPersonal.text.style.font = 'normal normal bold normal 36px Arial';
            progressPersonal.text.style.color = '#0562e8';
            progressPersonal.text.style.fontSize = '22px';
            progressPersonal.text.style.top = '50%';
            progressPersonal.animate(0.0);  // Number from 0.0 to 1.0


            document.querySelector('#profileCompletedEducation').innerHTML = '';
            let progressEducation = new ProgressBar.Circle("#profileCompletedEducation", {
                color: '#aaa',
                strokeWidth: 50,
                trailWidth: 10,
                duration: 3000,
                height: 100,
                text: {
                    autoStyleContainer: false
                },
                from: {color: '#aaa', width: 1},
                to: {color: '#333', width: 5},
                step: function (state, circle) {
                    circle.path.setAttribute('stroke', 'white');
                    circle.path.setAttribute('stroke-width', 10);
                    circle.setText('');
                }
            });
            progressEducation.text.style.font = 'normal normal bold normal 36px Arial';
            progressEducation.text.style.color = '#0562e8';
            progressEducation.text.style.fontSize = '22px';
            progressEducation.text.style.top = '50%';
            progressEducation.animate(0.0);  // Number from 0.0 to 1.0


            document.querySelector('#profileCompletedExperience').innerHTML = '';
            let progressExp = new ProgressBar.Circle("#profileCompletedExperience", {
                color: '#aaa',
                strokeWidth: 50,
                trailWidth: 10,
                duration: 3000,
                height: 100,
                text: {
                    autoStyleContainer: false
                },
                from: {color: '#aaa', width: 1},
                to: {color: '#333', width: 5},
                step: function (state, circle) {
                    circle.path.setAttribute('stroke', 'white');
                    circle.path.setAttribute('stroke-width', 10);
                    circle.setText('');
                }
            });
            progressExp.text.style.font = 'normal normal bold normal 36px Arial';
            progressExp.text.style.color = '#0562e8';
            progressExp.text.style.fontSize = '22px';
            progressExp.text.style.top = '50%';
            progressExp.animate(0.0);  // Number from 0.0 to 1.0


            document.querySelector('#profileCompletedBasic').innerHTML = '';
            let progressBasic = new ProgressBar.Circle("#profileCompletedBasic", {
                color: '#aaa',
                strokeWidth: 50,
                trailWidth: 10,
                duration: 3000,
                height: 100,
                text: {
                    autoStyleContainer: false
                },
                from: {color: '#aaa', width: 1},
                to: {color: '#333', width: 5},
                step: function (state, circle) {
                    circle.path.setAttribute('stroke', 'white');
                    circle.path.setAttribute('stroke-width', 10);
                    circle.setText('');
                }
            });
            progressBasic.text.style.font = 'normal normal bold normal 36px Arial';
            progressBasic.text.style.color = '#0562e8';
            progressBasic.text.style.fontSize = '22px';
            progressBasic.text.style.top = '50%';
            progressBasic.animate(0.0);  // Number from 0.0 to 1.0
        }
        else {
            if (Number(nextProps.profileStatus.total).toFixed(2) !== Number(this.props.profileStatus.total).toFixed(2)) {
                document.querySelector('#profileCompletedTotal').innerHTML = '';
                let progress = new ProgressBar.Circle("#profileCompletedTotal", {
                    color: '#aaa',
                    strokeWidth: 50,
                    trailWidth: 10,
                    duration: 3000,
                    height: 100,
                    text: {
                        autoStyleContainer: false
                    },
                    from: {color: '#aaa', width: 1},
                    to: {color: '#333', width: 5},
                    step: function (state, circle) {
                        if (Number(nextProps.profileStatus.total).toFixed(2) >= 0 && Number(nextProps.profileStatus.total).toFixed(2) <= 25) {
                            console.log("between 0 and 25");
                            circle.path.setAttribute('stroke', '#FF5722');
                        }
                        if (Number(nextProps.profileStatus.total).toFixed(2) >= 26 && Number(nextProps.profileStatus.total).toFixed(2) <= 50) {
                            console.log("between 26 and 50");
                            circle.path.setAttribute('stroke', '#FF9800');
                        }
                        if (Number(nextProps.profileStatus.total).toFixed(2) >= 51 && Number(nextProps.profileStatus.total).toFixed(2) <= 99) {
                            console.log("between 51 and 99");
                            circle.path.setAttribute('stroke', '#FFEB3B');
                        }
                        if (Number(nextProps.profileStatus.total).toFixed(2) == 100) {
                            console.log("100");
                            circle.path.setAttribute('stroke', '#8BC34A');
                        }
                        circle.path.setAttribute('stroke-width', 10);
                        let value = Number(nextProps.profileStatus.total).toFixed(2);
                        if (value === 0) {
                            circle.setText('');
                        } else {
                            circle.setText((Math.round(value)) + "%");
                        }
                    }
                });

                progress.text.style.font = 'normal normal bold normal 36px Arial';
                progress.text.style.color = '#0562e8';
                progress.text.style.fontSize = '15px';
                progress.text.style.top = '50%';
                progress.animate(Number(nextProps.profileStatus.total).toFixed(2) / 100);  // Number from 0.0 to 1.0
            }


            if (Number(nextProps.profileStatus.personal).toFixed(2) !== Number(this.props.profileStatus.personal).toFixed(2)) {
                console.log(nextProps.profileStatus.personal, "personal");
                document.querySelector('#profileCompletedPersonal').innerHTML = '';
                let progress = new ProgressBar.Line("#profileCompletedPersonal", {
                    color: '#aaa',
                    strokeWidth: 50,
                    trailWidth: 10,
                    duration: 3000,
                    height: 100,
                    text: {
                        autoStyleContainer: false
                    },
                    from: {color: '#aaa', width: 1},
                    to: {color: '#333', width: 5},
                    step: function (state, circle) {
                        if (Number(nextProps.profileStatus.personal).toFixed(2) >= 0 && Number(nextProps.profileStatus.personal).toFixed(2) <= 25) {
                            circle.path.setAttribute('stroke', '#FF5722');
                        }
                        if (Number(nextProps.profileStatus.personal).toFixed(2) >= 26 && Number(nextProps.profileStatus.personal).toFixed(2) <= 50) {
                            circle.path.setAttribute('stroke', '#FF9800');
                        }
                        if (Number(nextProps.profileStatus.personal).toFixed(2) >= 51 && Number(nextProps.profileStatus.personal).toFixed(2) <= 99) {
                            circle.path.setAttribute('stroke', "#FFEB3B");
                        }
                        if (Number(nextProps.profileStatus.personal).toFixed(2) == 100) {
                            circle.path.setAttribute('stroke', '#8BC34A');
                        }
                        let value = Number(nextProps.profileStatus.personal).toFixed(2);
                        circle.path.setAttribute('stroke-width', 10);
                        if (value === 0) {
                            // circle.setText('');
                        } else {
                            // circle.setText((Math.round(value)) + "%");
                        }
                    }
                });

                // progress.text.style.font = 'normal normal bold normal 36px Arial';
                // progress.text.style.color = '#0562e8';
                // progress.text.style.fontSize = '22px';

                progress.animate(Number(nextProps.profileStatus.personal).toFixed(2) / 100);  // Number from 0.0 to 1.0
            }


            if (Number(nextProps.profileStatus.experience).toFixed(2) !== Number(this.props.profileStatus.experience).toFixed(2)) {
                document.querySelector('#profileCompletedExperience').innerHTML = '';
                let progress = new ProgressBar.Line("#profileCompletedExperience", {
                    color: '#aaa',
                    strokeWidth: 50,
                    trailWidth: 10,
                    duration: 3000,
                    height: 100,
                    text: {
                        autoStyleContainer: false
                    },
                    from: {color: '#aaa', width: 1},
                    to: {color: '#333', width: 5},
                    step: function (state, circle) {
                        if (Number(nextProps.profileStatus.experience).toFixed(2) >= 0 && Number(nextProps.profileStatus.experience).toFixed(2) <= 25) {
                            circle.path.setAttribute('stroke', '#FF5722');
                        }
                        if (Number(nextProps.profileStatus.experience).toFixed(2) >= 26 && Number(nextProps.profileStatus.experience).toFixed(2) <= 50) {
                            circle.path.setAttribute('stroke', '#FF9800');
                        }
                        if (Number(nextProps.profileStatus.experience).toFixed(2) >= 51 && Number(nextProps.profileStatus.experience).toFixed(2) <= 99) {
                            circle.path.setAttribute('stroke', '#FFEB3B');
                        }
                        if (Number(nextProps.profileStatus.experience).toFixed(2) == 100) {
                            circle.path.setAttribute('stroke', '#8BC34A');
                        }
                        circle.path.setAttribute('stroke-width', 10);
                        let value = Number(nextProps.profileStatus.experience).toFixed(2);
                        if (value === 0) {
                            // circle.setText('');
                        } else {
                            // circle.setText((Math.round(value)) + "%");
                        }
                    }
                });

                // progress.text.style.font = 'normal normal bold normal 36px Arial';
                // progress.text.style.color = '#0562e8';
                // progress.text.style.fontSize = '22px';

                progress.animate(Number(nextProps.profileStatus.experience).toFixed(2) / 100);  // Number from 0.0 to 1.0
            }


            if (Number(nextProps.profileStatus.education).toFixed(2) !== Number(this.props.profileStatus.education).toFixed(2)) {
                document.querySelector('#profileCompletedEducation').innerHTML = '';
                let progress = new ProgressBar.Line("#profileCompletedEducation", {
                    color: '#aaa',
                    strokeWidth: 50,
                    trailWidth: 10,
                    duration: 3000,
                    height: 100,
                    text: {
                        autoStyleContainer: false
                    },
                    from: {color: '#aaa', width: 1},
                    to: {color: '#333', width: 5},
                    step: function (state, circle) {
                        if (Number(nextProps.profileStatus.education).toFixed(2) >= 0 && Number(nextProps.profileStatus.education).toFixed(2) <= 25) {
                            circle.path.setAttribute('stroke', '#FF5722');
                        }
                        if (Number(nextProps.profileStatus.education).toFixed(2) >= 26 && Number(nextProps.profileStatus.education).toFixed(2) <= 50) {
                            circle.path.setAttribute('stroke', '#FF9800');
                        }
                        if (Number(nextProps.profileStatus.education).toFixed(2) >= 51 && Number(nextProps.profileStatus.education).toFixed(2) <= 99) {
                            circle.path.setAttribute('stroke', '#FFEB3B');
                        }
                        if (Number(nextProps.profileStatus.education).toFixed(2) == 100) {
                            circle.path.setAttribute('stroke', '#8BC34A');
                        }
                        circle.path.setAttribute('stroke-width', 10);
                        let value = Number(nextProps.profileStatus.education).toFixed(2);
                        if (value === 0) {
                            // circle.setText('');
                        } else {
                            // circle.setText((Math.round(value)) + "%");
                        }
                    }
                });

                // progress.text.style.font = 'normal normal bold normal 36px Arial';
                // progress.text.style.color = '#0562e8';
                // progress.text.style.fontSize = '22px';

                progress.animate(Number(nextProps.profileStatus.education).toFixed(2) / 100);  // Number from 0.0 to 1.0
            }


            if (Number(nextProps.profileStatus.basic).toFixed(2) !== Number(this.props.profileStatus.basic).toFixed(2)) {
                document.querySelector('#profileCompletedBasic').innerHTML = '';
                let progress = new ProgressBar.Line("#profileCompletedBasic", {
                    color: '#aaa',
                    strokeWidth: 50,
                    trailWidth: 10,
                    duration: 3000,
                    height: 100,
                    text: {
                        autoStyleContainer: false
                    },
                    from: {color: '#aaa', width: 1},
                    to: {color: '#333', width: 5},
                    step: function (state, circle) {
                        if (Number(nextProps.profileStatus.basic).toFixed(2) >= 0 && Number(nextProps.profileStatus.basic).toFixed(2) <= 25) {
                            circle.path.setAttribute('stroke', '#FF5722');
                        }
                        if (Number(nextProps.profileStatus.basic).toFixed(2) >= 26 && Number(nextProps.profileStatus.basic).toFixed(2) <= 50) {
                            circle.path.setAttribute('stroke', '#FF9800');
                        }
                        if (Number(nextProps.profileStatus.basic).toFixed(2) >= 51 && Number(nextProps.profileStatus.basic).toFixed(2) <= 99) {
                            circle.path.setAttribute('stroke', '#FFEB3B');
                        }
                        if (Number(nextProps.profileStatus.basic).toFixed(2) == 100) {
                            circle.path.setAttribute('stroke', '#8BC34A');
                        }
                        circle.path.setAttribute('stroke-width', 10);
                        let value = Number(nextProps.profileStatus.basic).toFixed(2);
                        if (value === 0) {
                            // circle.setText('');
                        } else {
                            // circle.setText((Math.round(value)) + "%");
                        }
                    }
                });

                // progress.text.style.font = 'normal normal bold normal 36px Arial';
                // progress.text.style.color = '#0562e8';
                // progress.text.style.fontSize = '22px';

                progress.animate(Number(nextProps.profileStatus.basic).toFixed(2) / 100);  // Number from 0.0 to 1.0
            }
        }

    }

    render() {
        return (
            <section>
                <BarLoaderSpinner pageLoading={this.props.pageLoading}/>
                <div className="container">
                    <div className="content-detail">
                        <div className="text-center">
                            <h1 className="main-heading-h1">
                                My Profile
                            </h1>
                        </div>
                        <div className="profile-content">
                        {
                            this.props.error &&
                            <div className="text-center">
                                <div className="form-group">
                                    <div className="bPad24px">
                                    <span className="errorText">
                                        {this.props.message}
                                    </span>
                                    </div>
                                </div>
                            </div>
                        }
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-8">
                                    <form>
                                        <div className="row">
                                            <PersonalDetail/>
                                        </div>
                                        <div className="row">
                                            <EducationDetail/>
                                        </div>
                                        <div className="row">
                                            <Experience/>
                                        </div>
                                        <div className="row">
                                            <BasicInformation/>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-12 col-sm-12 col-md-4">
                                    <div className="sticky-div">
                                        <div className="profile-complete-status">
                                            <div className="complete-status">
                                                <div className="complete-content">
                                                    <h2>Your Profile Completness</h2>
                                                    {
                                                        (!this.props.pageLoading && !this.props.error) &&
                                                        (
                                                            Number(this.props.profileStatus.total).toFixed(2) < 100 &&
                                                            <p>Your profile looks<span className="incomplete-lable">Incomplete </span></p>
                                                        )
                                                    }
                                                    {/*{*/}
                                                        {/*!this.props.error &&*/}
                                                        {/*((!this.props.pageLoading && this.props.profileStatus.total < 100) ? (*/}
                                                            {/*<p>Your profile looks incomplete.</p>) : (*/}
                                                            {/*<p>Your profile looks complete.</p>))*/}
                                                    {/*}*/}
                                                </div>
                                                <div style={{position: "relative"}}
                                                     id="profileCompletedTotal"
                                                     className="metric">
                                                </div>


                                            </div>
                                            <div className="one-field-status ">
                                                <h3>Personal Information</h3>
                                                <span>
                                                {
                                                    (!this.props.pageLoading && !this.props.error) &&
                                                    (
                                                        Number(this.props.profileStatus.personal).toFixed(2) + "%"
                                                    )
                                                }
                                                </span>
                                                <div
                                                    id="profileCompletedPersonal"
                                                    className="metric">
                                                </div>
                                            </div>
                                            <div className="one-field-status">
                                                <h3>Education</h3>
                                                <span>
                                                {
                                                    (!this.props.pageLoading && !this.props.error) &&
                                                    (
                                                        Number(this.props.profileStatus.education).toFixed(2) + "%"
                                                    )
                                                }
                                                </span>
                                                <div
                                                    id="profileCompletedEducation"
                                                    className="metric">
                                                </div>
                                            </div>
                                            <div className="one-field-status">
                                                <h3>Experience</h3>
                                                <span>
                                                {
                                                    (!this.props.pageLoading && !this.props.error) &&
                                                    (
                                                        Number(this.props.profileStatus.experience).toFixed(2) + "%"
                                                    )
                                                }
                                                </span>
                                                <div
                                                    id="profileCompletedExperience"
                                                    className="metric">
                                                </div>
                                            </div>
                                            <div className="one-field-status">
                                                <h3>Basic Information</h3>
                                                <span>
                                                {
                                                    (!this.props.pageLoading && !this.props.error) &&
                                                    (
                                                        Number(this.props.profileStatus.basic).toFixed(2) + "%"
                                                    )

                                                }
                                                </span>
                                                <div
                                                    id="profileCompletedBasic"
                                                    className="metric">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-6 mar-xs-30">
                                    <div className=" mar-b-3">
                                        <a className="btn"
                                           onClick={() => this.props.history.push("/profile/change-password")}>Change
                                            Password</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    const {registrationForm, error, message, pageLoading, profileStatus} = state.RegisterReducer;
    return {registrationForm, error, message, pageLoading, profileStatus, state}
}

export default connect(mapStateToProps)(Profile)
