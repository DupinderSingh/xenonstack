import React, {Component} from 'react';
import { BarLoader } from 'react-spinners';

class BarLoaderSpinner extends Component{
    render() {
        return(
            <div className='sweet-loading'>
                <BarLoader
                    css=''
                    sizeUnit={"px"}
                    size={150}
                    color={'#0562e8'}
                    heightUnit='px'
                    widthUnit='%'
                    height={4}
                    width={100}
                    loading={this.props.pageLoading}
                />
            </div>
        )
    }
}

export default BarLoaderSpinner