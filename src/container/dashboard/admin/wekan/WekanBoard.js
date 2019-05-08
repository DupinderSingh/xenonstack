import React, {Component} from 'react'
import update from 'immutability-helper'
import {Board} from 'react-trello'
import CustomLaneHeader from '../../../../components/dashboard/admin/wekan/CustomLane'
import CustomCard from '../../../../components/dashboard/admin/wekan/CustomCard'

const data = require('../../../../static/json/data.json')
const handleDragStart = (cardId, laneId) => {
    console.log('drag started')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
}
class WekanBoard extends Component {
    state = {
        boardData: data ,
        eventBus: undefined
    }

    setEventBus = handle => {
        this.state.eventBus= handle
    }

    async componentWillMount() {

        const response = await this.getBoard()
        this.setState({boardData: response})
    }

    getBoard() {
        return new Promise(resolve => {
            resolve(data)
            console.log(data);
        })
    }

    shouldReceiveNewData = nextData => {
        console.log('New card has been added')
        console.log(nextData)
    }
   
    shouldReceiveNewData = nextData => {
        console.log('data has changed')
        console.log(nextData)
    }
    onCardClickEvent= cardId => {
        console.log(document.querySelectorAll(".create-creating-pool.txt-form .form-group")[0], "print...")
        document.querySelectorAll(".create-creating-pool.txt-form .form-group")[0].classList.remove("has-error");
        document.getElementsByClassName("overlay-edit-pool")[0].style.display = "block";
        return cardId
        

    }
    closePopup() {
        if (!!document.getElementsByClassName("overlay-edit-pool")[0]) {
            document.getElementsByClassName("overlay-edit-pool")[0].style.display = "none";
        }
    }

    render() {
        
        return (

            <>

                <div class="row">
                    <div class="col-lg-12 col-sm-12 col-md-12">
                        <div class="heading-bg">
                            <h4 class="txt-dark">
                                <a href="/dashboard">Dashboard</a><small>/<a href="/dashboard/board">Selection Process Board</a></small></h4>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-xs-12">
                       <div className="board-height">
                       {/* <button onClick={this.modifyCardTitle} style={{margin: 5}}>
                            Modify Lane Title
                        </button> */}
                        <Board
                                onDataChange={this.shouldReceiveNewData}
                                addCardLink={< ></>}
                                className="wekanBoardContainer"
                                data={this.state.boardData}
                                draggable
                                editable
                                hideCardDeleteIcon={true}
                                canAddLanes
                                onLaneAdd={t=> t.title= "" }
                                eventBusHandle={this.setEventBus}
                                handleDragStart={handleDragStart}
                                handleDragEnd={handleDragEnd}
                                onCardClick={()=>this.onCardClickEvent()}
                                customLaneHeader={<CustomLaneHeader />}
                                tagStyle={{fontSize: '80%'}}

                                customCardLayout
                                >
                                <CustomCard />
                        </Board>

                        </div>
                    </div>

                </div>
                <div id="popup1" className="overlay overlay-edit-pool">
                    <form className="create-creating-pool txt-form" noValidate={true}>
                        <div className="popup">
                            <div className="popup-heading">
                                <h4></h4>
                                <a className="close" onClick={this.closePopup}>&times;</a></div>
                            <div className="content">
                                <div className="form-group">

                                    <input
                                        type="text"
                                        name="name"
                                        autoComplete="off"
                                        minLength={3}
                                        maxLength={50}

                                        pattern={"([a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+\\s)*[a-zA-Z.!-”$%&’()*\\+,\\/;\\[\\\\\\]\\^_`{|}~]+$"}
                                        className="form-control"
                                         
                                        placeholder="Write Comment"
                                        required={true}/>
                                    <p className="with-error">Error.</p>
                                </div>
                                <div className="btn-group text-right">
                                    <button type="submit" disabled={this.props.pageLoading ? true : false}
                                            className="btn">Add Comment</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    {/* <div className="popup">
                            <div className="popup-heading">
                                <h5>Comments:</h5>
                            </div>
                    </div> */}
                </div>

            </>
        )
    }
}


export default WekanBoard
