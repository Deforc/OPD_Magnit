import React from 'react';
import AdditionalButton from "./UI/buttons/additional_button/AdditionalButton";
import {FaPen, FaTrash} from "react-icons/fa";
import StarCheckbox from "./UI/checkboxes/star_checkbox/StarCheckbox";

const MapPreviews = () => {
    return (
        <div className="map-info-content">
            <div className="map-info-label">
                <label>City, </label>
                <label>Street </label>
                <label>Home/</label>
                <label>Building, </label>
                <label>Floor</label>
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