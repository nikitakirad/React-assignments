import React, { Component } from 'react';
import classes from './FormGenerator.module.css'
class FormGenerator extends Component{
    state={
        data:{
            email:{
                isEmail: true,
                value:'',
                errormsg:'',
                valid:false,
    
            },
            password:{
                isPassword: true,
                value:'',
                errormsg:'',
                valid:false,
            }
        },
        formisvalid:false
    }

    inputHandler=(event,inputIdentifier)=>{
        const updatedData = {
            ...this.state.data
        };
        const updatedFormElement = { 
            ...updatedData[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        
        let isValid = true;

        if (inputIdentifier === 'email' && updatedFormElement.isEmail) {

            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(updatedFormElement.value) && isValid
            if(!isValid)
                updatedFormElement.errormsg="please enter value email";
            else
                updatedFormElement.errormsg="";


        }
        if (inputIdentifier === 'password' && updatedFormElement.isPassword) {
            const pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
            isValid = pattern.test(updatedFormElement.value) && isValid;
            if(!isValid)
                updatedFormElement.errormsg="Min-length must be 6,must contain 1 numeric value and special character";
            else
                updatedFormElement.errormsg="";

        }
        updatedFormElement.valid=isValid;
        updatedData[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        
        for (let inputIdentifier in updatedData) {
            formIsValid = updatedData[inputIdentifier].valid && formIsValid;
        }
        this.setState({data:updatedData,formisvalid:formIsValid});
        
    }
    submitHandler=(event)=>{
        event.preventDefault();
        this.props.history.push('/home');
    }
    render(){
        return(
            <div className={classes.FormData}>
                <form onSubmit={this.submitHandler}>
                    <input className={classes.Input} type="text" placeholder="Your Email" onChange={(event)=>this.inputHandler(event,'email')}/>
                    {this.state.data['email'].errormsg.length > 0 && <span style={{'color':'red'}}>{this.state.data['email'].errormsg}</span>}    
                    <input className={classes.Input} type="password" placeholder="Your Password" onChange={(event)=>this.inputHandler(event,'password')}/>
                    {this.state.data['password'].errormsg.length > 0 && <span style={{'color':'red'}}>{this.state.data['password'].errormsg}</span>}<br/>
                    <button 
                        className={[classes.Button, classes['Success']].join(' ')}
                        disabled={!this.state.formisvalid}>SUBMIT
                    </button>
                </form>
            </div>
        )
    }
}

export default FormGenerator;