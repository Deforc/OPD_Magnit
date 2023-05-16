import React from 'react';
import {FaMapMarkerAlt} from "react-icons/fa";
import MarkerModule from "./UI/modals/marker_modal/MarkerModule";
import Marker from "./Marker";
const Map = ({map}) => {

    return (
        <div style={{position: 'relative', display: 'flex'}}>
            <img src={require("./../img/test.png")} style={{pointerEvents: 'none',
                                                  MozUserSelect: 'none',
                                                  WebkitUserSelect: 'none',
                                                  MsUserSelect: 'none',
                                                  userSelect: 'none'}}></img>
            { map.markers.map(marker => (
                <Marker key={marker.id} marker={marker}></Marker>
            ))}
        </div>
    );
};

export default Map;