import React, {useState} from 'react';
import MajorButton from "./UI/buttons/major_button/MajorButton";
import TextInput from "./UI/inputs/text_input/TextInput";
import PasswordInput from "./UI/inputs/password_input/PasswordInput";
import CheckmarkCheckbox from "./UI/checkboxes/checkmark_checkbox/CheckmarkCheckbox";
import axios from "axios";
import MessageWindow from "./UI/modals/MessageWindow";

const LoginComponent = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState(false);
    const [showError, setError] = useState(false);
    const [errorLabel, setLabel] = useState('');
    const [errorText, setText] = useState('');

    async function sendLoginRequest(){
        await axios.post("http://localhost:3001", {
            login: login,
            password: password,
            isRemember: isRemember},
            {headers: {'Content-Type': 'application/json'
            }}).then((response) => {
                if (response.status === 200){
                    sentError('OK', 'OK');
                }
            }).catch(function (error) {
                if (error.request.status === 0){
                    sentError('Ошибка сервера',
                        'Сервер не отвечает. Попробуйте снова через несколько минут.');
                }
                if (error.request.status === 401){
                    sentError('Ошибка авторизации',
                        'Пользователь с такими логином и паролем не найден.\r\n' +
                        'Проверьте корректность введенных данных.');
                }
            });
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
        <div>
            <label>Авторизация</label>
            <TextInput label={'Введите логин:'} example={'Login'}
                       get_value={changeLogin}></TextInput>
            <PasswordInput label={'Введите пароль:'} example={'Password'}
                           get_value={changePassword}></PasswordInput>
            <CheckmarkCheckbox label={'Запомнить меня'}
                               get_value={toggleIsRemember}></CheckmarkCheckbox>
            <MajorButton action={sendLoginRequest}>Войти</MajorButton>
            {(showError === true) && <MessageWindow label={errorLabel} close={hideError}>
                {errorText}</MessageWindow>}
        </div>
    );
};

export default LoginComponent;