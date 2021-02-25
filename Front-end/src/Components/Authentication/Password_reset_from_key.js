import React, {useState} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import FormLoader from '../Global/FormLoader';
import Inputone from '../Global/Inputone';
import { HOST_URL } from "../../Settings";
import AlertPopup from '../Global/AlertPopup';

const Password_reset_from_key = (props) => {
    const initialData = {
        'uid':props.match.params.ud,
        'token':props.match.params.tkn,
        'new_password1': '',
        'new_password2': '',
    }
    const [passwords, setPasswords] = useState(initialData);
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
      setPasswords({
          ...passwords,
          [e.target.name]:e.target.value
      })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true)
        const url = `${HOST_URL}/rest-auth/password/reset/confirm/`;
        axios.post(url ,passwords)
            .then(resp=>{
                console.log(resp.data)
                setSubmitted(false)
                alertHandleClick('success', 'Password reset successfully.')
            })
            .catch(error=>{
                console.log(error)
                if (error.response.data.new_password2){
                    alertHandleClick('error', error.response.data.new_password2[0])
                }
                else if (error.response.data.uid){
                const text = <span>This forgot password link expired or is invalid. Please <Link style={{color:'yellow'}} to='/accounts/password/reset'>issue a new forgot password request</Link>.</span>
                alertHandleClick('error', text)
                }
                else if (error.response.data.token){
                const text = <span>This forgot password link expired or is invalid. Please <Link style={{color:'yellow'}} to='/accounts/password/reset'>issue a new forgot password request</Link>.</span>
                alertHandleClick('error', text)
                }
                else{
                    const text = <span>Something wents wrong. Please <Link style={{color:'yellow'}} to='/accounts/password/reset'>issue a new forgot password request</Link>.</span>
                    alertHandleClick('error', text)
                }
                setSubmitted(false)
            })
    }    
    
    return(
        <>
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>
            <div class="input-data">
                <Inputone type="password" value={passwords.new_password1} onChange= {getvalueHandler} name='new_password1' label='New Password'/>
            </div>              
            <div class="input-data">
                <Inputone type="password" value={passwords.new_password2} onChange= {getvalueHandler} name='new_password2' label='Confirm New Password'/>
            </div>              
           <button class="form_btn">
           {submitted ?
           <FormLoader/>
           :
           'Change Password'
           }
           </button>
        </form>
        <p class='pcom'><Link to='/accounts/signup'>Create New Account</Link> | <Link to='/accounts/login'> Back To Login </Link> </p>
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

export default Password_reset_from_key;