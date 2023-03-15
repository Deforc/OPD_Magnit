import React from 'react';

const PasswordInput = (props) => {
    return (
        <div>
            <input type="password" placeholder={props.example}></input>
            <label>{props.label}</label>
            <button></button>
        </div>
    );
};

export default PasswordInput;