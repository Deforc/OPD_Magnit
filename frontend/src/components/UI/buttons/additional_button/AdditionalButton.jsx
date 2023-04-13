import React from 'react';
import classes from "./AdditionalButton.module.css";

const AdditionalButton = (props) => {
    return (
        <button className={classes.additionalButton} onClick={props.onClick}>
            {props.children}
        </button>
    );
};

export default AdditionalButton;