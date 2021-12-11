import {pageAPI} from "../api/page-api";
import {saveCover} from "./sketchbook-reducer";

const SET_LIST = 'chipicao/page/SET_LIST'


let initialState = {
    currentPage: {
        id: null,
        image: '',
        numberOfPage: 1,
    },
    count: 0,
    pages: []
};

const pageReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

const setPages = (count, pages) => ({type: SET_LIST, count, pages});
const setCurrentPage = () => ({});

export const createPage = (sketchbookId, image) => async (dispatch) => {
    await pageAPI.savePage(sketchbookId).then(
        (response) => {
            dispatch(saveImage(response.id, image))
        }
    );
}

export const getPage = (pageId) => async (dispatch) => {
    let {id, image, number_of_page} = await pageAPI.getPage(pageId);
    dispatch(setCurrentPage(id, image, number_of_page));
}

export const updatePositionPage = (pageId, number_of_page) => async (dispatch) => {
    await pageAPI.setPosition(pageId, number_of_page);
    // dispatch(setCurrentPage(id, image, number_of_page));
}

export const saveImage = (pageId, image) => async (dispatch) => {
    const response = await pageAPI.saveImage(pageId, image);
    // dispatch(setImage(response.data.cover));
}

export const getPages = (params) => async (dispatch) => {
    const {count, results} = await pageAPI.getPages(params);
    dispatch(setPages(count, results));
}

export const destroyPage = (pageId) => async (dispatch) => {
    await pageAPI.destroyPage(pageId);
}


export default pageReducer;