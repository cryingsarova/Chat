import React, {useState, useEffect} from 'react';
import {
    MDBCard,
    MDBRow,
    MDBCol,
    MDBContainer
} from "mdbreact";

import InfoBar from './InfoBar';
import MessageList from './MessageList';
import UsersList from './UsersList';
import SendMessageForm from './SendMessageForm';

import SocketContext from './../SocketContext';
import {removeToken} from "../tokenUtils";

const Chat = ({...props}) => (
    <SocketContext.Consumer>
        {socket => <ChatCore {...props} socket={socket}/>}
    </SocketContext.Consumer>
);

const ChatCore = ({socket, ...props}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'https://react-chat-application-01.herokuapp.com/';
    // const ENDPOINT = 'localhost:5000';

    const filterFunc = (mes) => {
        console.log('mes.user ' + mes.user);
        const name = localStorage.getItem('username');
        console.log('curr name ' + name);
        if (mes.type === 'usermsg') {
            return mes;
        } else if (mes.type === 'welcome' && mes.user === name) {
            return mes;
        } else if (mes.type === 'join' && mes.user !== name) {
            return mes;
        }
    };

    useEffect(() => {
        console.log('change !!!!!!!!!!');

        const name = localStorage.getItem('username');
        const room = localStorage.getItem('room');

        setName(name);
        setRoom(room);

        console.log(name);
        console.log(room);

        socket.emit('getUsers', {room}, (response) => {
            console.log(response);
            setUsers([...response]);
        });

        socket.emit('getLatestMessages', {room}, (latestMessages) => {
            console.log(latestMessages);

            const newMessages = latestMessages.filter(filterFunc);

            console.log(newMessages);

            setMessages([...newMessages]);
        });
    }, [ENDPOINT, props.location]);

    useEffect(() => {
        console.log('messages listener update');

        socket.on('message', (message) => {
            console.log(message);
            setMessages([...messages, message]);
        });
    }, [messages]);

    useEffect(() => {
        socket.on('roomData', ({users}) => {
            setUsers(users);
        });
    }, [users]);

    useEffect(() => {
        socket.on('disconnect', () => {
            console.log('server disconnected');

            onLogout();
        });
    }, [socket.connected]);

    const empty = () => {
        console.log('empty field');

        socket.emit('getUsers', {room}, (response) => {
            console.log(response);
            setUsers([...response]);
        });
    };

    const onLogout = () => {
        console.log('logout');

        socket.emit('end', {name, room}, () => {
            console.log('disconnected');
            removeToken();
            localStorage.removeItem('username');
            localStorage.removeItem('room');
            socket.off();
            props.history.push("/");
        });
    };

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('createMessage', {name, room, message}, (response) => {
                setMessage('');

                console.log(response);

                if (response) {
                    if (response.status === 'error') {
                        console.log('message not delivered');
                    } else {
                        console.log('delivered');
                    }
                }
            });
        }
    };

    return (
        <MDBContainer fluid className="h-100 mt-4">
            <MDBRow className="justify-content-center h-100">
                <MDBCol md="4" xl="3" style={styles.myAuto}>
                    <UsersList users={users} setUsers={setUsers} empty={empty}/>
                </MDBCol>
                <MDBCol md="8" xl="6" style={styles.myAuto}>
                    <MDBCard>
                        <InfoBar room={room} name={name} onLogout={onLogout}/>
                        <MessageList messages={messages} name={name}/>
                        <SendMessageForm message={message} setMessage={setMessage} sendMessage={sendMessage}/>
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