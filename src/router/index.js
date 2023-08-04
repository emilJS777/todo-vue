import { createRouter, createWebHistory } from "vue-router";
import guest_middleware from "@/router/middlewares/guest_middleware";
import auth_middleware from "@/router/middlewares/auth_middleware";


const routes = [
    {
        path: "/guest",
        name: "guest",
        component: () => import("@/views/v-guest.vue"),
        beforeEnter: [guest_middleware]
    },
    {
        path: "/",
        name: "home",
        component: () => import("@/views/v-home.vue"),
        beforeEnter: [auth_middleware]
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router