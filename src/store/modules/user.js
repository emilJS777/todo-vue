import request from "@/store/request";

const auth = {
    namespaced: true,
    actions: {
        async POST(context, body){
            const data = await request(context, `/user`, "POST", body)
            return data
        },
    },
}

export default auth