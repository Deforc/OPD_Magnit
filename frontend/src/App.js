import React from 'react';
import MapGallery from "./pages/MapGallery";
import LoginForm from "./pages/LoginForm";
import {Route, Routes} from "react-router-dom";
import MapView from "./pages/MapView";

function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/" element={ <LoginForm/> } />
              <Route path="map_gallery" element={ <MapGallery/> } />
              <Route path={"/map"} element={ <MapView/> }></Route>
          </Routes>
      </div>
  );
}

export default App;