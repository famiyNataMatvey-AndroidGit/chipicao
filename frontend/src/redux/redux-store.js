import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";
import sketchbookReducer from "./sketchbook-reducer";
import pageReducer from "./page-reducer";

let reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    form: formReducer,
    page: pageReducer,
    sketchbook: sketchbookReducer,

});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
window.__store__ = store;

export default store;