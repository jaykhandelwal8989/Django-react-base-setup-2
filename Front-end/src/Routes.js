import React, {useEffect} from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import Authentication from './Pages/Authentication';
import Home from './Pages/Home';

const BaseRouter = (props) => {  
    const location = useLocation();
    
    useEffect(()=>{
        switch (location.pathname){
            case '/accounts/login':
                document.title='Login'
                break;
            case '/accounts/signup':
                document.title='signup'
                break;
            case '/accounts/password/reset':
                document.title='Password Reset'
                break;
            case '/accounts/verify-email':
                document.title='verify-email'
                break;
            default:
                document.title='Authentication system'
            
        }
    }, [location])
    
    return(
      <Switch>
          <Route exact path={['/accounts/login', '/accounts/signup', '/accounts/password/reset', '/accounts/verify-email', '/accounts/confirm-email/:key', '/accounts/password/recovery/:ud/:tkn/', '/accounts/verify-email']} component={Authentication}/>

              <Route exact path='/' component={Home}/>
         
      </Switch>
      )
};


export default BaseRouter;