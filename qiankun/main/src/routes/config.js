const menus = [
    {
        name: '首页',
        path: '/',
        icon: 'el-icon-s-home',
    },
    {
        name: 'qiankun',
        path: '/qiankun',
        icon: 'el-icon-s-home',
    },
    {
        name: 'chrome',
        path: '/chrome',
        icon: 'el-icon-s-home',
    },
    {
        name: 'babel',
        path: '/babel',
        icon: 'el-icon-s-home',
    },
    {
        name: 'h5',
        path: '/h5',
        icon: 'el-icon-s-home',
    },
    {
        name: 'js',
        path: '/js',
        icon: 'el-icon-s-home',
    },
    {
        name: 'npm-lock',
        path: '/npm-lock',
        icon: 'el-icon-s-home',
    },
    {
        name: 'vue2_7',
        path: '/vue2_7',
        icon: 'el-icon-s-home',
    },
    {
        name: 'plugin',
        path: '/plugin',
        icon: 'el-icon-s-home',
    },
    {
        name: 'sub-vue2',
        path: '/sub-vue2',
        icon: 'el-icon-s-home',
    },
    {
        name: 'sub-vue3',
        path: '/sub-vue3',
        icon: 'el-icon-s-home',
    },
    {
        name: 'react',
        path: '/sub-react',
        icon: 'el-icon-s-home',
        children: [
            {
                name:'router',
                path: '/sub-react/router',
                icon: 'el-icon-s-home',
            },
        ]
    },
]

export default menus;