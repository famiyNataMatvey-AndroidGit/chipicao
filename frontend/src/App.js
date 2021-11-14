import './App.css';
import store from './redux/redux-store'
import Preloader from "./components/Preloader/Preloader";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import {compose} from "redux";
import {connect, Provider} from 'react-redux'
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom'
import Login from "./components/Login/Login";
import {initializeApp} from "./redux/app-reducer";
import React from "react";
import Administration from "./components/Administration/Administration";


function App(props) {
    if (!props.initialized) {
        props.initializeApp()
        return <Preloader/>
    }
    return (
        <div className="App">
            <Header userPhoto={props.userPhoto}/>
            <Switch>
                <Route path='/login' render={() => <Login/>}/>
                <Route path='/home' render={() => <Home/>}/>
                <Route path='/administration' render={() => <Administration/>}/>
            </Switch>
        </div>

    );
}

const mapStateToProps = (state) => (
    {initialized: state.app.initialized}
)
let AppWithRouter = compose(withRouter, connect(mapStateToProps, {initializeApp}))(App)

const AppContainer = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppWithRouter/>
        </Provider>
    </BrowserRouter>
}

export default AppContainer;
