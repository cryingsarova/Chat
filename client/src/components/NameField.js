import React, {useState} from 'react';
import {MDBInput} from "mdbreact";

const NameField = ({updateName}) => {
    const [errorText, setErrorText] = useState('');
    const [classname, setClassname] = useState('');

    const onInputChange = (event) => {
        console.log(event.target.value);

        const {value} = event.target;
        let valid = false;

        if (value.length < 5) {
            valid = false;
            setClassname('is-invalid');
            setErrorText('Username must be 5 characters long!');
        } else {
            console.log('valid');
            valid = true;
            setClassname('is-valid');
        }

        updateName({value, valid});
    };

    return (
        <MDBInput
            hint='Enter username'
            group
            type="text"
            onChange={onInputChange}
            name='username'
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

export default NameField;