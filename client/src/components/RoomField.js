import React, {useState} from 'react';
import {MDBInput} from "mdbreact";

const RoomField = ({updateRoom}) => {
    const [errorText, setErrorText] = useState('');
    const [classname, setClassname] = useState('');

    const onInputChange = (event) => {
        console.log(event.target.value);

        const {value} = event.target;
        let valid = false;

        if (value.length < 1) {
            valid = false;
            setClassname('is-invalid');
            setErrorText('Specify room');
        } else {
            console.log('valid');
            valid = true;
            setClassname('is-valid');
        }

        updateRoom({value, valid});
    };

    return (
        <MDBInput
            hint='Enter room'
            group
            type="text"
            onChange={onInputChange}
            name='room'
            className={classname}
            required
        >
            <div className="invalid-feedback">
                {errorText}
            </div>
            <div className='valid-feedback'>Correct</div>
        </MDBInput>
    );
};

export default RoomField;