import React, {useState} from 'react';
import classes from "./TextInput.module.css";
import {RxCross1} from "react-icons/rx";

const TextInput = (props) => {
    const [value, setValue] = useState(props.startValue);
    const [inputFocus, setFocus] = useState(false);
    const styles = [classes.textInput, props.isValid && classes.noValid, inputFocus && classes.focus];

    function handleChange(event) {
        setValue(event.target.value);
        props.get_value(event.target.value);
    }

    function clearValue() {
        setValue("");
        props.get_value("");
    }

    return (
        <div className={styles.join(' ')}>
            <label>{props.label}</label>
            <div className={classes.textInputBody}>
                {props.icon !== null && <div className={classes.textInputIcon}>{props.icon}</div>}
                <input type="text" placeholder={props.example} value={value} onChange={handleChange}
                       onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}></input>
                {(value !== "") && <button className={classes.clearButton} onClick={clearValue}>
                    <RxCross1 className={classes.crossIcon}/>
                </button>}
            </div>
        </div>
    );
};

export default TextInput;