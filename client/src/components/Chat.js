import React, {useState, useEffect} from 'react';
import {
    MDBCard,
    MDBRow,
    MDBCol,
    MDBContainer
} from "mdbreact";

import InfoBar from './InfoBar';

import SocketContext from './../SocketContext';

const Chat = ({...props}) => (
    <SocketContext.Consumer>
        {socket => <ChatCore {...props} socket={socket}/>}
    </SocketContext.Consumer>
);

const ChatCore = ({socket, ...props}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:8080';

    useEffect(() => {
        console.log('change !!!!!!!!!!');

        const name = localStorage.getItem('username');
        const room = localStorage.getItem('room');

        setName(name);
        setRoom(room);

        console.log(name);
        console.log(room);

    }, [ENDPOINT, props.location]);

    useEffect(() => {
        socket.on('disconnect', () => {
            console.log('server disconnected');

            onLogout();
        });
    }, [socket.connected]);

    const onLogout = () => {
        console.log('logout');
    };

    return (
        <MDBContainer fluid className="h-100 mt-4">
            <MDBRow className="justify-content-center h-100">
                <MDBCol md="8" xl="6" style={styles.myAuto}>
                    <MDBCard>
                        <InfoBar room={room} name={name} onLogout={onLogout}/>
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