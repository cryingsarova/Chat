import React, {useState} from 'react';
import {MDBInputGroup} from "mdbreact";

const Search = ({users, setUsers, empty}) => {
    const [input, setInput] = useState('');

    const onInputChange = (event) => {
        let value = event.target.value;

        setInput(value);

        if (value) {
            console.log(value);
            value = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            const regexp = new RegExp(value, 'g');

            let foundUsers = [];

            if(users.length !== 0) {
                users.forEach((user) => {
                    console.log(user);
                    if (user.name.match(regexp)) {
                        console.log('match');
                        console.log(user);
                        foundUsers.push(user);
                    }
                });
            } else empty();

            setUsers(foundUsers);
        } else {
            empty();
        }
    };

    return (
        <MDBInputGroup
            hint="Search..."
            type="text"
            className="search"
            onChange={onInputChange}
            value={input}
            append={
                <>
                    <span
                        className="input-group-text bg-danger z-depth-2 text-white search_btn"
                    ><i className="fas fa-search"></i></span>
                </>
            }
        />
    );
};

export default Search;