import React, {useEffect, useRef} from 'react';
import MajorHeader from "../components/UI/headers/major_header/MajorHeader";
import "../styles/MapGallery.css"
import TextInput from "../components/UI/inputs/text_input/TextInput";
import MapPreviews from "../components/MapPreviews";
import {FaPlus, FaQuestionCircle, FaSearch} from "react-icons/fa";
import AdditionalButton from "../components/UI/buttons/additional_button/AdditionalButton";
import TextSelect from "../components/UI/select/TextSelect";

function fetchData(url, dataArray) {
    useEffect(() => {
        const fetchDataFromServer = async () => {
            try {
                const response = await fetch(url);
                dataArray.current = await response.json(); // Присваиваем полученные данные массиву по ссылке
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        };

        fetchDataFromServer();

        return () => {
            // Очистка
        };
    }, [url, dataArray]);
}

const dataArrayRef = '';

fetchData('http://localhost:3001/maps', dataArrayRef);

const MapGallery = () => {

    return (
        <div className="map-gallery-container">
            <MajorHeader className="map-gallery-header"></MajorHeader>
            <h1>Доступные карты
                <div className="help-button">
                    <AdditionalButton><FaQuestionCircle className="help-icon"/></AdditionalButton>
                </div>
            </h1>
            <div className="map-options">
                <TextInput label={"Адрес"} example={"Поиск"} icon={<FaSearch/>}></TextInput>
                <div className="map-filter-list">
                    <div className="city-filter">
                        <TextSelect  options={[{value: 'City', name: 'Город'}]}>Город</TextSelect>
                    </div>
                    <div className="street-filter">
                        <TextSelect options={[{value: 'Street', name: 'ул. Улица'}]}>
                            Улица (проспект/переулок)
                        </TextSelect>
                    </div>
                    <div className="house-filter">
                        <TextSelect options={[{value: 'House', name: '10'}]}>Дом</TextSelect>
                    </div>
                    <div className="building-filter">
                        <TextSelect options={[{value: 'Building', name: '2б'}]}>Корпус</TextSelect>
                    </div>
                    <div className="floor-filter">
                        <TextSelect options={[{value: 'Floor', name: '100'}]}>Этаж</TextSelect>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', marginLeft: '40px'}}>
                <div className="new-map-button">
                    <AdditionalButton><FaPlus/>
                        <label className="new-map-label">Создать новую карту</label>
                    </AdditionalButton>
                </div>
            </div>
            <div>
                {dataArrayRef.map((item) => (
                    <MapPreviews
                        key={item.city}
                        city={item.city}
                        street={item.street}
                        house={item.house}
                        building={item.building}
                        floor={item.floor}
                    />
                ))}
            </div>
            <footer className="map-gallery-footer"></footer>
        </div>
    );
};

export default MapGallery;
