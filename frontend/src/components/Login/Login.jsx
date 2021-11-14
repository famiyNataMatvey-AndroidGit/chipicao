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
import {Box, Link, TextField, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    variant="outlined"
    size="small"
    fullWidth
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)


const AuthenticationForm = ({handleSubmit, error, registrationMode}) => {
    return (
        <form onSubmit={handleSubmit}>
            {registrationMode ? createField("Email", "email", [required], renderTextField) : null}
            {createField("Имя пользователя", "username", [required], renderTextField)}
            {createField("Password", "password", [required], renderTextField, {type: "password"})}

            {
                error &&
                <div className={style.formSummaryError}>
                    {error}
                </div>
            }
            <div align="center">
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                  {registrationMode ? "Регистрация" : "Войти"}
                </Button>
            </div>
        </form>
    )
}

const AuthenticationReduxForm = reduxForm({form: 'authentication'})(AuthenticationForm)


const Login = (props) => {
    let [registrationMode, setRegistrationMode] = useState(false);

    if (props.isAuth) {
        return <Redirect to={'/home'}/>
    }

    let onSubmit = (formData) => {
        props.login(formData.username, formData.password)
    };
    if (registrationMode) {
        onSubmit = (formData) => {
            props.registration(formData.email, formData.username, formData.password, setRegistrationMode)
        }
    }

    return <div className={s.login_page}>
        <div className={s.naruto_block}>
            <img className={s.naruto} src={naruto} alt='Naruto'/>
        </div>

        <div className={s.content}>
            <Typography align="center" component="h1" variant="h5">{registrationMode ? 'Регистрация' : 'Войти'}</Typography>
            <AuthenticationReduxForm onSubmit={onSubmit} registrationMode={registrationMode}/>
            <div align="center">
                <Link to='/login' variant="body2" onClick={() => setRegistrationMode(!registrationMode)}>
                  {registrationMode ? 'Перейти ко входу в систему': 'Перейти к регистрация'}
                </Link>
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