import React from 'react';
import {Route, Redirect} from "react-router-dom";

import {isAuthed} from "../tokenUtils";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => {
            const authedId = isAuthed();
            console.log(authedId);
            console.log(props);
            return authedId ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login"
                        // state: { from: props.location }
                    }}
                />
            );
        }

        }
    />
);

export default PrivateRoute;