import React from 'react';
import MajorButton from "./UI/buttons/major_button/MajorButton";
import TextInput from "./UI/inputs/text_input/TextInput";
import PasswordInput from "./UI/inputs/password_input/PasswordInput";
import CheckmarkCheckbox from "./UI/checkboxes/checkmark_checkbox/CheckmarkCheckbox";

const LoginComponent = () => {
    return (
        <div>
            <label>Авторизация</label>
            <TextInput label={'Введите логин:'} example={'Login'}></TextInput>
            <PasswordInput label={'Введите пароль:'} example={'Password'}></PasswordInput>
            <CheckmarkCheckbox label={'Запомнить меня'}></CheckmarkCheckbox>
            <MajorButton>Войти</MajorButton>
        </div>
    );
};

export default LoginComponent;