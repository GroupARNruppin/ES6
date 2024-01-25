import { Component } from "react";
import "./CCQ1.css";

export default class CCQ1 extends Component{
    constructor(props){
        super(props);

        this.state={
            bgColor: ""
        };
    }
    
    btnChangeColor = (color) => {
        this.setState({
            bgColor: color
        })        
    }
    
    render(){
        const colors = ['red', 'gray', 'orange', 'yellow', 'green' ,'lightblue', 'pink', 'black']
        return(
            <div className="color-buttons-container" style={{ backgroundColor: this.state.bgColor}}>
                {colors.map((color) => (
                    <button 
                    onClick={() =>{this.btnChangeColor(color)}} className ="q1-btns">
                        {color}
                    </button>
                ))}
            </div>
        );
    }
}
