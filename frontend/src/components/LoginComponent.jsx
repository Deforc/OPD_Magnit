import React, {useState} from 'react';
import MajorButton from "./UI/buttons/major_button/MajorButton";
import TextInput from "./UI/inputs/text_input/TextInput";
import PasswordInput from "./UI/inputs/password_input/PasswordInput";
import CheckmarkCheckbox from "./UI/checkboxes/checkmark_checkbox/CheckmarkCheckbox";
import axios from "axios";

const LoginComponent = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [isRemember, setIsRemember] = useState(false)

    async function sendLoginRequest(){
        const response = await axios.request({url: 'http://localhost:3001',
            method: 'get',
            params: {login: login,
                password: password,
                isRemember: isRemember},
            responseType: 'json'})
    }

    function changeLogin(new_login){
        setLogin(new_login);
    }

    function changePassword(new_password){
        setPassword(new_password);
    }

    function toggleIsRemember(new_value){
        setIsRemember(new_value);
    }

    return (
        <div>
            <label>Авторизация</label>
            <TextInput label={'Введите логин:'} example={'Login'}
                       get_value={changeLogin}></TextInput>
            <PasswordInput label={'Введите пароль:'} example={'Password'}
                           get_value={changePassword}></PasswordInput>
            <CheckmarkCheckbox label={'Запомнить меня'}
                               get_value={toggleIsRemember}></CheckmarkCheckbox>
            <MajorButton action={sendLoginRequest}>Войти</MajorButton>
        </div>
    );
};

export default LoginComponent;