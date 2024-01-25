import { Component } from "react";
import "./CCQ2.css";

export default class CCQ2 extends Component{
    constructor(props){
        super(props);

    this.state={
            firstName: "",
            lastName: "",
            grade: "", 
            firstNameMessage: "",
            lastNameMessage: "",
            gradeMessage: "",
            passLabel:""
        };
    }

    firstNameMouseEnter = ()=>{
        this.setState({
            firstNameMessage:"Please enter your first name"
        });
    }

    firstNameMouseLeave = ()=>{
         this.setState({
            firstNameMessage:""
        });
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    lastNameMouseEnter = ()=>{
        this.setState({
            lastNameMessage:"Please enter your last name"
        });
    }

    lastNameMouseLeave = ()=>{
        this.setState({
            lastNameMessage:""
        });
    }
    

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    gradeMouseEnter = ()=>{
        this.setState({
            gradeMessage:"Please enter your grade"
        });
    }

    gradeMouseLeave = () => {
        var passMsg = "";
        this.setState((prevState) => {
            if (Number(prevState.grade) > 555 ) {
                passMsg = "You have passed!";
            } else if (Number(prevState.grade) > 0){
                passMsg = "You have failed! LOSER!!! Try again next year.";
            }
            
            return {
                gradeMessage: "", 
                passLabel: passMsg
            };
        });
    };
    
    chgGrade=(e)=>{
        
        this.setState({grade:e.target.value})
    }

    
    render(){
        return(
        <div>
            <h4 style={{color:"red"}}>{this.state.firstNameMessage}</h4>
            First name: <input type="text" onFocus={this.firstNameMouseEnter} onBlur={this.firstNameMouseLeave} />
            <h4 style={{color:"red"}}>{this.state.lastNameMessage}</h4>
            Last name: <input type="text" onFocus={this.lastNameMouseEnter} onBlur={this.lastNameMouseLeave} />
            <h4 style={{color:"red"}}>{this.state.gradeMessage}</h4>
            Grade: <input type="text" onFocus={this.gradeMouseEnter} onBlur={this.gradeMouseLeave} onChange={this.chgGrade}/>
            <h4>{this.state.passLabel}</h4>
        </div>
        );
    }
}

