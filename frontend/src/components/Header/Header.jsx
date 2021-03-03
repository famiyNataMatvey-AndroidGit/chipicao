import React, {useState} from 'react';
import {compose} from "redux";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import userMockPhoto from "../../assets/images/user.png";
import logoPhoto from "../../assets/images/logo.png";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";


const LOGOUT = 'Выход'
const HOME = 'Главная'
const MY_COLLECTION = 'Моя коллекция'
const ADMINISTRATION = 'Администрирование'

const Header = (props) => {
    let [logoutMode, setLogoutMode] = useState(false);
    const logoutContainer = () => {
        return (
            <div className={s.pop_container}>
                <div className={s.logout_container} onClick={() => props.logout()}>
                    <label className={s.logout}>{LOGOUT}</label>
                </div>

            </div>
        )
    }

    return (
        <header className={s.header}>
            <img className={s.header_logo} src={logoPhoto}/>
            <div className={s.header_nav_link}>
                <NavLink className={s.header_category} to={'/'}>{HOME}</NavLink>
                <NavLink className={s.header_category} to={'/'}>{MY_COLLECTION}</NavLink>
                <NavLink className={s.header_category} to={'/administration'}>{ADMINISTRATION}</NavLink>
            </div>
            <img className={s.header_avatar}
                 onClick={() => setLogoutMode(!logoutMode)}
                 src={props.userPhoto ?? userMockPhoto}/>
            {logoutMode ? logoutContainer() : null}
        </header>
    )
}

const mapStateToProps = (state) => ({
})

export default compose(withAuthRedirect,
    connect(mapStateToProps, {logout})
)(Header)
