import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import * as io from 'socket.io-client';

import AuthRoute from './components/AuthRoute';
import PrivateRoute from './components/PrivateRoute';
import {AuthLayout} from './components/AuthLayout';
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from './components/Chat'

import SocketContext from './SocketContext';

const socket = io('https://react-chat-application-01.herokuapp.com/');
// const socket = io('localhost:5000');

const App = () => (
    <SocketContext.Provider value={socket}>
        <Router>
            <Switch>
                <AuthRoute exact path='/'/>

                <AuthLayout path='/login' component={Login}/>
                <AuthLayout path='/register' component={Register}/>

                <PrivateRoute path="/users/:userId" component={Chat}/>
            </Switch>
        </Router>
    </SocketContext.Provider>
);

export default App;