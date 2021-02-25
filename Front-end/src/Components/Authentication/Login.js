import React, {useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import axios from 'axios';

import AlertPopup from '../Global/AlertPopup';
import Inputone from '../Global/Inputone';
import FormLoader from '../Global/FormLoader';
import * as actions from '../../Store/Actions/Auth';
import { HOST_URL } from "../../Settings";
import axiosInstance from "../../Axios";

const variants_h1 = {
    hidden:{
        opacity:0,
        scale:0
    },
    visible:{
        opacity:1,
        scale:1.2,
        color:'#4158d0',
        textShadow: "3px 5px 8px #4158d0",
        transition:{
            duration: 1,
        }
    }
}

const variants_input = {
    hidden:{
        x:'100vw'
    },
    visible:{
        x:0,
        transition:{
            duration: 0.7,
            type:'spring'
        }
    }    
}

const variants_btn = {
    hidden:{
        x:'-100vw'
    },
    visible:{
        x:0,
        transition:{
            duration: 0.7,
            type:'spring'
        }
    }    
}

const Login = (props) => {
    const history = useHistory();
    const loginData = {
        verifier: '',
        password:''
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
    
    const verify_input = () => {
        if (/\@/.test(credentials.verifier)) {
            return {'email':credentials.verifier, 'password':credentials.password}
        }
        else{
            return {'username':credentials.verifier, 'password':credentials.password}
        }
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        setSubmitted(true)
        var url;
        if (props.verify_url){
          //  url = 'accounts/verify-email/'
            url = `${HOST_URL}/accounts/verify-email/`
        }
        else{
           // url = 'rest-auth/login/'
            url = `${HOST_URL}/rest-auth/login/`;
        }
        axios.post(url, verify_input())
        .then(resp=>{
            localStorage.setItem('access_token', resp.data.access);
            localStorage.setItem('refresh_token', resp.data.refresh);
			axiosInstance.defaults.headers['Authorization'] =
					'Bearer ' + localStorage.getItem('access_token');
          //  props.authSuccess(resp.data);
            console.log(resp.data)
            setSubmitted(false)
            if (props.verify_url){
                alertHandleClick('success', 'Verification E-mail has been sent.')
            }
            else{
                history.push('/')
            }
        })
        .catch(error=>{
            console.log(error)
            if (error.response.data.non_field_errors){
                if (error.response.data.non_field_errors[1]==='email'){
                    const text = <span>Email not verified. <Link style={{color:'yellow'}} to='/accounts/verify-email'>Verify Email </Link></span>
                    alertHandleClick('error', text)
                }
                else{
                alertHandleClick('error', error.response.data.non_field_errors[0])
                }
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
        <motion.h1 
        initial='hidden'
        animate='visible' 
        variants={variants_h1}
        >
            {props.verify_url ? 'Verify Email' : 'Login'}
        </motion.h1>
        <form onSubmit={handleSubmit}>
            <motion.div
            variants={variants_input}
            animate='visible'
            initial='hidden'
            class="input-data">
                <Inputone value={credentials.verifier} onChange= {getvalueHandler} name='verifier' label='Name' />
            </motion.div>              
            <motion.div
            variants={variants_input}
            animate='visible'
            initial='hidden'            
            class="input-data">
                <Inputone type='password' value={credentials.password} onChange= {getvalueHandler} name='password' label='Password' />
            </motion.div>              
           <motion.button 
           variants={variants_btn}
           initial='hidden'
           animate='visible'
           class="form_btn">
               { submitted ?
                <FormLoader/>
                :
                (props.verify_url ? 'Verify':'Login')
               }
           </motion.button>
        </form>
        <Link to='/accounts/password/reset' class='forgot_passd' >Forgot Password ?</Link>
        { props.children ?
            props.children
        :
            <p class='have_signup'>Don't have an account? <Link style={{color:'#4158d0'}} to='/accounts/signup'> Signup </Link> </p>
        }
        { alertOpen &&
        <AlertPopup
        message={alertData.message}
        handleClose={handleClose}
        open={alertOpen}
        type={alertData.type}
        /> 
        }
        <Link to='/' class='forgot_passd' >home ?</Link>      
        </>
        );
};

const mapDispatchToProps = dispatch => {
    return{
        authSuccess: user => dispatch(actions.authSuccess(user)),
    }
}

export default connect(null,mapDispatchToProps)(Login);
