import {instance} from "./api";

const PAGE_URL = 'api/page/'

export const pageAPI = {
    getPages(params) {
        return instance.get(PAGE_URL + 'list/', params)
            .then(response => response.data);
    },
    flipPage(pageId, side) {
        return instance.patch(PAGE_URL + `${pageId}/${side}-page/`, {})
            .then(response => response.data);
    }
}

export  const pageAdminAPI = {
    savePage(numberOfPage, sketchbook) {
        return instance.post(PAGE_URL, {number_of_page: numberOfPage, sketchbook: sketchbook})
            .then(response => response.data);
    },
    setPositionPage(pageId, position) {
        return instance.patch(PAGE_URL + `${pageId}/set-position/${position}/`, {})
            .then(response => response.data);
    },
    saveImage(pageId, image) {
        const formData = new FormData();
        formData.append("file", image);

        return instance.patch(PAGE_URL + `${pageId}/image/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },
    destroyPage(pageId) {
        return instance.delete(PAGE_URL + `${pageId}/`)
            .then(response => response.data);
    }
}