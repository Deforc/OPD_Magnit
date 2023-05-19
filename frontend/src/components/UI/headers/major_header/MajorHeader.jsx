import React, {useEffect, useState} from 'react';
import classes from "./MajorHeader.module.css";
import img from "../../../../img/logo-magnit-white.svg";
import FramelessButton from "../../buttons/frameless_button/FramelessButton";
import {FaUserEdit, FaUserPlus} from "react-icons/fa";
import AdditionalButton from "../../buttons/additional_button/AdditionalButton";
import TextInput from "../../inputs/text_input/TextInput";
import PasswordInput from "../../inputs/password_input/PasswordInput";
import MajorButton from "../../buttons/major_button/MajorButton";
import AdditionalModal from "../../modals/additional_modal/AdditionalModal";
import {IoMdExit} from "react-icons/io";
import {RxCross1} from "react-icons/rx";
import {useNavigate} from "react-router-dom";
import TextSelect from "../../select/TextSelect";
import axios from "axios";

const MajorHeader = () => {
    const [newUserModule, setNewUserModule] = useState(false);
   // const [editUserModule, setEditUserModule] = useState(false);
   // const [user, setUser] = useState(
   //     {login: '', password: '', first_name: '', last_name: ''});
   // const [edit_user, setEditUser] = useState(
   //     {login: '', password: '', first_name: '', last_name: ''});
    const [new_user, setNewUser] = useState({login: '', password: '', first_name: '', last_name: ''});
    const [new_user_role, setNewUser_role] = useState('');

    const navigate = useNavigate();

   // useEffect(() => {
   //     setUser(JSON.parse(localStorage.getItem("user")));
   //     setEditUser(JSON.parse(localStorage.getItem("user")));
   // }, []);

    // function editUser () {
    //     setUser(edit_user);
    //     localStorage.setItem("user", JSON.stringify(user));
    //     if(edit_user.login != user.login ||
    //         edit_user.password != user.password ||
    //         edit_user.first_name != user.first_name ||
    //         edit_user.last_name != user.last_name)
    //         axios.patch("http://localhost:3001/Users"+
    //             '?firstname='+ user.first_name + '&lastname=' + user.last_name + '&password=' + user.password +
    //             '&Role=' + (localStorage.getItem("access") === 'admin' ? 'Admin' : '') +
    //             '&newfirstname='+ edit_user.first_name + '&newpassword=' +
    //             (edit_user.password === '' ? user.password : edit_user.password) + '&newlastname=' + edit_user.last_name,
    //             {},
    //             {headers: {
    //                     'Authorization': ' Bearer ' + localStorage.getItem("token")
    //                 }}).then((responce) => {
    //                 if(responce.status === 200){
    //                     console.log(responce.data);
    //                     setUser(edit_user);
    //                     localStorage.setItem("user", JSON.stringify(user));
    //                 }
    //             }).catch((error) => {
    //                 console.log(error)
    //             });
    // }

    function addNewUser(){
        axios.post("http://localhost:3001/Users",
            {
                firstname: new_user.first_name,
                lastname: new_user.last_name,
                password: new_user.password,
                role: new_user_role,
                id: new_user.login
            },
            {headers: {
                    'Authorization': ' Bearer ' + localStorage.getItem("token")
                }}).then((responce) => {
            if(responce.status === 200){
                console.log(responce.data);
            }
        }).catch((error) => {
            console.log(error)
        });
    }

    // function setEditLogin(login){
    //     setEditUser({login: login, password: edit_user.password, first_name: edit_user.first_name,
    //         last_name: edit_user.last_name})
    // }

    // function setEditPassword(password){
    //     setEditUser({login: edit_user.login, password: password, first_name: edit_user.first_name,
    //         last_name: edit_user.last_name})
    // }

    // function setEditFistName(first_name){
    //     setEditUser({login: edit_user.login, password: edit_user.password, first_name: first_name,
    //         last_name: edit_user.last_name})
    // }

    // function setEditLastName(last_name){
    //     setEditUser({login: edit_user.login, password: edit_user.password, first_name: edit_user.first_name,
    //         last_name: last_name})
    // }

    function setNewLogin(login){
        setNewUser({login: login, password: new_user.password, first_name: new_user.first_name,
            last_name: new_user.last_name})
    }

    function setNewPassword(password){
        setNewUser({login: new_user.login, password: password, first_name: new_user.first_name,
            last_name: new_user.last_name})
    }

    function setNewRole(role){
        setNewUser_role(role);
    }

    function setNewFistName(first_name){
        setNewUser({login: new_user.login, password: new_user.password, first_name: first_name,
            last_name: new_user.last_name})
    }

    function setNewLastName(last_name){
        setNewUser({login: new_user.login, password: new_user.password, first_name: new_user.first_name,
            last_name: last_name})
    }

    return (
        <header className={classes.majorHeader}>
            <img className={classes.logo} src={img}/>
            {(localStorage.getItem("access") === "admin") ?
                <div className={classes.newUser}>
                    <FramelessButton icon={<FaUserPlus/>}
                                     active={newUserModule} onClick={() => setNewUserModule(true)}>
                        Добавить пользователя
                    </FramelessButton>
                    {(newUserModule === true) &&
                        <AdditionalModal className={classes.newUserModal}
                                         visible={newUserModule} setVisible={setNewUserModule}>
                            <div className={classes.modalHeader}>
                                <label className={classes.modalLabel}>Создать пользователя</label>
                                <AdditionalButton onClick={() => setNewUserModule(false)}><RxCross1/></AdditionalButton>
                            </div>
                            <div className={classes.modalStateBlock}>
                                <TextInput get_value={setNewLogin} startValue={new_user.login} label={"Логин"} icon={null}></TextInput>
                                <TextInput get_value={setNewFistName} startValue={new_user.first_name} label={"Имя"} icon={null}></TextInput>
                                <TextInput get_value={setNewLastName} startValue={new_user.last_name} label={"Фамилия"} icon={null}></TextInput>
                                <TextSelect onChange={setNewUser_role} options={[{value: "admin", name: 'Администратор'}, {value: "user", name: 'Пользователь'}]}>Уровень доступа</TextSelect>
                                <PasswordInput get_value={setNewPassword} label={"Пароль"} icon={null}></PasswordInput>
                            </div>
                            <div className={classes.modalButtons}>
                                <MajorButton action={() => {addNewUser(); setNewUserModule(false);}}>Создать</MajorButton>
                            </div>
                        </AdditionalModal>
                    }
                </div> : ''
            }
                {/*<div className={classes.editUser}>*/}
                {/*    <FramelessButton icon={<FaUserEdit/>}*/}
                {/*                     active={editUserModule} onClick={() => setEditUserModule(true)}>*/}
                {/*        {localStorage.getItem("access") == "admin" ? user.last_name + " " + user.first_name[0] + "." :*/}
                {/*            'user' + " " + 'u' + "."}*/}
                {/*    </FramelessButton>*/}
                {/*    {(editUserModule === true) &&*/}
                {/*        <AdditionalModal className={classes.editUserModal}*/}
                {/*                         visible={editUserModule} setVisible={setEditUserModule}>*/}
                {/*            <div className={classes.modalHeader}>*/}
                {/*                <label className={classes.modalLabel}>Редактировать</label>*/}
                {/*                <AdditionalButton onClick={() => setEditUserModule(false)}><RxCross1/></AdditionalButton>*/}
                {/*            </div>*/}
                {/*            <div className={classes.modalStateBlock}>*/}
                {/*                <TextInput get_value={setEditLogin} startValue={user.login} label={"Логин"} icon={null}></TextInput>*/}
                {/*                <TextInput get_value={setEditFistName} startValue={user.first_name} label={"Имя"} icon={null}></TextInput>*/}
                {/*                <TextInput get_value={setEditLastName} startValue={user.last_name} label={"Фамилия"} icon={null}></TextInput>*/}
                {/*                <PasswordInput get_value={setEditPassword} label={"Новый пароль"} icon={null}></PasswordInput>*/}
                {/*            </div>*/}
                {/*            <div className={classes.modalButtons}>*/}
                {/*                <MajorButton action={editUser}>Сохранить</MajorButton>*/}
                {/*            </div>*/}
                {/*        </AdditionalModal>*/}
                {/*    }*/}
                {/*</div>*/}
            <FramelessButton icon={<IoMdExit className={classes.exitIcon}/>}
                             onClick={() => {
                                 // localStorage.removeItem("user");
                                 localStorage.removeItem("access");
                                 localStorage.removeItem("token");
                                 navigate("/");
                             }}>Выйти
            </FramelessButton>
        </header>
    );
};

export default MajorHeader;