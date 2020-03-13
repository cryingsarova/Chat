import React, {useState} from 'react';
import {MDBBtn, MDBCardBody} from 'mdbreact';

import {setToken} from "../tokenUtils";
import SocketContext from "../SocketContext";
import NameField from './NameField';
import PasswordField from "./PasswordField";
import RoomField from "./RoomField";

const Login = ({...props}) => (
    <SocketContext.Consumer>
        {socket => <LoginCore {...props} socket={socket}/>}
    </SocketContext.Consumer>
);

const LoginCore = ({socket, ...props}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [room, setRoom] = useState('');

    const [validName, setValidName] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validRoom, setValidRoom] = useState(false);

    const [status, setStatus] = useState('');

    const updateName = ({...name}) => {
        console.log(name);
        setName(name.value);
        setValidName(name.valid);
    };

    const updatePassword = ({...password}) => {
        console.log(password);
        setPassword(password.value);
        setValidPassword(password.valid);
    };

    const updateRoom = ({...room}) => {
        console.log(room);
        setRoom(room.value);
        setValidRoom(room.valid);
    };

    const validateForm = () => {
        return (validName && validPassword && validRoom);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const isValidForm = validateForm();

        console.log(isValidForm);

        if(isValidForm) {
            event.target.className += " was-validated";
            console.info('Valid Form');

            socket.emit('login', {name, password, room}, (response) => {
                console.log(response);

                if (response.message) setStatus(response.message);

                if (response.status === 'success') {
                    setToken(response.token);

                    localStorage.setItem('username', name);
                    localStorage.setItem('room', room);

                    console.log(props.history);
                    props.history.push("/");

                    socket.emit('enterChat', {name, room});
                }
            })
        } else setStatus('Not valid fields');
    };

    return (
        <MDBCardBody className="mx-4 mt-4">
            <form
                className='needs-validation'
                onSubmit={onSubmit}
                noValidate
            >
                <NameField updateName={updateName} />
                <PasswordField updatePassword={updatePassword} />
                <RoomField updateRoom={updateRoom}/>
                <p>{status}</p>
                <div className="text-center mb-4 mt-5">
                    <MDBBtn
                        color="danger"
                        type="submit"
                        className="btn-block z-depth-2"
                    >
                        Login
                    </MDBBtn>
                </div>
            </form>
        </MDBCardBody>
    )
};

export default Login;