import React, {useState} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import AlertPopup from '../Global/AlertPopup';
import Inputone from '../Global/Inputone';
import FormLoader from '../Global/FormLoader';
import { HOST_URL } from "../../Settings";

const Signup = () => {
    const loginData = {
        email:'',
        full_name:'',
        username: '',
        password1:'',
        password2:'',
    }
    
    const [credentials, setCredentials] = useState(loginData);
    const [submitted, setSubmitted] = useState(false);
    
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertData, setAlertData] = useState({});
    
    const alertHandleClick = (type, message) => {
        setAlertOpen(true);
        setAlertData({
            type:type,
            message:message
        })
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setAlertOpen(false);
    };    
    
    const getvalueHandler = (e) => {
      setCredentials({
          ...credentials,
          [e.target.name]:e.target.value
      })
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        setSubmitted(true)
        const url = `${HOST_URL}/rest-auth/registration/`;
        axios.post(url, credentials)
        .then(resp=>{
            console.log(resp.data)
            setSubmitted(false)
            alertHandleClick('success', `Please verify your account from the link we sent to ${credentials.email}.`)
        })
        .catch(error=>{ 
            console.log(error)
            if (error.response.data.non_field_errors){
                alertHandleClick('error', error.response.data.non_field_errors[0])
            }
            else if (error.response.data.password){
                alertHandleClick('error', error.response.data.password[0])
            }
            else if (error.response.data.password1){
                alertHandleClick('error', error.response.data.password1[0])
            }
            else if (error.response.data.email){
                alertHandleClick('error', error.response.data.email[0])
            }
            else if (error.response.data.username){
                alertHandleClick('error', error.response.data.username[0])
            }
            else{
                alertHandleClick('error','Something wents wrong. Plaese try again')
            }
            setSubmitted(false)
        })
    }        
    
    return(
        <>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div class="input-data">
                    <Inputone value={credentials.full_name} onChange= {getvalueHandler} name='full_name' label='FullName'/>
                </div>              
                <div class="input-data">
                    <Inputone value={credentials.username} onChange= {getvalueHandler} name='username' label='Username'/>
                </div>              
                <div class="input-data">
                    <Inputone type='email' value={credentials.email} onChange= {getvalueHandler} name='email' label='E-Mail' />
                </div>              
                <div class="input-data">
                    <Inputone type='password' value={credentials.password1} onChange= {getvalueHandler} name='password1' label='Password'/>
                </div>              
                <div class="input-data">
                    <Inputone type='password' value={credentials.password2} onChange= {getvalueHandler} name='password2' label='Confirm Password'/>
                </div>              
               <button class="form_btn">
                { submitted ?
                <FormLoader/>
                :
                 'Signup'
                }
               </button>
            </form>
            <p class='have_signup'>Have an account? <Link style={{color:'#4158d0'}} to='/accounts/login'> Login </Link></p>
     
        { alertData &&
        <AlertPopup
        message={alertData.message}
        handleClose={handleClose}
        open={alertOpen}
        type={alertData.type}
        /> 
        }     
        </>
        );
};

export default Signup;