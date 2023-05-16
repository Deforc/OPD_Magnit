import React, {useState} from 'react';
import classes from "./TextSelect.module.css";

const TextSelect = (props) => {
    const [selectFocus, setFocus] = useState(false);
    const styles = [classes.textSelect, selectFocus && classes.focus];

    return (
        <div className={styles.join(' ')}>
            <label>{props.children}</label>
            <select onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onChange={props.onChange}>
                <option value="">{props.defaultValue}</option>
                {props.options.map(option =>
                    <option value={option.value}>
                        {option.name}
                    </option>
                )}
            </select>
        </div>
    );
};

export default TextSelect;
