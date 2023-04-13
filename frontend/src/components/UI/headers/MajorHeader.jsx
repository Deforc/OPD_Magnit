import React, {useState} from 'react';
import classes from "./MajorHeader.module.css";
import img from "../../../img/logo-magnit-white.svg";
import FramelessButton from "../buttons/frameless_button/FramelessButton";
import {FaUserEdit, FaUserPlus} from "react-icons/fa";
import AdditionalButton from "../buttons/additional_button/AdditionalButton";
import TextInput from "../inputs/text_input/TextInput";
import PasswordInput from "../inputs/password_input/PasswordInput";
import MajorButton from "../buttons/major_button/MajorButton";
import AdditionalModal from "../modals/additional_modal/AdditionalModal";
import {IoMdExit} from "react-icons/io";
import {RxCross1} from "react-icons/rx";
import {useNavigate} from "react-router-dom";

const MajorHeader = () => {
    const [newUserModule, setNewUserModule] = useState(false);
    const [editUserModule, setEditUserModule] = useState(false);

    const navigate = useNavigate();

    return (
        <header className={classes.majorHeader}>
            <img className={classes.logo} src={img}/>
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
                            <TextInput label={"Логин"} icon={null}></TextInput>
                            <TextInput label={"Фамилия"} icon={null}></TextInput>
                            <TextInput label={"Имя"} icon={null}></TextInput>
                            <TextInput label={"Отчество"} icon={null}></TextInput>
                            <TextInput label={"Уровень доступа"} icon={null}></TextInput>
                            <PasswordInput label={"Пароль"} icon={null}></PasswordInput>
                            <PasswordInput label={"Подтвердите пароль"} icon={null}></PasswordInput>
                        </div>
                        <div className={classes.modalButtons}>
                            <AdditionalButton>Отмена</AdditionalButton>
                            <MajorButton>Создать</MajorButton>
                        </div>
                    </AdditionalModal>
                }
            </div>
            <div className={classes.editUser}>
                <FramelessButton icon={<FaUserEdit/>}
                                 active={editUserModule} onClick={() => setEditUserModule(true)}>
                    Superuser T. N.
                </FramelessButton>
                {(editUserModule === true) &&
                    <AdditionalModal className={classes.editUserModal}
                                     visible={editUserModule} setVisible={setEditUserModule}>
                        <div className={classes.modalHeader}>
                            <label className={classes.modalLabel}>Редактировать</label>
                            <AdditionalButton onClick={() => setEditUserModule(false)}><RxCross1/></AdditionalButton>
                        </div>
                        <div className={classes.modalStateBlock}>
                            <TextInput label={"Логин"} icon={null}></TextInput>
                            <TextInput label={"Имя"} icon={null}></TextInput>
                            <TextInput label={"Фамилия"} icon={null}></TextInput>
                            <TextInput label={"Отчество"} icon={null}></TextInput>
                            <PasswordInput label={"Новый пароль"} icon={null}></PasswordInput>
                            <PasswordInput label={"Подтвердите пароль"} icon={null}></PasswordInput>
                        </div>
                        <div className={classes.modalButtons}>
                            <AdditionalButton>Отмена</AdditionalButton>
                            <MajorButton>Сохранить</MajorButton>
                        </div>
                    </AdditionalModal>
                }
            </div>
            <FramelessButton icon={<IoMdExit className={classes.exitIcon}/>}
                             onClick={() => navigate("/")}>Выйти
            </FramelessButton>
        </header>
    );
};

export default MajorHeader;