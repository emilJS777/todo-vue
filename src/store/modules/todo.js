import request from "@/store/request";

const todo = {
    namespaced: true,
    actions: {
        async POST(context, body){
            const data = await request(context, `/todo`, "POST", body)
            return data
        },
        async PUT(context, body){
            const data = await request(context, `/todo?id=${body.id}`, "PUT", body.form)
            return data
        },
        async DELETE(context, id){
            const data = await request(context, `/todo?id=${id}`, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, `/todo`+query, "GET")
            return data
        },
        async PATCH(context, id){
            const data = await request(context, `/todo?id=${id}`, "PATCH")
            return data
        },
    },
}

export default todo