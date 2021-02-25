import React, {useState} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import AlertPopup from '../Global/AlertPopup';
import FormLoader from '../Global/FormLoader';
import { HOST_URL } from "../../Settings";

const Email_confirm = (props) => {
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
        const url = `${HOST_URL}/rest-auth/registration/verify-email/`
            axios.post(url ,{'key':props.match.params.key})
            .then(resp=>{
                console.log(resp.data)
                const text = <span>Email verified successfully. <Link style={{color:'yellow'}} to='/accounts/login'>Login</Link></span>
                alertHandleClick('success', text)
                setSubmitted(false)
            })
            .catch(error=>{
                console.log(error)
                const text = <span>This e-mail confirmation link expired or is invalid. Please <Link style={{color:'yellow'}} to='/accounts/verify-email'>issue a new e-mail confirmation request</Link>.</span>
                alertHandleClick('error', text)
                setSubmitted(false)
            })
    }    
    
    
    return(
        <>
        <h1>Confirm E-mail Address</h1>
        <h6>Please confirm that jaykhandelwal8989@gmail.com is an e-mail address for user.</h6>
        <form onSubmit={handleSubmit}>
            <button class="form_btn" type="submit">
            { submitted ?
            <FormLoader/>
            :
            'Confirm'
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

export default Email_confirm;