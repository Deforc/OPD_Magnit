import React from 'react';
import AdditionalButton from "./UI/buttons/additional_button/AdditionalButton";
import {FaPen, FaTrash} from "react-icons/fa";
import StarCheckbox from "./UI/checkboxes/star_checkbox/StarCheckbox";

const MapPreviews = (props) => {
    return (
        <div className="map-info-content">
            <div className="map-info-label">
                <label>{props.city}, </label>
                <label>{props.street} </label>
                <label>{props.house}/</label>
                <label>{props.building}, </label>
                <label>{props.floor} этаж</label>
            </div>
            <div className="map-info-buttons">
                <AdditionalButton><FaPen/></AdditionalButton>
                <AdditionalButton><FaTrash/></AdditionalButton>
                <StarCheckbox></StarCheckbox>
            </div>
        </div>
    );
};

export default MapPreviews;
