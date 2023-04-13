import React, {useEffect, useState} from 'react';
import MajorButton from "./UI/buttons/major_button/MajorButton";
import TextInput from "./UI/inputs/text_input/TextInput";
import PasswordInput from "./UI/inputs/password_input/PasswordInput";
import CheckmarkCheckbox from "./UI/checkboxes/checkmark_checkbox/CheckmarkCheckbox";
import axios from "axios";
import MessageWindow from "./UI/modals/message_window/MessageWindow";
import "../styles/LoginForm.css"
import {FaUserAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const LoginComponent = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState(false);

    const [showError, setError] = useState(false);
    const [errorLabel, setLabel] = useState('');
    const [errorText, setText] = useState('');

    const [isValid, setValid] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001", {}).then();
    }, []);

    async function sendLoginRequest(){
        if (login === '' || password === '') {
            setValid(false);
        }
        else {
            await axios.post("http://localhost:3001/authorization", {
                login: login,
                password: password,
                isRemember: isRemember}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response.status === 200){
                    navigate("/map_gallery");
                }
            }).catch(function (error) {
                if (error.request.status === 401){
                    sentError('Ошибка авторизации',
                        'Пользователь с такими логином и паролем не найден.\r\n' +
                        'Проверьте корректность введенных данных.');
                }
                if (error.request.status === 0){
                    sentError('Ошибка сервера',
                        'Сервер не отвечает. Попробуйте снова через несколько минут.');
                }
            });
        }
    }

    function sentError(label, message){
        setLabel(label);
        setText(message);
        setError(true);
    }

    function hideError(){
        setError(false);
        setLabel('');
        setText('');
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
        <div className="log-in">
            <h1>Авторизоваться</h1>
            <div className="login-input"><TextInput label={'Введите логин:'} example={'Login'}
                                                    isValid={!isValid && login === ''} get_value={changeLogin}
                                                    icon={<FaUserAlt/>}></TextInput>
                {!isValid && login === '' && <label>Введите логин</label>}
            </div>
            <div className="password-input"><PasswordInput label={'Введите пароль:'} example={'Password'}
                                                           isValid={!isValid && password === ''}
                                                           get_value={changePassword}></PasswordInput>
                {!isValid && password === '' && <label>Введите пароль</label>}
            </div>
{/*            <div className="remember-me"><CheckmarkCheckbox label={'Запомнить меня'}
                                                            get_value={toggleIsRemember}></CheckmarkCheckbox></div>*/}
            <div className="log-in-button"><MajorButton action={sendLoginRequest}>Войти</MajorButton>
                {(showError === true) && <MessageWindow label={errorLabel} close={hideError}>
                    {errorText}</MessageWindow>}</div>
        </div>
    );
};

export default LoginComponent;