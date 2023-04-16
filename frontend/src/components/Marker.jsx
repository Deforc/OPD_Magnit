import React, {useEffect, useRef, useState} from 'react';
import {FaMapMarkerAlt} from "react-icons/fa";
import MarkerModule from "./UI/modals/marker_modal/MarkerModule";

const Marker = ({marker}) => {
    const [showModuleVisible, setModuleVisible] = useState(false);

    return (
        <div style={{position: 'absolute',
            top: `${marker.position.y}px`,
            left: `${marker.position.x}px`,
            width: 'max-content', height: 'max-content'}}>
            <FaMapMarkerAlt style={{width: '30px',
                height: '30px',
                color: 'red',
            }}
                onClick={() => {setModuleVisible(!showModuleVisible)}}
                onBlur={() => {setModuleVisible(false)}}/>
            {showModuleVisible && <MarkerModule text={marker.text_fields} setVisible={setModuleVisible}>
            </MarkerModule>}
        </div>
    );
};

export default Marker;