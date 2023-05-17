import React, {useState} from 'react';
import "../styles/MapView.css"
import DragMove from "../components/DragMove";
import MapViewHeader from "../components/UI/headers/map_view_header/MapViewHeader";
import Map from "../components/Map";

const MapView = () => {

    const map = '{"external_ip": "Test1", "background": "./../img/test.png", "markers": [{"id": 1, "icon": "icon", "position": {"x": 180, "y": 240}, "text_fields": [{"label": "Тип метки: ", "content": "Сотрудник", "id": "1"}, {"label": "ФИО: ", "content": "Иванов Иван Иванович", "id": "1"}, {"label": "Часы работы: ", "content": "10:00 - 18:00", "id": "1"}]}, {"id": 2, "icon": "icon", "position": {"x": 500, "y": 360}, "text_fields": [{"label": "Тип метки", "content": "Банкомат", "id": "1"}, {"label": "Банк:", "content": "Сбербанк", "id": "1"}]}], "objects": [{"points": [{"x": 120, "y": 220}, {"x": 220, "y": 250}, {"x": 170, "y": 340}], "linked_marker_id": 1}], "walls": [{"points": [{"x": 50, "y": 50}, {"x": "50", "y": 300}]}]}';

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
            <MapViewHeader>Астрахань, ул. Болтвина 10 2 этаж</MapViewHeader>
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
                    <Map map={JSON.parse(map)}></Map>
                </div>
            </DragMove>
        </div>
    );
};

export default MapView;