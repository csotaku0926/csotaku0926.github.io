/** @param {import("axios") AxiosInstance} instance */
export const makeMsg = (instance) => ({
    post_msg({ newMessage, timestamp }) {
        return instance.post("/app/post_msg", { newMessage, timestamp });
    },

    get_all_msg() {
        return instance.get("/app/get_all_msg");
    },

    del_msg({ delete_id }) {
        return instance.post("/app/del_msg", { delete_id });
    }

})