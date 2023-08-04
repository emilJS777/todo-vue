import Vuex from "vuex";
import auth from "./modules/auth";
import user from "./modules/user"
import todo from "./modules/todo"

export default new Vuex.Store({
    namespaced: true,
    modules: {
        auth,
        user,
        todo,
    }
})