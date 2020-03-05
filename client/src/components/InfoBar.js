import React from 'react';
import {
    MDBBtn,
    MDBCardHeader
} from "mdbreact";

const InfoBar = ({room, name, onLogout}) => {

    return (
        <MDBCardHeader>
            <div className="d-flex justify-content-between bd-highlight">
                <div style={styles.user_info}>
                    <h2>Welcome to Chat</h2>
                    <div className="d-flex justify-content-between">
                        <strong className="text-danger">Name</strong> {name}
                        <strong className="text-danger">Room</strong> {room}
                    </div>
                </div>
                <MDBBtn
                    onClick={onLogout}
                    color="danger"
                    size="sm"
                    className="z-depth-2"
                >
                    Log out
                </MDBBtn>
            </div>
        </MDBCardHeader>
    );
};

const styles = {
    user_info: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: '15px'
    }
};

export default InfoBar;