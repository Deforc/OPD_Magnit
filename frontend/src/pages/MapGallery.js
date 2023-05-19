import MajorHeader from "../components/UI/headers/major_header/MajorHeader";
import "../styles/MapGallery.css"
import TextInput from "../components/UI/inputs/text_input/TextInput";
import MapPreviews from "../components/MapPreviews";
import {FaPlus, FaQuestionCircle, FaSearch} from "react-icons/fa";
import AdditionalButton from "../components/UI/buttons/additional_button/AdditionalButton";
import TextSelect from "../components/UI/select/TextSelect";
import React, {useEffect, useLayoutEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import MajorModal from "../components/UI/modals/major_modal/MajorModal";
import MajorButton from "../components/UI/buttons/major_button/MajorButton";

const MapGallery = () => {
    const [filter, setFilter] = useState(
        {'city': '' + '', 'street': '', 'house':'', 'building':'', 'floor':''});
    const [dataArrayRef, setDataArrayRef] = useState(
        [{'city': '' + '', 'street': '', 'house':'', 'building':'', 'floor':''}]);
    const [filteredData, setFilteredData] = useState(
        [{'city': '' + '', 'street': '', 'house':'', 'building':'', 'floor':''}]);
    const [cites, setCitesData] = useState([]);
    const [streets, setStreetsData] = useState([]);
    const [houses, setHousesData] = useState([]);
    const [buildings, setBuildingsData] = useState([]);
    const [floors, setFloorsData] = useState([]);

    const [modal, setModal] = useState(false);
    const [newMap, setNewMap] = useState(
        {city: '', street: '', house: '', building: '', floor: '', background: ''});
    const [drag, setDrag] = useState(false);
    const [loaded, setLoaded] = useState(false);

    let navigate = useNavigate();

    async function postNewMap(){
        if(newMap.city !== '' || newMap.street !== '' || newMap.house !== '' || newMap.building !== '' ||
           newMap.floor !== ''){
            const response = (await axios.post("http://localhost:3001/maps", JSON.stringify(newMap),
                {
                    headers: {
                        'Authorization': ' Bearer ' + localStorage.getItem("token")
                    }}));
            console.log(response)
            loadMaps();
        }
    }

    function dragStartHandler(e){
        e.preventDefault()
        setDrag(true)
    }

    function dragLeaveHandler(e){
        e.preventDefault()
        setDrag(false)
    }

    function onDropHandler(e) {
        e.preventDefault();
        let files = [...e.dataTransfer.files];
        if(files[0].type.split('/')[0] === 'image'){
            imgToBase64(files[0]);
            setLoaded(true);
        } else {
            changeNewMapBackground('');
            setLoaded(false)
        }
        setDrag(false);
    }

    function imgToBase64(file){
        let reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onload = () =>   {
            changeNewMapBackground(reader.result.split(',')[1]);
        }
    }

    function loadMaps(){
        axios.get("http://localhost:3001/maps",
            {
                headers: {
                    'Authorization': ' Bearer ' + localStorage.getItem("token")
                }
            }).then((response) => {
            const maps = response.data;
            setDataArrayRef(maps);
            setFilteredData(maps);
        }).catch(function (error) {
            if (error.request.status === 400) {
                console.log('Ошибка авторизации',
                    'Пользователь с такими логином и паролем не найден.\r\n' +
                    'Проверьте корректность введенных данных.');
            }
            if (error.request.status === 404) {
                console.log('Ошибка 404. Сервер не найден.');
            }
            if (error.request.status === 403) {
                console.log('Доступ запрещен.');
            }
            navigate("/")
        });
    }

    useEffect(() => {
        updateOptions();
        filterData();
    }, [filter, dataArrayRef]);

    useLayoutEffect(() => {
        loadMaps();
        updateOptions();
    }, []);
    function updateOptions(){
        let cites_buffer = [];
        let streets_buffer = [];
        let houses_buffer = [];
        let buildings_buffer = [];
        let floors_buffer = [];
        for (let i = 0; i < dataArrayRef.length; i++) {
            const obj = dataArrayRef[i];
            if (!(cites_buffer.find(e => e.name === obj.city)) && obj.city !== ''){
                cites_buffer.push({'value': obj.city, 'name': obj.city});
            }
            if (!(streets_buffer.find(e => e.name === obj.street)) && obj.street !== '') {
                streets_buffer.push({'value': obj.street, 'name': obj.street});
            }
            if (!(houses_buffer.find(e => e.name === obj.house)) && obj.house !== '') {
                houses_buffer.push({'value': obj.house, 'name': obj.house});
            }
            if (!(buildings_buffer.find(e => e.name === obj.building)) && obj.building !== ''){
                buildings_buffer.push({'value': obj.building, 'name': obj.building});
            }
            if (!(floors_buffer.find(e => e.name === obj.floor)) && obj.floor !== ''){
                floors_buffer.push({'value': obj.floor, 'name': obj.floor});
            }
        }
        setCitesData(cites_buffer);
        setStreetsData(streets_buffer);
        setHousesData(houses_buffer);
        setBuildingsData(buildings_buffer);
        setFloorsData(floors_buffer);
    }

    async function getFavorite (){
        return axios.get("http://localhost:3001/maps/favorite",
            {
                headers: {
                    'Authorization': ' Bearer ' + localStorage.getItem("token")
                }
            });
    }

    function filterData(){
        setFilteredData(dataArrayRef.filter(item => ((item.city === filter.city)||(filter.city===''))
            && ((item.street === filter.street)||(filter.street===''))
            && ((item.house === filter.house)||(filter.house===''))
            && ((item.building === filter.building)||(filter.building===''))
            && ((item.floor === filter.floor)||(filter.floor===''))));
    }

    function changeCity(city){
        setFilter({'city': city, 'street': filter.street, 'house':filter.house, 'building':filter.building,
            'floor':filter.floor});
        filterData();
    }

    function changeStreet(street){
        setFilter({'city': filter.city, 'street': street, 'house':filter.house, 'building':filter.building,
            'floor':filter.floor});
        filterData();
    }

    function changeHouse(house){
        setFilter({'city': filter.city, 'street': filter.street, 'house': house, 'building':filter.building,
            'floor':filter.floor});
        filterData();
    }

    function changeBuilding(building){
        setFilter({'city': filter.city, 'street': filter.street, 'house':filter.house, 'building': building,
            'floor':filter.floor});
        filterData();
    }

    function changeFloor(floor){
        setFilter({'city': filter.city, 'street': filter.street, 'house':filter.house,
            'building':filter.building, 'floor':floor});
        filterData();
    }

    function changeNewMapCity(city){
        setNewMap({city: city, street: newMap.street, house: newMap.house,
            building: newMap.building, floor: newMap.floor, background: newMap.background});
    }

    function changeNewMapStreet(street){
        setNewMap({city: newMap.city, street: street, house: newMap.house,
            building: newMap.building, floor: newMap.floor, background: newMap.background});
    }

    function changeNewMapHouse(house){
        setNewMap({city: newMap.city, street: newMap.street, house: house,
            building: newMap.building, floor: newMap.floor, background: newMap.background});
    }

    function changeNewMapBuilding(building){
        setNewMap({city: newMap.city, street: newMap.street, house: newMap.house,
            building: building, floor: newMap.floor, background: newMap.background});
    }

    function changeNewMapFloor(floor){
        setNewMap({city: newMap.city, street: newMap.street, house: newMap.house,
            building: newMap.building, floor: floor, background: newMap.background});
    }

    function changeNewMapBackground(background){
        setNewMap({city: newMap.city, street: newMap.street, house: newMap.house,
            building: newMap.building, floor: newMap.floor, background: background});
    }

    return (
    <div className="map-gallery-container">
        <MajorModal visible={modal} setVisible={setModal}>
            <h2>Создать карту</h2>
            <TextInput get_value={changeNewMapCity} startValue={newMap.city}
                       label={"Город"} example={''} icon={null}></TextInput>
            <TextInput get_value={changeNewMapStreet} startValue={newMap.street}
                       label={"Улица"} example={''} icon={null}></TextInput>
            <TextInput get_value={changeNewMapHouse} startValue={newMap.house}
                       label={"Дом"} example={''} icon={null}></TextInput>
            <TextInput get_value={changeNewMapBuilding} startValue={newMap.building}
                       label={"Строение"} example={''} icon={null}></TextInput>
            <TextInput get_value={changeNewMapFloor} startValue={newMap.floor}
                       label={"Этаж"} example={''} icon={null}></TextInput>
            <label className={'drop-label'}>Фон</label>
            {drag
                ? <div onDragStart={e => dragStartHandler(e)}
                       onDragLeave={e => dragLeaveHandler(e)}
                       onDragOver={e => dragStartHandler(e)}
                       onDrop={e => onDropHandler(e)}
                       className={'drop-area'}>Отпустите файл, чтобы загрузить его</div>
                : <div onDragStart={e => dragStartHandler(e)}
                       onDragLeave={e => dragLeaveHandler(e)}
                       onDragOver={e => dragStartHandler(e)}
                       className={'drop-area'}>{loaded
                                                ? 'Файл загружен' :
                                                'Перетащите файл, чтобы загрузить его'}
                  </div>
            }
            <div className={"add-new-map-button"}>
                <MajorButton action={() => {postNewMap(); setModal(false);}}>Создать карту</MajorButton>
            </div>
        </MajorModal>
        <MajorHeader className="map-gallery-header"></MajorHeader>
        <h1>Доступные карты
            {//<div className="help-button">
             //   <AdditionalButton><FaQuestionCircle className="help-icon"/></AdditionalButton>
             //</div>
            }
        </h1>
        <div className="map-options">
            {/*<TextInput label={"Адрес"} example={"Поиск"} icon={<FaSearch/>}></TextInput>*/}
            <div className="map-filter-list">
                <div className="city-filter">
                    <TextSelect onChange={changeCity} options={cites}>Город</TextSelect>
                </div>
                <div className="street-filter">
                    <TextSelect onChange={changeStreet} options={streets}> Улица (проспект/переулок)</TextSelect>
                </div>
                <div className="house-filter">
                    <TextSelect onChange={changeHouse} options={houses}>Дом</TextSelect>
                </div>
                <div className="building-filter">
                    <TextSelect onChange={changeBuilding} options={buildings}>Корпус</TextSelect>
                </div>
                <div className="floor-filter">
                    <TextSelect onChange={changeFloor} options={floors}>Этаж</TextSelect>
                </div>
            </div>
        </div>
        {(localStorage.getItem("access") === "admin") ?
            <div style={{display: 'flex', alignItems: 'center', marginLeft: '40px'}}>
                <div className="new-map-button">
                    <AdditionalButton onClick={() => setModal(true)}><FaPlus/>
                        <label className="new-map-label">Создать новую карту</label>
                    </AdditionalButton>
                </div>
            </div> : ''}
        <div className={"map-list"}>
            {
                filteredData.map((item) => (
                <MapPreviews
                    id={item.id}
                    city={item.city}
                    street={item.street}
                    house={item.house}
                    building={item.building}
                    floor={item.floor}
                />))
            }
        </div>
        <footer className="map-gallery-footer"></footer>
    </div>
);
};

export default MapGallery;
