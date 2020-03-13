import React, {useEffect, useRef} from 'react';
import {
    MDBCardBody
} from "mdbreact";
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

const MessageList = ({messages, name}) => {

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current)
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    };

    useEffect(scrollToBottom, [messages]);

    return (
        <MDBCardBody style={styles.msg_card_body}>
            {messages.map((message, idx) =>
                <div key={idx}>
                    <Message message={message} username={name}/>
                    <div ref={messagesEndRef}/>
                </div>
            )}
        </MDBCardBody>
    )
};

const styles = {
    msg_card_body: {
        overflowY: "scroll"
    }
};

export default MessageList;