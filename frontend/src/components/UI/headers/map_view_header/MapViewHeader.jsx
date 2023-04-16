import React from 'react';
import AdditionalButton from "../../buttons/additional_button/AdditionalButton";
import classes from "./MapViewHeader.module.css";
import {FaAngleLeft, FaPen, FaTrash} from "react-icons/fa";
import {IoMdExit} from "react-icons/io";
import {useNavigate} from "react-router-dom";

const MapViewHeader = (props) => {
    const navigate = useNavigate();

    return (
        <div className={classes.mapViewHeader}>
            <div className={classes.backButtons}>
                <AdditionalButton onClick={() => navigate("/map_gallery")}><FaAngleLeft className={classes.backIcon}/></AdditionalButton>
            </div>
            <h1>City, Street Home/Building, Floor</h1>
            <div className={classes.controlButtons}>
                <AdditionalButton><FaPen/></AdditionalButton>
                <AdditionalButton onClick={() => navigate("/map_gallery")}><FaTrash/></AdditionalButton>
                <AdditionalButton onClick={() => navigate("/")}><IoMdExit className={classes.exitIcon}/></AdditionalButton>
            </div>
        </div>
    );
};

export default MapViewHeader;