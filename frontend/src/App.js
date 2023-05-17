import React, {useState} from 'react';
import MapGallery from "./pages/MapGallery";
import LoginForm from "./pages/LoginForm";
import {Route, Routes} from "react-router-dom";
import MapView from "./pages/MapView";

function App() {
  const [token, setToken] = useState('');

  function setTokenValue(token) {
      setToken(token)
      localStorage.setItem("token", token);
  }

  return (
      <div className="App">
          <Routes>
              <Route path="/" element={ <LoginForm setToken={setTokenValue}/> } />
              <Route path="map_gallery" element={ <MapGallery setToken={setTokenValue} token={token}/> } />
              <Route path={"/map"} element={ <MapView/> }></Route>
          </Routes>
      </div>
  );
}

export default App;
