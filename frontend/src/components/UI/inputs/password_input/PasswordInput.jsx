import React, {useState} from 'react';

const PasswordInput = (props) => {
    const [value, setValue] = useState("");
    const [isVisible, toggleVisible] = useState(false);

    function handleChange(event) {
        setValue(event.target.value);
    }

    function changeVisible() {
        toggleVisible(!isVisible);
    }

    return (
        <div>
            <input type={isVisible ? "text" : "password"} placeholder={props.example}
                   value={value} onChange={handleChange}></input>
            <label>{props.label}</label>
            {(value !== "") && <button onClick={changeVisible}></button>}
        </div>
    );
};

export default PasswordInput;