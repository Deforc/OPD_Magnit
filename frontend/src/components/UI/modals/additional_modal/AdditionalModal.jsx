import React, {useEffect, useRef} from 'react';
import classes from "./AdditionalModal.module.css";

const AdditionalModal = (props) => {
    const rootEl = useRef(null);

    let mounting = false;

    useEffect(() => {
        const onClick = e => {
            !rootEl.current.contains(e.target) && ((mounting === false) ? props.setVisible(false) : mounting = false);
        }
        document.addEventListener('click', onClick);
        mounting = true;
        return () => document.removeEventListener('click', onClick);
    }, []);

    let rootClasses = [classes.additionalModal]

    if (props.visible) {
        rootClasses = [props.className];
    }

    return (
        <div ref={rootEl} className={rootClasses.join(' ')}>
            <div className={classes.additionalModalContent}>
                {props.children}
            </div>
        </div>
    );
};

export default AdditionalModal;