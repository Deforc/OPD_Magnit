import React, {useEffect, useRef} from 'react';
import classes from "./AdditionalModal.module.css";

const AdditionalModal = (props) => {

    let rootClasses = [classes.additionalModal]

    if (props.visible) {
        rootClasses = [props.className];
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div className={classes.additionalModalContent}>
                {props.children}
            </div>
        </div>
    );
};

export default AdditionalModal;