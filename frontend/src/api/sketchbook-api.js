import {instance} from "./api";

const SKETCHBOOK_URL = 'api/sketchbook/'

export const sketchbookAPI = {
    // getShortSketchbooks(params) {
    //     return instance.get(SKETCHBOOK_URL + 'list/short/', params)
    //         .then(response => response.data);
    // },
    getSketchbooks(params) {
        return instance.get(SKETCHBOOK_URL, params)
            .then(response => response.data);
    },

    saveSketchbook(name, description) {
        return instance.post(SKETCHBOOK_URL, {name: name, description: description})
            .then(response => response.data);
    },
    getSketchbook(sketchbookId) {
        return instance.get(SKETCHBOOK_URL + `${sketchbookId}/retrieve/`)
            .then(response => response.data);
    },
    updatedSketchbook(sketchbookId, name, description) {
        return instance.patch(SKETCHBOOK_URL + `${sketchbookId}/`, {name: name, description: description})
            .then(response => response.data);
    },
    saveCover(sketchbookId, side, coverFile) {
        const formData = new FormData();
        formData.append("file", coverFile);

        return instance.patch(SKETCHBOOK_URL + `${sketchbookId}/${side}-cover/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },
    toggleStatus(sketchbookId, status) {
        return instance.patch(SKETCHBOOK_URL + `${sketchbookId}/toggle-${status}/`)
            .then(response => response.data);
    },
    buySketchbook(sketchbookId) {
        return instance.get(SKETCHBOOK_URL + `${sketchbookId}/buy/`)
            .then(response => response.data);
    }
}