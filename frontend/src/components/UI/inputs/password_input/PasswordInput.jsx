import React from 'react';

const PasswordInput = (props) => {
    return (
        <div>
            <input type="password"></input>
            <label>{props.label}</label>
            <label>{props.example}</label>
            <button></button>
        </div>
    );
};

export default PasswordInput;