import React from 'react';

const TextInput = (props) => {
    return (
        <div>
            <input type="text"></input>
            <label>{props.label}</label>
            <label>{props.example}</label>
            <button></button>
        </div>
    );
};

export default TextInput;