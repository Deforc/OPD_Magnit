import React, {useState} from 'react';
import classes from "./CheckmarkCheckbox.module.css";
import {FaCheck} from "react-icons/fa";

const CheckmarkCheckbox = (props) => {
    const [checked, setChecked] = useState(false);

    function changeValue(event){
        setChecked(!checked);
        props.get_value(event.target.checked);
    }

    return (
        <div className={classes.checkmarkCheckbox} onClick={changeValue}>
            <div className={checked ? classes.checkedCheckmarkCheckbox : classes.checkmarkCheckboxInput}>
                <input checked={checked} type="checkbox"></input>
                {checked && <label className={classes.checked}><FaCheck className={classes.checkmate}/></label>}
            </div>
            <label className={classes.rememberLabel}>{props.label}</label>
        </div>
    );
};

export default CheckmarkCheckbox;