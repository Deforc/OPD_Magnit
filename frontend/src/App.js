import React from 'react';
import LoginForm from "./pages/LoginForm";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/" element={ <LoginForm/> } />
          </Routes>
      </div>
  );
}

export default App;