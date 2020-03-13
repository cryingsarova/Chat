import React from 'react';
import {MDBCardFooter, MDBInputGroup} from "mdbreact";

import './SendMessageForm/SendMessageForm.css';

const SendMessageForm = ({message, setMessage, sendMessage}) => (
    <MDBCardFooter>
        <MDBInputGroup
            hint='Type a message...'
            type='textarea'
            className='type_msg'
            onChange={(event) => setMessage(event.target.value)}
            value={message}
            append={
                <>
                    <span onClick={(event) => sendMessage(event)}
                          className="input-group-text bg-danger z-depth-2 text-white send_btn"
                    ><i className="fas fa-location-arrow"></i></span>
                </>
            }
        />
    </MDBCardFooter>
);

export default SendMessageForm;