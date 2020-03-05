import React from 'react';
import {Redirect, Route} from "react-router-dom";

import {isAuthed} from "../tokenUtils";

const AuthRoute = ({...rest}) => (
    <Route
        {...rest}
        render={ props => {
            console.log(props);
            const authedId = isAuthed();
            if(authedId) console.log('authorized');
            console.log(authedId);
            console.log(props.location);

            return authedId ? (
                <Redirect
                    to={{
                        pathname: `/users/${authedId}`
                    }}
                />
            ) : (
                <Redirect to={{pathname: '/login'}}/>
            );
        }}
    />
);

export default AuthRoute;