import React from 'react';
import { Route, Link } from "react-router-dom";

import Login from '../Components/Authentication/Login';
import Signup from '../Components/Authentication/Signup';
import Password_reset from '../Components/Authentication/Password_reset';
import Password_reset_from_key from '../Components/Authentication/Password_reset_from_key';
import Email_confirm from '../Components/Authentication/Email_confirm';

const Authentication = () => {
    return(
    <main class="login_main">
        <section class="login_section">
            <Route exact path='/accounts/login' component={Login} />
            <Route exact path='/accounts/verify-email' component={Login} verify={true}>
                <Login verify_url={true} >
                    <p class='pcom'><Link to='/accounts/signup'>Create New Account</Link> | <Link to='/accounts/login'> Back To Login </Link> </p>
                </Login>
            </Route>
            <Route exact path='/accounts/signup' component={Signup}/>
            <Route exact path='/accounts/password/reset' component={Password_reset}/>
            <Route exact path='/accounts/password/recovery/:ud/:tkn/' component={Password_reset_from_key}/>
            <Route exact path='/accounts/confirm-email/:key' component={Email_confirm}/>
        </section>
    </main>
        );
};

export default Authentication;