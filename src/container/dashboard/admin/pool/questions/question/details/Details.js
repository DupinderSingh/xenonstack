import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AdminOnPageNavigation
    from '../../../../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import {
    addImage,
    addQuestionToPool,
    changeCreateQuestionCsvForm,
    changeOption,
    changeQuestion,
    clearAll,
    clearStatus,
    deleteImage,
    editQuestionDetails,
    getQuestionDetails,
    uploadCsv
} from '../../../../../../../actions/dashboard/admin/pool/pool';
import {checkValidation} from "../../../../../../../actions/app/app";
import BarLoaderSpinner from "../../../../../../../components/app/spinner/barloader";
import createNotification from "../../../../../../../components/app/notification/notification";
import {NotificationContainer} from 'react-notifications';

class AddQuestionsToPool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadManual: true,
            isSelectedOption: false,
            isSelectedOptionError: false
        }
    }

    componentWillMount() {
        this.props.dispatch(clearStatus());
        this.props.dispatch(clearAll());
        if (this.props.location.pathname.match("/edit")) {
            this.props.dispatch(getQuestionDetails(this.props.match.params.pool_id, this.props.match.params.question));
        }
    }

    submitAddQuestionToPoolForm(e) {
        e.preventDefault();
        const self = this.props;
        const thi = this;
        let isSelectedOption = thi.state.isSelectedOption;
        if (thi.state.uploadManual) {
            isSelectedOption = isSelectedOption;
        } else {
            isSelectedOption = true
        }


        let isValidResume = true;
        if (thi.state.uploadManual) {
            isValidResume = true;
        } else {
            if (self.createQuestionCsv.csv === "") {
                isValidResume = false
            } else {
                console.log(self.createQuestionCsv.csv.files[0]["name"], "file..")
                switch ((self.createQuestionCsv.csv.files[0]["name"].match(/\.([^\.]+)$/i)[1]).toLowerCase()) {
                    case 'csv':
                        // e.target.parentElement.classList.remove("has-error");
                        isValidResume = true;
                        break;
                    default:
                        // e.target.parentElement.classList.add("has-error");
                        isValidResume = false;
                        break;
                }
            }
        }

        console.log(isValidResume)
        if (e.target.checkValidity() && isSelectedOption && isValidResume) {
            if (thi.state.uploadManual) {
                const options = self.options;
                let newOptions = [];
                for (let i in options) {
                    const images = options[i]["images"];
                    let newImages = [];
                    for (let imageIndex in images) {
                        newImages.push({
                            url: images[imageIndex]
                        })
                    }
                    newOptions.push({
                        value: options[i]["title"],
                        type: newImages.length === 0 ? "string" : "images",
                        is_correct: options[i]["selected"],
                        images: newImages
                    })
                }
                ;
                const allQuestionImages = self.question.images;
                let newQuestionImages = [];
                for (let i in allQuestionImages) {
                    newQuestionImages.push({
                        url: allQuestionImages[i]
                    })
                }
                ;
                const body = {
                    title: self.question.title,
                    type: newQuestionImages.length === 0 ? "string" : "images",
                    options: newOptions,
                    images: newQuestionImages
                };
                if (self.location.pathname.match("/edit")) {
                    self.dispatch(editQuestionDetails(self.match.params.pool_id, this.props.match.params.question, body));
                } else {
                    self.dispatch(addQuestionToPool(self.match.params.pool_id, body));
                }
            } else {
                const fileInput = document.getElementById("uploadQuestionsCsv");
                const file = fileInput.files[0];
                self.dispatch(uploadCsv(file, self.match.params.pool_id))
            }
        } else {
            if (thi.state.uploadManual) {
                if (!isSelectedOption) {
                    thi.setState({isSelectedOptionError: true})
                }
            } else {
                if (!isValidResume) {
                    if (self.createQuestionCsv.csv === "") {
                        document.getElementsByName("csv")[0].parentElement.classList.add("has-error");
                    } else {
                        switch ((self.createQuestionCsv.csv.files[0]["name"].match(/\.([^\.]+)$/i)[1]).toLowerCase()) {
                            case 'csv':
                                document.getElementsByName("csv")[0].parentElement.classList.remove("has-error");
                                break;
                            default:
                                document.getElementsByName("csv")[0].parentElement.classList.add("has-error");
                                return 0
                        }
                    }
                }
            }
            const invalidElmsInput = document.querySelectorAll(".question-form .form-group input:invalid");
            console.log(invalidElmsInput, "invalid inputs......")
            for (let i = 0; i < invalidElmsInput.length; i++) {
                invalidElmsInput[i].parentElement.classList.add("has-error")
            }
        }
    }

    addOption() {
        let options = this.props.options;
        if (options.length <= 4) {
            options.push({
                title: "",
                images: [],
                checked: false
            });
            this.props.dispatch(changeOption(options))
        }
        else {
            createNotification('error', "You can only add upto 5 options.");
        }
    }

    componentWillReceiveProps(nextProps) {
        const thi = this;
        if (this.props.options !== nextProps.options) {
            const options = nextProps.options;
            for (let i in options) {
                if (options[i]["selected"]) {
                    thi.setState({
                        isSelectedOption: true,
                        isSelectedOptionError: false
                    })
                }
            }
        }
        if (nextProps.addImageMessage !== "") {
            if (nextProps.error) {
                createNotification('error', nextProps.addImageMessage);
                nextProps.dispatch(clearStatus());
            } else {
                createNotification('success', nextProps.addImageMessage);
                nextProps.dispatch(clearStatus());
            }
        }
        if (nextProps.deleteImageMessage !== "") {
            if (nextProps.error) {
                createNotification('error', nextProps.deleteImageMessage);
                nextProps.dispatch(clearStatus());
            } else {
                createNotification('success', nextProps.deleteImageMessage);
                nextProps.dispatch(clearStatus());
            }
        }
        if (nextProps.addQuestionToPoolMessage !== "") {
            if (nextProps.error) {
                createNotification('error', nextProps.addQuestionToPoolMessage);
                nextProps.dispatch(clearStatus());
            } else {
                createNotification('success', nextProps.addQuestionToPoolMessage);
                nextProps.history.push("/dashboard/pool/" + nextProps.match.params.pool_id + "/details");

            }
        }
        if (nextProps.editQuestionMessage !== "") {
            if (nextProps.error) {
                createNotification('error', nextProps.editQuestionMessage);
                nextProps.dispatch(clearStatus());
            } else {
                createNotification('success', nextProps.editQuestionMessage);
                nextProps.history.push("/dashboard/pool/" + nextProps.match.params.pool_id + "/details");
            }
        }
        if (nextProps.uploadCsvMessage !== "") {
            if (nextProps.error) {
                createNotification('error', nextProps.uploadCsvMessage);
                nextProps.dispatch(clearStatus());
            } else {
                createNotification('success', nextProps.uploadCsvMessage);
                nextProps.history.push("/dashboard/pool/" + nextProps.match.params.pool_id + "/details");
            }
        }
    }

    deleteImage(type, parentIndex, childIndex, image) {
        this.props.dispatch(deleteImage(type, parentIndex, childIndex, image))
    }

    onChange(e, type, index) {
        this.props.dispatch(clearStatus());
        this.setState({isSelectedOptionError: false});
        const self = this.props;
        checkValidation(e);
        let newState = {};
        if (type === "question") {
            if (e.target.name === "image") {
                const fileInput = document.getElementById('question_image');
                const file = fileInput.files[0];
                self.dispatch(addImage(file, type, index))
            } else {
                newState = Object.assign(self.question, {
                    [e.target.name]: e.target.value
                });
                self.dispatch(changeQuestion(newState))
            }
        } else {
            if (e.target.name === "image") {
                const fileInput = document.getElementById('option_image' + index);
                const file = fileInput.files[0];
                const type = "option";
                self.dispatch(addImage(file, type, index))
            } else {
                const options = self.options;
                if (e.target.name === "selected") {
                    this.setState({isSelectedOption: true});
                    for (let i in options) {
                        if (i !== index) {
                            options[i]["selected"] = false;
                        }
                    }
                }
                options[index][e.target.name] = e.target.name === "selected" ? true : e.target.value;
                self.dispatch(changeOption(options))
            }
        }
    }

    handleChange(e) {
        if (e.target.value === "") {
            e.target.parentElement.classList.add("has-error");
            const newRegistrationForm = Object.assign(this.props.createQuestionCsv, {
                csv: ""
            });
            this.props.dispatch(changeCreateQuestionCsvForm(newRegistrationForm));
        } else {
            switch ((e.target.value.match(/\.([^\.]+)$/i)[1]).toLowerCase()) {
                case 'csv':
                    e.target.parentElement.classList.remove("has-error");
                    this.props.dispatch(changeCreateQuestionCsvForm(Object.assign(this.props.createQuestionCsv, {csv: document.getElementById('uploadQuestionsCsv')})));
                    break;
                default:
                    e.target.parentElement.classList.add("has-error");
                    this.props.dispatch(changeCreateQuestionCsvForm(Object.assign(this.props.createQuestionCsv, {resume: ""})));
                    break
            }

        }


    }

    componentDidMount() {
        this.show_manual();
    }

    show_csv() {
        this.setState({
            uploadManual: false
        });
    }

    show_manual() {
        this.setState({
            uploadManual: true
        });
    }

    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard"
                                       childRoute={this.props.location.pathname.match("/edit") ? "Edit Question" : "Add Question"}/>
                <BarLoaderSpinner pageLoading={false}/>
                {
                    (!this.props.pageLoading && this.props.message !== "") &&
                    <div style={{color: "red"}}>{this.props.message}</div>
                }
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="pool-form-wrapper">
                            <h4 className="content-heading">{this.props.location.pathname.match("/edit") ? "Edit Question" : "Add Question"}</h4>
                            <div className="divider"></div>
                            <form className="create-pool-form question-form"
                                  onSubmit={this.submitAddQuestionToPoolForm.bind(this)}
                                  noValidate={true}>
                                <div className="row" id="writeQuestion">
                                    <div className="col-lg-6 col-md-8 col-sm-12">
                                        <div className="row mar-b-3">
                                            <div className="col-md-6 col-xs-12 col-sm-12">
                                                <label className="cstm-radio">Add Question manually
                                                    <input type="radio" name="radio" defaultChecked={true}
                                                           onClick={this.show_manual.bind(this)}/> <span
                                                        className="checkmark"></span>
                                                </label>
                                            </div>
                                            <div className="col-md-6 col-xs-12 col-sm-12">
                                                <label className="cstm-radio">Upload CSV File
                                                    <input type="radio" name="radio"
                                                           onClick={this.show_csv.bind(this)}/> <span
                                                        className="checkmark"></span>
                                                </label>
                                            </div>
                                        </div>
                                        {
                                            this.state.uploadManual &&
                                            <div>
                                                <div className="row" id="writeQuestion">
                                                    <div className="col-md-12 col-xs-12 col-sm-12">
                                                        <div className="form-group">
                                                            <label className="control-label mb-5">Question Title<span className="req">*</span></label>
                                                            <input type="text" name="title"
                                                                   minLength={3}
                                                                   pattern={"([a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+\\s)*[a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+$"}
                                                                   autoComplete={"off"}
                                                                   className="form-control"
                                                                   required={true}
                                                                   onChange={(e) => this.onChange(e, "question", "")}
                                                                   value={this.props.question.title}
                                                                   placeholder="Question Title"/>
                                                            <p className="with-error">Please enter question title
                                                                (Min 3 characters required. Only characters,
                                                                numbers and special symbols are allowed).</p>
                                                        </div>
                                                        <div className="custom-image-uploader">
                                                            <div className="custom-img-box">
                                                                <div><i className="material-icons">file_upload</i><span>Upload Image</span>
                                                                </div>
                                                                <input type="file" name="image" id={"question_image"}
                                                                       accept=".png, .jpg, .jpeg"
                                                                       onChange={(e) => this.onChange(e, "question", "")}/>
                                                            </div>
                                                            <div className="custom-img-preview">
                                                                <ul className="img-preview-ul">
                                                                    {
                                                                        this.props.question.images.map((d, i) => (
                                                                            <li key={i}>
                                                                                <div className="prev-img-box">
                                                                                    <div
                                                                                        className="image-overlay"></div>
                                                                                    <img src={d} alt="image"/>
                                                                                    <div
                                                                                        className="image-dlt-details fadeIn-top">
                                                                                        <i className="material-icons"
                                                                                           onClick={() => this.deleteImage("question", "", i, d)}>delete</i>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div className="col-md-12 col-xs-12 col-sm-12">
                                                        {
                                                            this.props.options.map((d, i) => (
                                                                <div>
                                                                    <div className="form-group">
                                                                        <label className="cstm-checkbox">
                                                                            <input type="checkbox" name="selected"
                                                                                   onChange={(e) => this.onChange(e, "option", i)}
                                                                                   checked={d.selected}
                                                                                   value={d.selected}/>Option {i + 1}<span className="checkmark"></span>
                                                                        </label>
                                                                        <label>
                                                                               {"Option "+(i+1)+" Title"}<span className="req">*</span>
                                                                        </label>
                                                                        <input type="text" name="title"
                                                                               minLength={3}
                                                                               pattern={"([a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+\\s)*[a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+$"}
                                                                               autoComplete={"off"}
                                                                               className="form-control"
                                                                               value={d.title}
                                                                               onChange={(e) => this.onChange(e, "option", i)}
                                                                               placeholder={"Option" + (i + 1)}
                                                                               required={true}/>
                                                                        <p className="with-error">Please enter title
                                                                            (Min 3 characters required. Only characters,
                                                                            numbers and special symbols are
                                                                            allowed).</p>

                                                                    </div>
                                                                    <div className="custom-image-uploader">
                                                                        <div className="custom-img-box">
                                                                            <div><i
                                                                                className="material-icons">file_upload</i><span>Upload Image</span>
                                                                            </div>
                                                                            <input type="file" name="image"
                                                                                   accept="image/*"
                                                                                   id={"option_image" + i}
                                                                                   onChange={(e) => this.onChange(e, "option", i)}/>
                                                                        </div>
                                                                        <div className="custom-img-preview">
                                                                            <ul className="img-preview-ul">
                                                                                {
                                                                                    d.images.map((image, imageIndex) => (
                                                                                        <li key={imageIndex}>
                                                                                            <div
                                                                                                className="prev-img-box">
                                                                                                <div
                                                                                                    className="image-overlay"></div>
                                                                                                <img src={image}
                                                                                                     alt={"image" + i}/>
                                                                                                <div
                                                                                                    className="image-dlt-details fadeIn-top">
                                                                                                    <i className="material-icons"
                                                                                                       onClick={() => this.deleteImage("option", i, imageIndex, image)}>delete</i>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                    ))
                                                                                }
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                        <div className="right">
                                                            <button type="button" className="btn"
                                                                    onClick={this.addOption.bind(this)}>Add
                                                                option
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {
                                            !this.state.uploadManual &&
                                            <div className="row" id="uploadCSV">
                                                <div className="col-md-12 col-xs-12 col-sm-12">
                                                    <div className="form-group">
                                                        <label className="subtitle">Upload Your Questions<span className="req">*</span></label>
                                                        <div className="csv-upload-container form-group">
                                                            <input type="file" name="csv"
                                                                   accept="csv"
                                                                   required={true}
                                                                   onChange={this.handleChange.bind(this)}
                                                                   id="uploadQuestionsCsv"
                                                                   className="csv-upload-input"/>
                                                            {
                                                                !!this.props.createQuestionCsv.csv &&
                                                                <p style={{padding: "30px", textAlign: "center"}}>{this.props.createQuestionCsv.csv.files[0]["name"]}</p>
                                                            }
                                                            <p className="with-error" style={{textAlign: "center"}}>Please upload valid csv file.</p>
                                                            <div className="csv-upload-box"><i
                                                                className="material-icons">file_upload</i><span>Upload File</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                {
                                    this.state.isSelectedOptionError &&
                                    <p style={{color: "red"}}>You have not selected any option.</p>
                                }
                                <button name="submit" disabled={this.props.pageLoading ? true : false}
                                        className="btn mar-t-2" type="submit">SUBMIT
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <NotificationContainer/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {
        createQuestionCsv,
        message,
        pageLoading, status, error,
        addImageMessage, deleteImageMessage, question, options,
        addQuestionToPoolMessage,
        editQuestionMessage,
        uploadCsvMessage
    } = state.poolReducer;
    console.log(state.poolReducer, "state.poolReducer");
    return {
        createQuestionCsv,
        message,
        pageLoading, status, error,
        addImageMessage, deleteImageMessage, question, options,
        editQuestionMessage,
        addQuestionToPoolMessage,
        uploadCsvMessage,
        state
    }
}

export default withRouter(connect(mapStateToProps)(AddQuestionsToPool))
