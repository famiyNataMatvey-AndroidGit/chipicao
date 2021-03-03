import {instance} from "./api";

export const authAPI = {
    registration(email, username, password) {
        return instance.post(`auth/users/`, {email, username, password})
            .then(res => res.data);
    },
    login(username, password) {
        return instance.post(`auth/token/login/`, {username, password})
            .then(res => res.data);
    },
    currentUser() {
        return instance.get(`auth/users/me/`).then(res => res.data);
    },
    logout() {
        return instance.post(`auth/token/logout/`);
    }
}