import React from'react' 
const CustomCard = props => {
    return (
      <div style={{padding: 6}}>
        <header>
          <div style={{fontSize: 14, fontWeight: 'bold'}}>{props.title}</div>

        </header>
        <div style={{fontSize: 12 }}>


            <div
              style={{
                paddingLeft:4,
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                flexWrap: 'wrap',
                backgroundColor:'#dedddd',
                marginLeft:3,
                width:65,
                borderRadius:4,
                fontSize:13
              }}>
             {props.date}

            </div>

        </div>
        <div style={{fontSize :'13px',display: 'flex', justifyContent:'flex-end'}} >{props.comment}<i class="fa fa-comment-o" style={{marginLeft:5}}  ></i></div>
      </div>
    )
  }
  export default CustomCard;