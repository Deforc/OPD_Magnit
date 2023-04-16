import React, {useEffect, useRef} from 'react';
import classes from "./MarkerModule.module.css";

const MarkerModule = (props) => {
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

    return (
        <div ref={rootEl}>
            { props.text.map(text => (
                <div key={text.id} className={classes.markerModule}>
                    <label>{text.label}</label>
                    <p>{text.content}</p>
                </div>
            ))}
        </div>
    );
};

export default MarkerModule;