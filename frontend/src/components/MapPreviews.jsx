import React, {useState} from 'react';
import AdditionalButton from "./UI/buttons/additional_button/AdditionalButton";
import {FaPen, FaTrash} from "react-icons/fa";
import StarCheckbox from "./UI/checkboxes/star_checkbox/StarCheckbox";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const MapPreviews = (props) => {

    const [id, setId ] = useState(props.id);

    let navigate = useNavigate();
    function removeMap(){
        axios.delete(`http://localhost:3001/maps/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
        }).then((response) => {
        console.log('Объект успешно удален');
        }).catch(function (error) {
         if (error.response && error.response.status === 400) {
             console.log('Ошибка авторизации',
                 'Пользователь с такими логином и паролем не найден.\r\n' +
                 'Проверьте корректность введенных данных.');
         } else if (error.response && error.response.status === 404) {
             console.log('Ошибка 404. Объект не найден.');
         } else if (error.response && error.response.status === 403) {
             console.log('Доступ запрещен.');
         } else {
             console.log('Произошла ошибка при выполнении запроса.');
         }
            navigate("/");
        });
    }

    return (
        <div className="map-info-content">
            <div onClick={() => {navigate("/map");
                localStorage.setItem("map_id", id.toString());
            }} className="map-info-label">
                <label>{props.city}, </label>
                <label>{props.street} </label>
                <label>{props.house}</label>
                <label>{props.building === '' ? '' : '/' + props.building}, </label>
                <label>{props.floor} этаж</label>
            </div>
            <div className="map-info-buttons">
                {(localStorage.getItem("access") === "admin") ? <AdditionalButton><FaPen/></AdditionalButton> : ''}
                {/*(localStorage.getItem("access") === "admin") ? <AdditionalButton onСlick={removeMap}><FaTrash/></AdditionalButton> : ''*/}
                {/*<StarCheckbox value={props.isFavorite} onChange={props.onChange}></StarCheckbox>*/}
            </div>
        </div>
    );
};

export default MapPreviews;
