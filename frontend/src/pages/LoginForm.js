import React from 'react';
import LoginComponent from "../components/LoginComponent";

const LoginForm = (props) => {
    return (
        <div className="log-in-container">
            <LoginComponent setToken={props.setToken}></LoginComponent>
        </div>
    );
};

export default LoginForm;