import React, {useState} from 'react';

const TextInput = (props) => {
    const [value, setValue] = useState("")

    function handleChange(event) {
        setValue(event.target.value);
        props.get_value(event.target.value);
    }

    function clearValue() {
        setValue("");
        props.get_value("");
    }

    return (
        <div>
            <input type="text" placeholder={props.example} value={value} onChange={handleChange}></input>
            <label>{props.label}</label>
            {(value !== "") && <button onClick={clearValue}></button>}
        </div>
    );
};

export default TextInput;