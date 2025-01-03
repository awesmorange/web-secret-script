import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home/index.vue';
import Path from '@/views/Path/index.vue';

Vue.use(Router);

export default new Router({
    mode: 'history', // 设置路由模式为history
    base: '/sub-vue2', // 设置基础路由
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/path',
            name: 'Path',
            component: Path,
        },
    ],
});
