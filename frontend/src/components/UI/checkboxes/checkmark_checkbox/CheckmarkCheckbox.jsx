import React from 'react';

const CheckmarkCheckbox = (props) => {
    function changeValue(event){
        props.get_value(event.target.checked);
    }

    return (
        <div>
            <input type="checkbox" onClick={changeValue}></input>
            <label>{props.label}</label>
        </div>
    );
};

export default CheckmarkCheckbox;