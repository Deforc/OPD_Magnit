import React from 'react';
import classes from "./MajorModal.module.css";

const MajorModal = (props) => {

    const rootClasses = [classes.majorModal];

    if (props.visible){
        rootClasses.push(classes.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => {props.setVisible(false)}}>
            <div className={classes.majorModalContent} onClick={(e) => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
};

export default MajorModal;