import {instance} from "./api";

const SKETCHBOOK_URL = 'api/sketchbook/'

export const SketchbookAPI = {
    getSketchbooks() {
        return instance.get(SKETCHBOOK_URL + 'list/')
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
        });
    },
    toggleStatus(sketchbookId, status) {
        return instance.patch(SKETCHBOOK_URL + `${sketchbookId}/toggle-${status}/`)
            .then(response => response.data);
    }
}