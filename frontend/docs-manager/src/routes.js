import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import Search from './pages/Search';
import DocDetail from './pages/DocDetail';
import Upload from './pages/Upload';
import Signin from './pages/Signin';
import EditDocument from './pages/EditDocument';
import { isAuthenticated } from './services/auth';

const PrivateRoute = ({component : Component, ...rest}) => (
    <Route 
    {...rest}
    render={props =>
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: "/", state : {from : props.location}}} />
        )    
    }
    />
);

function Routes(){
    return(
        <Switch>
            <Route path='/' exact component={Search}/>
            <Route path='/detail/:id' component={DocDetail}/>
            <PrivateRoute path='/upload' component={Upload}/>
            <PrivateRoute path='/edit/:id' component={EditDocument}/>
            <Route path='/login' component={Signin}/>
        </Switch>
    )
};

export default Routes;