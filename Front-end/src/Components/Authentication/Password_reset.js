import React, {useState} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import AlertPopup from '../Global/AlertPopup';
import Inputone from '../Global/Inputone';
import FormLoader from '../Global/FormLoader';
import { HOST_URL } from "../../Settings";

const Password_reset = () => {
    const [email, setEmail] = useState('');
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
    
    const handleSubmit = e => {
        e.preventDefault()
        setSubmitted(true)
        const url = `${HOST_URL}/rest-auth/password/reset/`
            axios.post(url ,{'email':email})
            .then(resp=>{
                console.log(resp.data)
                setSubmitted(false)
                alertHandleClick('success', 'Password reset email has been sent.')
            })
            .catch(error=>{
                console.log(error)
                if (error.response.data.email){
                    alertHandleClick('error', error.response.data.email[0])
                }
                else{
                    alertHandleClick('error', 'An error occur. Please try again.')
                } 
                setSubmitted(false)
            })
    }    
    
    return(
        <>
       <h1>Password Reset</h1>
        <h6>Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.</h6>
        <form onSubmit={handleSubmit}>
            <div class="input-data">
                <Inputone type="email" value={email} onChange={(e)=>setEmail(e.target.value)} name='email'  label='E-Mail' />
                <div class="underline"></div>
                <label>E-Mail</label>
            </div>
           <button class="form_btn">
           { submitted ?
           <FormLoader/>
           :
           'Reset my password'
           }
           </button>
        </form>
        <p class='pcom'><Link to='/accounts/signup'>Create New Account</Link> | <Link to='/accounts/login'> Back To Login </Link> </p>
        { alertOpen &&
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

export default Password_reset;