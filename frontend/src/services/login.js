/** @param {import("axios") AxiosInstance} instance */
export const makeLogin = (instance) => ({
    login({ username, password }) {
        return instance.post("/api/login", { username, password });
    },

    check_login() {
        return instance.get("/api/check_login");
    },

    logout() {
        return instance.post("/api/logout");
    }
})