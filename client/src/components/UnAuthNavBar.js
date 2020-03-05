import React from "react";
import {Route} from "react-router-dom";
import {
    MDBCard, MDBCol, MDBContainer,
    MDBNav,
    MDBNavItem,
    MDBNavLink, MDBRow
} from 'mdbreact';
import Login from "./Login";
import Register from "./Register";


const UnAuthNavBar = () => (
    <MDBContainer>
        <MDBRow>
            <MDBCol sm="9" md="7" lg="5" className="mx-auto">
                <MDBCard className='my-5'>
                    <div className="header pt-3 grey lighten-2">
                        <MDBRow className="d-flex justify-content-start">
                            <h3 className="deep-grey-text mt-3 mb-4 pb-1 mx-5">
                                Log In
                            </h3>
                        </MDBRow>
                    </div>
                    <MDBNav className='nav-tabs nav-fill'>
                        <MDBNavItem>
                            <MDBNavLink to='/login'>Login</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to='/register'>Register</MDBNavLink>
                        </MDBNavItem>
                    </MDBNav>

                    <Route exact path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
);

export default UnAuthNavBar;