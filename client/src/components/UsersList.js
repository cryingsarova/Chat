import React from 'react';
import {MDBCard, MDBCardHeader, MDBCardBody, MDBCardFooter} from "mdbreact";

import Search from './Search';
import './UsersList/UsersList.css';

const UsersList = ({users, setUsers, empty}) => (
    <MDBCard className="mb-sm-3 mb-md-0 contacts_card">
        <MDBCardHeader>
            <Search users={users} setUsers={setUsers} empty={empty}/>
        </MDBCardHeader>
        <MDBCardBody className="contacts_body">
            <ul className="contacts">
                {users ?
                    users.map(({name}, idx) => (
                        <li key={idx}>
                            <div className="d-flex bd-highlight">
                                <div className="img_cont">
                                    <span className="rounded-circle user_img"><i
                                        className="fas fa-user fa-4x"></i></span>
                                    <span className="online_icon"></span>
                                </div>
                                <div className="user_info">
                                    <span>{name}</span>
                                    <p>{name} is online</p>
                                </div>
                            </div>
                        </li>
                    )) : null
                }
            </ul>
        </MDBCardBody>
        <MDBCardFooter></MDBCardFooter>
    </MDBCard>
);

export default UsersList;