import React from 'react';

const MajorButton = (props) => {
    return (
        <button onClick={props.action}>
            {props.children}
        </button>
    );
};

export default MajorButton;