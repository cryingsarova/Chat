import React from 'react';
import { Route } from 'react-router-dom';
import UnAuthNavBar from './UnAuthNavBar';


const withAppLayout = Component => props => <UnAuthNavBar><Component {...props} /></UnAuthNavBar>;

export const AuthLayout = ({ component, ...props }) => {
    console.log('nav bar');
    return (
    <Route {...props} component={withAppLayout(component)}/>
    );
};