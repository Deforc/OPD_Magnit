import React, {useEffect, useState} from 'react';
import "../styles/MapView.css"
import DragMove from "../components/DragMove";
import MapViewHeader from "../components/UI/headers/map_view_header/MapViewHeader";
import Map from "../components/Map";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const MapView = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [map, setMap] = useState();

    useEffect(() => {
        axios.get("http://localhost:3001/maps/" + localStorage.getItem("map_id"),
            {
                headers: {
                    'Authorization': ' Bearer ' + localStorage.getItem("token")
                }
            }).then((response) => {
            setData(response.data);
        }).catch(function (error) {
            navigate("/map_gallery");
        });
    }, []);

    useEffect(() => {
        setMap(JSON.parse(data.json === undefined ? '{}' : data.json));
    }, [data]);

    const [translate, setTranslate] = useState({
        x: 0,
        y: 40
    });
    const [scale, setScale] = useState(1.0);

    const handleDragMove = (e) => {
        setTranslate({
            x: translate.x + e.movementX,
            y: translate.y + e.movementY
        });
    };

    const handleScale = (event) => {
        if((event.deltaY/Math.abs(event.deltaY) < 0 && scale <= 2.0) ||
            (event.deltaY/Math.abs(event.deltaY) > 0 && scale >= 0.2)){
            setScale(scale - 0.1*(event.deltaY/Math.abs(event.deltaY)));
        }
    }

    return (
        <div className="map-view-base">
            <MapViewHeader>{data.city}, {data.street} {data.house}{data.building === '' ? '' : '/' + data.building}, {data.floor} этаж</MapViewHeader>
            <DragMove style={{width: '100%', height: '100vh',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              MozUserSelect: 'none',
                              WebkitUserSelect: 'none',
                              MsUserSelect: 'none',
                              userSelect: 'none'}}
                      onDragMove={handleDragMove}
                      onWheel={handleScale}
            >
                <div
                    style={{
                        transform: `translateX(${translate.x}px) translateY(${translate.y}px) scale(${scale})`,
                        width: 'min-content'
                    }}
                >
                    <Map map={map}></Map>
                </div>
            </DragMove>
        </div>
    );
};

export default MapView;