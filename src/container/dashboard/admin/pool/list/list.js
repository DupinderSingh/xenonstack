import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AdminOnPageNavigation from '../../../../../components/dashboard/admin/on_page_navigation/on-page-navigation';
import {
    changeCreatePoolForm,
    clearAll,
    clearStatus,
    createPool,
    deletePool,
    editPool,
    getAllPool,
    selectedDeletePool
} from "../../../../../actions/dashboard/admin/pool/pool";
import createNotification from "../../../../../components/app/notification/notification";
import {NotificationContainer} from 'react-notifications';
import moment from 'moment';
import {checkValidation} from "../../../../../actions/app/app";
import DeleteDialogBox from "../../../../../components/app/dialogBox/delete-dialog-box";

class ListPool extends Component {
    componentWillMount() {
        this.props.dispatch(selectedDeletePool({}));
        this.props.dispatch(clearAll());
        this.props.dispatch(getAllPool());
    }

    submitCreateEditPoolForm(e) {
        e.preventDefault();
        const self = this.props;
        if (e.target.checkValidity()) {
            const body = {name: self.name};
            if (self.operation === "create") {
                self.dispatch(createPool(body));
            } else {
                const editPoolId = self.poolId;
                self.dispatch(editPool(editPoolId, body));
            }
        } else {
            const invalidElmsInput = document.querySelectorAll(".create-creating-pool.txt-form .form-group input:invalid");
            for (let i = 0; i < invalidElmsInput.length; i++) {
                invalidElmsInput[i].parentElement.classList.add("has-error")
            }
        }
    }

    onChange(e) {
        const self = this.props;
        checkValidation(e);
        const newState = Object.assign(self.container, {
            [e.target.name]: e.target.value
        });
        self.dispatch(changeCreatePoolForm(newState))
    }

    editPool(pool) {
        console.log(document.querySelectorAll(".create-creating-pool.txt-form .form-group")[0], "print...")
        document.querySelectorAll(".create-creating-pool.txt-form .form-group")[0].classList.remove("has-error");
        ;
        this.props.dispatch(changeCreatePoolForm(Object.assign(this.props.container, {name: pool.name}, {operation: "edit"}, {poolId: pool.id})));
        document.getElementsByClassName("overlay-edit-pool")[0].style.display = "block";
    }

    deletePool(e) {
        e.preventDefault();
        console.log(this.props, "props....");
        this.props.dispatch(deletePool(this.props.selected));
        if (!!document.getElementsByClassName("overlay-delete")[1]) {
            document.getElementsByClassName("overlay-delete")[1].style.display = "none";
        }
    }

    openDeletePoolDialog(pool) {
        this.props.dispatch(selectedDeletePool(pool));
        console.log(document.getElementsByClassName("overlay-delete"), "overlayyy")
        document.getElementsByClassName("overlay-delete")[1].style.display = "block";
    }

    closeDeletePoolDialog() {
        console.log(document.getElementsByClassName("overlay-delete"), "overllll")
        if (!!document.getElementsByClassName("overlay-delete")[1]) {
            document.getElementsByClassName("overlay-delete")[1].style.display = "none";
        }
    }

    createPool(pool) {
        console.log(document.getElementsByClassName("overlay-edit-pool")[0], document.getElementsByClassName("overlay"), "dfgdfg")
        document.querySelectorAll(".create-creating-pool.txt-form .form-group")[0].classList.remove("has-error");
        ;
        this.props.dispatch(changeCreatePoolForm(Object.assign(this.props.container, {name: ""}, {operation: "create"}, {poolId: ""})));
        document.getElementsByClassName("overlay-edit-pool")[0].style.display = "block";
    }

    closePopup() {
        if (!!document.getElementsByClassName("overlay-edit-pool")[0]) {
            document.getElementsByClassName("overlay-edit-pool")[0].style.display = "none";
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isPoolDeletedMessage !== "") {
            if (nextProps.error) {
                this.closePopup();
                createNotification('error', nextProps.isPoolDeletedMessage);
                nextProps.dispatch(clearStatus());
            } else {
                this.closePopup();
                createNotification('success', nextProps.isPoolDeletedMessage);
                nextProps.dispatch(getAllPool())
            }
        }
        if (nextProps.isPoolEditedMessage !== "") {
            if (nextProps.error) {
                this.closePopup();
                createNotification('error', nextProps.isPoolEditedMessage);
                nextProps.dispatch(clearStatus());
            } else {
                this.closePopup();
                createNotification('success', nextProps.isPoolEditedMessage);
                nextProps.dispatch(getAllPool())
            }
        }
        if (nextProps.isPoolCreatedMessage !== "") {
            if (nextProps.error) {
                this.closePopup();
                createNotification('error', nextProps.isPoolCreatedMessage);
                nextProps.dispatch(clearStatus());
            } else {
                this.closePopup();
                createNotification('success', nextProps.isPoolCreatedMessage);
                nextProps.dispatch(getAllPool())
            }
        }
    }

