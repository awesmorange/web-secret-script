import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/components/Layout/index.vue'
import Home from '@/views/home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'layout',
            component: Layout,
            redirect: {
                name: "home"
            },
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: Home,
                },
            ]
        },
    ],
})

export default router
