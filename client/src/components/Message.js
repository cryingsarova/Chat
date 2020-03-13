import React from 'react';

import ReactEmoji from 'react-emoji';

const Message = ({message: {name, text}, username}) => {
    let isSentByCurrentUser = false;
    let isSentByAdmin = false;

    if (name === username) {
        isSentByCurrentUser = true;
    } else if (name === 'admin') {
        isSentByAdmin = true;
    }

    if (isSentByCurrentUser) {
        return (
            <div className="d-flex justify-content-end mb-4">
                <div style={styles.msg_container}>
                    {ReactEmoji.emojify(text)}
                </div>
                <div style={styles.user_name}>
                    <span>:me</span>
                </div>
            </div>
        )
    } else if (isSentByAdmin) {
        return (
            <div className="d-flex justify-content-center mb-4">
                {text}
            </div>
        )
    } else {
        return (
            <div className="d-flex justify-content-start mb-4">
                {name}:
                <div style={styles.msg_container}>
                    {ReactEmoji.emojify(text)}
                </div>
            </div>
        )
    }
};

const styles = {
    msg_container: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: '10px',
        borderRadius: '25px',
        backgroundColor: '#82ccdd',
        padding: '10px',
        position: 'relative'
    },
    user_name: {
        lineHeight: '40px'
    },
    text_name: {
        verticalAlign: 'middle'
}
};

export default Message;