    render() {
        return (
            <div>
                <AdminOnPageNavigation parentRoute="Dashboard" childRoute="Manage Pool"/>
                <div className="mar-b-3">
                    <button className="btn" onClick={this.createPool.bind(this)}>Create Pool</button>
                </div>
                <div className="row">
                    {
                        !this.props.pageLoading && this.props.pools.length > 0 &&
                        (
                            this.props.pools.map((d, i) => (
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                        <div className="panel panel-warning card-view custom-panel pool-panel">
                                            <div className="panel-heading">
                                                <span style={{flex: "1", paddingRight: "10px"}}>{d.name}</span>
                                                <div className="pool-operation">
                                                    <a name="edit" href="JavaScript:void(0);"
                                                       onClick={() => this.editPool(d)}> <i
                                                        className="material-icons txt-light">mode_edit</i></a>
                                                    <a name="delete" href="JavaScript:void(0);"
                                                       onClick={() => this.openDeletePoolDialog(d)}><i
                                                        className="material-icons txt-light">delete</i></a>
                                                </div>
                                            </div>
                                            <div className="panel-wrapper collapse in">
                                                <div className="panel-body">
                                                    <div>
                                                        <span
                                                            className="txt-dark">created {moment(d.date * 1000).format('Do MMM YYYY')}</span>
                                                        <a className="view-pool" style={{cursor: "pointer"}}
                                                           onClick={() => this.props.history.push("/dashboard/pool/" + d.id + "/details")}>View
                                                            Pool</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))
                    }
                    {
                        (!this.props.pageLoading && this.props.pools.length === 0 && this.props.message === "") &&
                        <span>No Pool found</span>
                    }
                    {
                        this.props.message !== "" &&
                        <span>{this.props.message}</span>
                    }
                </div>
                <div id="popup1" className="overlay overlay-edit-pool">
                    <form className="create-creating-pool txt-form" onSubmit={this.submitCreateEditPoolForm.bind(this)}
                          noValidate={true}>
                        <div className="popup">
                            <div className="popup-heading">
                                <h4>{this.props.operation === "create" ? "Create New Pool" : "Edit Pool"}</h4>
                                <a className="close" onClick={this.closePopup}>&times;</a></div>
                            <div className="content">
                                <div className="form-group">
                                    <label className="control-label mb-5">Pool Name <span className="req">*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        autoComplete="off"
                                        minLength={3}
                                        maxLength={50}
                                        onChange={this.onChange.bind(this)}
                                        pattern={"([a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+\\s)*[a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+$"}
                                        className="form-control"
                                        value={this.props.name}
                                        placeholder="Pool Name"
                                        required={true}/>
                                    <p className="with-error">Please enter pool
                                        name (Min 3 characters required. Only
                                        characters, numbers and special symbols are
                                        allowed).</p>
                                </div>
                                <div className="btn-group text-right">
                                    <button type="submit" disabled={this.props.pageLoading ? true : false}
                                            className="btn">{this.props.operation === "create" ? "Create Pool" : "Edit Pool"}</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <DeleteDialogBox
                    formName="Delete Pool"
                    submitForm={this.deletePool}
                    operation="Delete Pool"
                    keyword={"Delete"}
                    closeForm={this.closeDeletePoolDialog}
                    pageLoading={this.props.pageLoading}
                    selected={this.props.deletePool.id}
                    name={this.props.deletePool.id}
                />
                <NotificationContainer/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {deletePool, pools, container, pageLoading, error, message, status, isPoolEditedMessage, isPoolDeletedMessage, isPoolCreatedMessage} = state.poolReducer;
    const {name, poolId, operation} = container;
    console.log(container, pageLoading, "pool...", "pageloading..")
    return {
        deletePool,
        name,
        operation,
        pools,
        container,
        poolId,
        pageLoading,
        error,
        message,
        status,
        isPoolEditedMessage,
        isPoolDeletedMessage,
        isPoolCreatedMessage
    }
}

export default withRouter(connect(mapStateToProps)(ListPool))