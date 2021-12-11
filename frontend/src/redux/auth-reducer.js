import {authAPI} from "../api/auth-api";
import {setToken} from "../api/api";

const SET_CURRENT_USER = 'chipicao/auth/SET_CURRENT_USER'

let initialState = {
    userId: null,
    avatar: null,
    coins: null,
    fullName: '',
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

const setCurrentUser = (userId, avatar, coins, fullName, isAuth) => ({
    type: SET_CURRENT_USER, payload: {userId, avatar, coins, fullName, isAuth}
});

export const registration = (email, username, password, setRegistrationMode) => async (dispatch) => {
    const response = await authAPI.registration(email, username, password)
    setRegistrationMode(false)
}

export const login = (username, password) => async (dispatch) => {
    const loginResponse = await authAPI.login(username, password)
    setToken(loginResponse.auth_token)

    const currentUserResponse = await authAPI.currentUser()
    let {id, avatar, full_name, coins} = currentUserResponse;
    dispatch(setCurrentUser(id, avatar, coins, full_name, true));
}

export const logout = () => async (dispatch) => {
    await authAPI.logout()
    setToken(null)
    dispatch(setCurrentUser(null, null, null, null, false))
}

export default authReducer;