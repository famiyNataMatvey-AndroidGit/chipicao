import {sketchbookAPI} from "../api/sketchbook-api";

const BACK_COVER = 'back'
const FRONT_COVER = 'front'

const SET_LIST = 'chipicao/sketchbook/SET_LIST'
const SET_PURCHASED = 'chipicao/sketchbook/SET_PURCHASED'
const SAVE_BACK_COVER = 'chipicao/sketchbook/SAVE_BACK_COVER'
const SAVE_FRONT_COVER = 'chipicao/sketchbook/SAVE_FRONT_COVER'
const SET_CURRENT_SKETCHBOOK = 'chipicao/sketchbook/SET_CURRENT_USER'

const COVER_ACTION = {
    BACK_COVER: SAVE_BACK_COVER,
    FRONT_COVER: SAVE_FRONT_COVER
}

let initialState = {
    currentSketchbook: {
        id: null,
        name: null,
        description: null,
        frontCover: null,
        backCover: null,
        isPurchased: false
    },
    count: 0,
    sketchbooks: []
};

const sketchbookReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_SKETCHBOOK:
            return {
                ...state,
                currentSketchbook: {...action.payload}
            }
        case SET_PURCHASED: {
            return {
                ...state,
                currentSketchbook: {...state.currentSketchbook, isPurchased: action.isPurchased}
            }
        }
        case SAVE_BACK_COVER: {
            return {
                ...state,
                currentSketchbook: {...state.currentSketchbook, backCover: action.pathCover}
            }
        }
        case SAVE_FRONT_COVER: {
            return {
                ...state,
                currentSketchbook: {...state.currentSketchbook, frontCover: action.pathCover}
            }
        }
        case SET_LIST: {
            return {
                ...state,
                count: action.count,
                sketchbooks: action.sketchbooks
            }
        }
        default:
            return state;
    }
}

const setCurrentSketchbook = (id, name, description, frontCover, backCover, isPurchased, pages) => ({
    type: SET_CURRENT_SKETCHBOOK, payload: {id, name, description, frontCover, backCover, isPurchased, pages}
});
const setPurchased = (isPurchased) => ({type: SET_PURCHASED, isPurchased});
const setCover = (side, pathCover) => ({type: COVER_ACTION[side], pathCover});
const setSketchbooks = (count, sketchbooks)  => ({type: SET_LIST, count, sketchbooks});

export const createSketchbook = (name, description, frontCover, backendCover) => async (dispatch) => {
    const {id, name, description} = await sketchbookAPI.saveSketchbook(name, description);
    dispatch(setCurrentSketchbook(id, name, description, null, null, false, [])).then(
        (response) => {
            dispatch(saveCover(id, COVER_ACTION.FRONT_COVER, frontCover))
            dispatch(saveCover(id, COVER_ACTION.BACK_COVER, backendCover))
        }
    );
}

export const getSketchbook = (sketchbookId) => async (dispatch) => {
    const response = await sketchbookAPI.getSketchbook(sketchbookId);
    let {id, name, description, front_cover, back_cover, is_purchased, pages} = response;
    dispatch(setCurrentSketchbook(id, name, description, front_cover, back_cover, is_purchased, pages));
}

// todo: Метод работает не верно. Вначале обновляем, если ответ 200, то делаем диспатч на Получение альбома
export const updateSketchbook = (sketchbookId, new_name, new_description) => async (dispatch) => {
    let {id, name, description} = await sketchbookAPI.updatedSketchbook(sketchbookId, new_name, new_description);
    dispatch(setCurrentSketchbook(id, name, description, null, null, false, []));
}

export const saveCover = (sketchbookId, side, coverFile) => async (dispatch) => {
    const response = await sketchbookAPI.saveCover(sketchbookId, side, coverFile);
    dispatch(setCover(side, response.cover));
}

// export const getShortSketchbooks = (params) => async (dispatch) => {
//     const {count, results} = await sketchbookAPI.getShortSketchbooks(params);
//     dispatch(setSketchbooks(count, [], results));
// }

export const toggleStatus = (sketchbookId, status, params) => async (dispatch) => {
    await sketchbookAPI.toggleStatus(sketchbookId, status);
    dispatch(getSketchbooks(params))
    // const {count, results} = await sketchbookAPI.getShortSketchbooks(params);
    // dispatch(setSketchbooks(count, [], results));
}

export const getSketchbooks = (params) => async (dispatch) => {
    const {count, results} = await sketchbookAPI.getSketchbooks(params);
    dispatch(setSketchbooks(count, results));
}

export const buySketchbook = (sketchbookId) => async (dispatch) => {
    const response = await sketchbookAPI.buySketchbook(sketchbookId);
    dispatch(setPurchased(response.is_purchased));
}

export default sketchbookReducer;