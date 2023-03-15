import React from 'react';

const TextInput = (props) => {
    return (
        <div>
            <input type="text" placeholder={props.example}></input>
            <label>{props.label}</label>
            <button></button>
        </div>
    );
};

export default TextInput;