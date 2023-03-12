import React from 'react';

const CheckmarkCheckbox = (props) => {
    return (
        <div>
            <input type="checkbox"></input>
            <label>{props.label}</label>
        </div>
    );
};

export default CheckmarkCheckbox;