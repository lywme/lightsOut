import React,{Component} from 'react';
import './Lightsout.css'
import Block from './Block';

class Lightsout extends Component{
    constructor(props)
    {
        super(props);
        this.state={matrix:[],tryTimes:0};
    }

    componentWillMount(){
        let matrix=[];
        for(let i=0;i<this.props.num;i++)
        {
            matrix.push(new Array(this.props.num));
        }

        for(let i=0;i<this.props.num;i++)
        {
            for(let j=0;j<this.props.num;j++)
            {
                matrix[i][j]=Math.floor(Math.random()*2);
                //matrix[i][j]=Math.random()<0.25?1:0;
            }
        }

        //console.log(matrix);
        
        //测试作弊专用 for cheat test
        //matrix=[[0,0,0,1,0],[0,0,1,1,1],[0,0,0,1,0],[0,0,0,0,0],[0,0,0,0,0]];
        this.setState({matrix:matrix});
    }


    blockClick=(index)=>{
        //get the index of block clicked
        //console.log(index);
        let numIndex=index.split('');
        numIndex=[parseInt(numIndex[0]),parseInt(numIndex[1])];
        console.log(numIndex);


        //affect + area
        const above=[numIndex[0]-1,numIndex[1]];
        const below=[numIndex[0]+1,numIndex[1]];
        const left=[numIndex[0],numIndex[1]-1];
        const right=[numIndex[0],numIndex[1]+1]
        //console.log("above:"+above+"."+"below:"+below+"."+"left:"+left+"."+"right:"+right+".")

        let matrix=this.state.matrix;
        //改变影响区域中的值 0变1，1变0
        if(above[0]>=0&&above[0]<matrix.length&&above[1]>=0&&above[1]<matrix.length)
        {
            matrix[above[0]][above[1]]===0?matrix[above[0]][above[1]]=1:matrix[above[0]][above[1]]=0;
        }


        //改变影响区域中的值 0变1，1变0
        if(below[0]>=0&&below[0]<matrix.length&&below[1]>=0&&below[1]<matrix.length)
        {
            matrix[below[0]][below[1]]===0?matrix[below[0]][below[1]]=1:matrix[below[0]][below[1]]=0;
        }

        //改变影响区域中的值 0变1，1变0
        if(left[0]>=0&&left[0]<matrix.length&&left[1]>=0&&left[1]<matrix.length)
        {
            matrix[left[0]][left[1]]===0?matrix[left[0]][left[1]]=1:matrix[left[0]][left[1]]=0;
        }

        //改变影响区域中的值 0变1，1变0
        if(right[0]>=0&&right[0]<matrix.length&&right[1]>=0&&right[1]<matrix.length)
        {
            matrix[right[0]][right[1]]===0?matrix[right[0]][right[1]]=1:matrix[right[0]][right[1]]=0;
        }

        //改变影响区域中的值 0变1，1变0
        matrix[numIndex[0]][numIndex[1]]===0?matrix[numIndex[0]][numIndex[1]]=1:matrix[numIndex[0]][numIndex[1]]=0;

        //console.log(matrix);
        this.setState((pre)=>({matrix:matrix,tryTimes:pre.tryTimes+1}));
    }

    isWin=()=>{
        let matrix=this.state.matrix;
        for(let i=0;i<this.props.num;i++)
        {
            for(let j=0;j<this.props.num;j++)
            {
                if(matrix[i][j]===1)
                {
                    return false;
                }
            }
        }
        return true;
    }
    
    render(){
    
        let matrix=[];
        for(let i=0;i<this.props.num;i++)
        {
            for(let j=0;j<this.props.num;j++)
            {
                if(this.state.matrix[i][j]===0)
                {
                    matrix.push(<Block key={i+''+j} click={()=>this.blockClick(i+''+j)}/>);
                }
                else
                {
                    matrix.push(<Block key={i+''+j} click={()=>this.blockClick(i+''+j)} isLit/>);
                }
            }
        }
        
        return (
            <div class="container">
                <span className="neon-orange">Lights</span>
                <span className="neon-blue">Out</span>
                {!this.isWin()?
                <div><div className="grid">
                    {matrix}
                </div><p className="neon-info">Number of tries: {this.state.tryTimes}</p><button onClick={()=>window.location.reload()}>Reset game.</button></div>:<div><p className="neon-info">You win with {this.state.tryTimes} tries !!!</p><button onClick={()=>window.location.reload()}>Play again.</button></div>
                }
            </div>
        );
    }
}

export default Lightsout;