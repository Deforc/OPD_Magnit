import React from 'react';
import MapGallery from "./pages/MapGallery";
import LoginForm from "./pages/LoginForm";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/" element={ <LoginForm/> } />
              <Route path="map_gallery" element={ <MapGallery/> } />
          </Routes>
      </div>
  );
}

export default App;