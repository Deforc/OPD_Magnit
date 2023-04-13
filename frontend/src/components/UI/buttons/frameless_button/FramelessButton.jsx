import React from 'react';
import classes from "./FramelessButton.module.css";

const FramelessButton = (props) => {
    const icon_style = [classes.framelessButtonIcon];

    if (props.active){
        icon_style.push(classes.active);
    }

    return (
        <button className={classes.framelessButton} onClick={props.onClick}>
            <label className={icon_style.join(' ')}>{props.icon}</label>
            <label className={classes.framelessButtonLabel}>{props.children}</label>
        </button>
    );
};

export default FramelessButton;