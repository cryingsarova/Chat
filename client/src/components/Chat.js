import React, {useEffect} from 'react';
import * as io from 'socket.io-client';
import {
    MDBCard,
    MDBRow,
    MDBCol,
    MDBContainer
} from "mdbreact";

const socket = io('localhost:8080');

const Chat = () => {
    const ENDPOINT = 'localhost:8080';

    useEffect(() => {
        socket.on('connect', () => {
            console.log('connection with server has established');
        });
    }, [ENDPOINT]);

    return (
        <MDBContainer fluid className="h-100 mt-4">
            <MDBRow className="justify-content-center h-100">
                <MDBCol md="4" xl="3" style={styles.myAuto}>
                </MDBCol>
                <MDBCol md="8" xl="6" style={styles.myAuto}>
                    <MDBCard>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
};

const styles = {
    myAuto: {
        marginTop: "auto",
        marginBottom: "auto"
    }
};

export default Chat;