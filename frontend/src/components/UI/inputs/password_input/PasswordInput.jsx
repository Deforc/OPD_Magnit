import React, {useState} from 'react';
import {FaEye, FaEyeSlash, FaLock} from "react-icons/fa";
import classes from "./PasswordInput.module.css";

const PasswordInput = (props) => {
    const [value, setValue] = useState("");
    const [isVisible, toggleVisible] = useState(false);
    const [inputFocus, setFocus] = useState(false);
    const styles = [classes.passwordInput, props.isValid && classes.noValid, inputFocus && classes.focus];

    function handleChange(event) {
        setValue(event.target.value);
        props.get_value(event.target.value);
    }

    function changeVisible() {
        toggleVisible(!isVisible);
    }

    return (
        <div className={styles.join(' ')}>
            <label>{props.label}</label>
            <div className={classes.passwordInputBody}>
                <FaLock className={classes.lock}/>
                <input type={isVisible ? "text" : "password"} placeholder={props.example}
                       value={value} onChange={handleChange}
                       onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}></input>
                {(value !== "") && <button onClick={changeVisible} className={classes.toggleVisibleButton}>
                    {isVisible ? <FaEyeSlash className={classes.eyeIcon}/> : <FaEye  className={classes.eyeIcon}/>}
                </button>}
            </div>
        </div>
    );
};

export default PasswordInput;