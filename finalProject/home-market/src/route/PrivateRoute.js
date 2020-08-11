import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import statusTypes from "../constants/statusTypes";


const PrivateRoute = ({component: Component, ...rest}) => {
  const loginStatus = useSelector(state => state.login.status);
    //If the loginStatus is unset we must wait to get the new state that could be logged in or unauthorized.
    return (
        <Route {...rest} render={props => (
            loginStatus === statusTypes.LOGGED_IN ?
                <Component {...props} />
            : loginStatus === statusTypes.UNSET 
            ? 
            <></>
            :
            <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;
