import MajorHeader from "../components/UI/headers/major_header/MajorHeader";
import "../styles/MapGallery.css"
import TextInput from "../components/UI/inputs/text_input/TextInput";
import MapPreviews from "../components/MapPreviews";
import {FaPlus, FaQuestionCircle, FaSearch} from "react-icons/fa";
import AdditionalButton from "../components/UI/buttons/additional_button/AdditionalButton";
import TextSelect from "../components/UI/select/TextSelect";
import React, {useEffect, useState} from 'react';


const MapGallery = () => {

   const [filter, setFilter] = useState({'city': '', 'street': '', 'house':'', 'building':'', 'floor':''});
    const dataArrayRef =[ {'city': 'красноярск', 'street': 'ул. Солнечная', 'house':'15', 'building':'5', 'floor':'6'},  {'city': 'красноярск', 'street': 'ул. Солнечная', 'house':'15', 'building':'5', 'floor':'5'}];
     useEffect(/*async*/ () => {
   /*  try {
          const response = await fetch('http://localhost:3001/maps');
          dataArray.current = await response.json(); // Присваиваем полученные данные массиву по ссылке
      } catch (error) {
          console.error('Ошибка при выполнении запроса:', error);
      }*/ //добавить функию по распределению полей по массивам
         for (let i = 0; i < dataArrayRef.length; i++) {
             const obj = dataArrayRef[i];
             if(!(cites.find(e => e.name === obj.city))) cites.push({'value':obj.city, 'name': obj.city});
             if(!(streets.find(e => e.name === obj.street))) streets.push({'value':obj.street, 'name': obj.street});
             if(!(houses.find(e => e.name === obj.house))) houses.push({'value':obj.house, 'name': obj.house});
             if(!(buildings.find(e => e.name === obj.building))) buildings.push({'value':obj.building, 'name': obj.building});
             if(!(floors.find(e => e.name === obj.floor))) floors.push({'value':obj.floor, 'name': obj.floor});
         }}, []);

//добавить функию по распределению полей по массивам

    const cites = [];
    const streets =[];
    const houses = [];
    const buildings = [];
    const floors = [];



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
                        <TextSelect  options={cites}>Город</TextSelect>
                    </div>
                    <div className="street-filter">
                        <TextSelect options={streets}>
                            Улица (проспект/переулок)
                        </TextSelect>
                    </div>
                    <div className="house-filter">
                        <TextSelect options={houses}>Дом</TextSelect>
                    </div>
                    <div className="building-filter">
                        <TextSelect options={buildings}>Корпус</TextSelect>
                    </div>
                    <div className="floor-filter">
                        <TextSelect options={floors}>Этаж</TextSelect>
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
