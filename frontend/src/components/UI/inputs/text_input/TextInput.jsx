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
            <input type="text" value={value} onChange={handleChange}></input>
            <label>{props.label}</label>
            {value === "" ? <label>{props.example}</label> :
                            <button onClick={clearValue}></button>}
        </div>
    );
};

export default TextInput;