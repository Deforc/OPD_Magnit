import React, {useState} from 'react';
import MapGallery from "./pages/MapGallery";
import LoginForm from "./pages/LoginForm";
import {Route, Routes} from "react-router-dom";

function App() {
  const [token, setToken] = useState('');

  function setTokenValue(token) {
      setToken(token)
      localStorage.setItem("token", token);
      console.log(token)
  }

  return (
      <div className="App">
          <Routes>
              <Route path="/" element={ <LoginForm setToken={setTokenValue}/> } />
              <Route path="map_gallery" element={ <MapGallery setToken={setTokenValue} token={token}/> } />
          </Routes>
      </div>
  );
}

export default App;