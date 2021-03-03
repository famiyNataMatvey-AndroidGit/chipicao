import React, {useState} from 'react'
import s from './Login.module.css';
import {createField, Input} from "../common/FormsControls/FormsControls";
import shamanKing from "../../assets/images/shamanKing.png";
import naruto from "../../assets/images/naruto.png";
import {NavLink, Redirect} from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css"
import {required} from "../../utils/validators";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login, registration} from "../../redux/auth-reducer";

const AuthenticationForm = ({handleSubmit, error, registrationMode}) => {
    return (
        <form onSubmit={handleSubmit}>
            {registrationMode ? createField("Email", "email", [required], Input) : null}
            {createField("Имя пользователя", "username", [required], Input)}
            {createField("Password", "password", [required], Input, {type: "password"})}

            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>{registrationMode ? "Регистрация" : "Войти"}</button>
            </div>

        </form>
    )
}

const AuthenticationReduxForm = reduxForm({form: 'authentication'})(AuthenticationForm)


const Login = (props) => {
    let [registrationMode, setRegistrationMode] = useState(false);
    let onSubmit = (formData) => {
        props.login(formData.username, formData.password)
    };

    if (registrationMode) {
        onSubmit = (formData) => {
            props.registration(formData.email, formData.username, formData.password, setRegistrationMode)
        }
    }

    if (props.isAuth) {
        return <Redirect to={'/home'}/>
    }

    return <div className={s.login_page}>
        <div className={s.naruto_block}>
            <img className={s.naruto} src={naruto} alt='Naruto'/>
        </div>
        <div className={s.content}>
            <h2>{registrationMode ? 'Регистрация' : 'Войти'}</h2>
            <AuthenticationReduxForm onSubmit={onSubmit} registrationMode={registrationMode}/>
            <div>
                <NavLink to='/login' onClick={() => setRegistrationMode(!registrationMode)}>
                    {registrationMode ? 'Перейти ко входу в систему': 'Перейти к регистрация'}
                </NavLink>
            </div>
        </div>
        <div className={s.shaman_king_block}>
            <img className={s.shaman_king} src={shamanKing} alt='Shaman king'/>
        </div>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login, registration})(Login);