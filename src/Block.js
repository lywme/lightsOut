import React,{Component} from 'react';
import './Block.css'

class Block extends Component{
    constructor(props)
    {
        super(props);

    }


    render(){
        return (
            <div className={this.props.isLit?"blockLit":"blockNotLit"} onClick={this.props.click}>

            </div>
        );
    }
}

export default Block;