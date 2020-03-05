import React, {useState} from 'react';
import {MDBInput} from "mdbreact";

const PasswordField = ({updatePassword}) => {
    const [errorText, setErrorText] = useState('');
    const [classname, setClassname] = useState('');

    const onInputChange = (event) => {
        console.log(event.target.value);

        const {value} = event.target;
        let valid = false;

        if (value.length < 8) {
            valid = false;
            setClassname('is-invalid');
            setErrorText('Password must be 8 characters long!');
        } else {
            console.log(value);
            let isValid = value.split('').find(ch => ch === ch.toUpperCase());
            console.log(isValid);
            if (!isValid) {
                valid = false;
                setClassname('is-invalid');
                setErrorText('Password should contain at least one uppercase character');
            } else {
                valid = true;
                setClassname('is-valid');
            }
        }

        updatePassword({value, valid});
    };

    return (
        <MDBInput
            hint="Your password"
            group
            type="password"
            onChange={onInputChange}
            name='password'
            className={classname}
            required
        >
            <div className="invalid-feedback">
                {errorText}
            </div>
            <div className="valid-feedback">Correct</div>
        </MDBInput>
    );
};

export default PasswordField;