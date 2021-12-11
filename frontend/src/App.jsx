import s from './App.module.css';
import store from './redux/redux-store'
import Preloader from "./components/Preloader/Preloader";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import {compose} from "redux";
import {connect, Provider} from 'react-redux'
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom'
import Login from "./components/Login/Login";
import {initializeApp} from "./redux/app-reducer";
import React from "react";
import Administration from "./components/Administration/Administration";
import Paper from "@material-ui/core/Paper";


function App(props) {
    if (!props.initialized) {
        props.initializeApp()
        return <Preloader/>
    }
    return (
        <Switch>
            <Route path='/login' render={() => <Login/>}/>
            <Route path='' render={() => (
                <div className={s.main_test}>
                    <Header userPhoto={props.userPhoto}/>
                    <Paper className={s.basic_card}>
                        <Route path='/home' render={() => <Home/>}/>
                        <Route path='/administration' render={() => <Administration/>}/>
                    </Paper>
                    <Footer/>
                </div>
            )}/>
        </Switch>
    );
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

let AppTemp = compose(withRouter, connect(mapStateToProps, {initializeApp}))(App)

const AppContainer = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppTemp/>
        </Provider>
    </BrowserRouter>
}

export default AppContainer;
