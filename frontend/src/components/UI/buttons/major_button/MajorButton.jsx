import React from 'react';
import classes from "./MajorButton.module.css";

const MajorButton = (props) => {
    return (
        <button className={classes.majorButton} onClick={props.action}>
            {props.children}
        </button>
    );
};

export default MajorButton;