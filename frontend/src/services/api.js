/** @param {import("axios") AxiosInstance} instance */
export const makeAPI = (instance) => ({
    get_avatar({ username }) {
        return instance.get(`/api/avatar?username=${username}`);
    },
});