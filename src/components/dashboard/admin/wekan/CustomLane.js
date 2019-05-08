import React from 'react'
class CustomLane extends React.Component{
  constructor(props){
    super(props);
    this.state={
      editing:false,
      text:this.props.title
    }
  }
  edit=()=>{
    this.setState({editing:true})
  }
  save=()=>{
    let val=this.refs.newText.value;
    this.setState({text:val,
    editing:false})
  }
  renderNormal=()=>{
    return(
      <header
      style={{
        
        paddingBottom: 0,
        marginBottom: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <p style={{fontSize: 14, fontWeight: 'bold'}}>{this.state.text}</p>
            <div  style={{width: '30%', textAlign: 'right', fontSize: 13}}>
                <span   onClick={this.edit} ><i style={{fontSize:'18px',cursor:'pointer'}} className="material-icons">edit</i></span>
            </div>
      </header>
    )
  }
  renderForm=()=>{
    return(
    <header
    style={{
      
      paddingBottom: 0,
      marginBottom: 0,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}>
      <input style={{height: 26}} pattern="[a-zA-Z][a-zA-Z.\s]{2,}$" className="form-control" ref="newText" defaultValue={this.props.title} placeholder="enter title"/>
      <div  style={{width: '30%', textAlign: 'right', fontSize: 13}}>
          <button style={{cursor: 'pointer'}} onClick={this.save}>done</button>
      </div>
    </header>)
  }
  render(){
    return(
      <div>
        {
            this.state.editing ? this.renderForm():this.renderNormal()
            
        }
      </div>

    )
  }

}

 
export default CustomLane;