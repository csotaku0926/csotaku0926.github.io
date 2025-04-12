/** @param {import("axios") AxiosInstance} instance */
export const makeAuth = (instance) => ({
    test() {
        return instance.get("/test");
    },

    register({ username, password, avatar }) {
        return instance.post("/api/register", {username, password, avatar});
    }
});