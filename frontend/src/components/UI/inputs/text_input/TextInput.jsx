import React, {useState} from 'react';

const TextInput = (props) => {
    const [value, setValue] = useState("")

    function handleChange(event) {
        setValue(event.target.value);
    }

    function clearValue() {
        setValue("");
    }

    return (
        <div>
            <input type="text" placeholder={props.example}></input>
            <label>{props.label}</label>
            {(value !== "") && <button onClick={clearValue}></button>}
        </div>
    );
};

export default TextInput;