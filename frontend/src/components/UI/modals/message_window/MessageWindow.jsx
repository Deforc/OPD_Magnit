import React, {useEffect} from 'react';
import style from './MessageWindow.module.css';

const MessageWindow = (props) => {
    useEffect(() => {
        setTimeout(() => {props.close()}, '10000');
    });

    return (
        <div className={[style.messageWindow, style.active].join(' ')}>
            <div className={style.messageWindowContent}>
                <label className={style.messageWindowLabel}>{props.label}</label>
                <p className={style.messageWindowText}>{props.children}</p>
            </div>
        </div>
    );
};

export default MessageWindow;