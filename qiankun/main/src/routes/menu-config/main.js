const main = [
    {
        name: 'qiankun',
        path: '/qiankun',
        icon: 'el-icon-s-home',
    },
    {
        name: 'babel',
        path: '/babel',
        icon: 'el-icon-s-home',
        children: [
            {
                name: '学什么？',
                path: '/babel/babel',
                icon: 'el-icon-s-home',
            },
            {
                name: '基本概念',
                path: '/babel/concepts',
                icon: 'el-icon-s-home',
            },
            {
                name: '核心组件',
                path: '/babel/core-components',
                icon: 'el-icon-s-home',
            },
            {
                name: '配置文件',
                path: '/babel/configuration',
                icon: 'el-icon-s-home',
            },
            {
                name: '常用预设和插件',
                path: '/babel/presets-and-plugins',
                icon: 'el-icon-s-home',
            },
            {
                name: 'Babel 与构建工具的集成',
                path: '/babel/build-tools',
                icon: 'el-icon-s-home',
            },
            {
                name: 'Polyfill 的使用',
                path: '/babel/polyfill',
                icon: 'el-icon-s-home',
            },
            {
                name: '应用',
                path: '/babel/practice',
                icon: 'el-icon-s-home',
            }
        ]
    },
    {
        name: 'js',
        path: '/js',
        icon: 'el-icon-s-home',
        children: [
            {
                name: '目录',
                path: '/js/index',
                icon: 'el-icon-s-home',
            },
            {
                name: '函数',
                path: '/js/function',
                icon: 'el-icon-s-home',
            },
            {
                name: '踩坑记录',
                path: '/js/note',
                icon: 'el-icon-s-home',
                children: [
                    {
                        name: 'js',
                        path: '/js/note',
                        icon: 'el-icon-s-home',
                    },
                    {
                        name: 'chrome',
                        path: '/chrome',
                        icon: 'el-icon-s-home',
                    },
                    {
                        name: 'h5',
                        path: '/h5',
                        icon: 'el-icon-s-home',
                    },
                    {
                        name: 'AMD',
                        path: '/js/amd',
                        icon: 'el-icon-s-home',
                    },
                    {
                        name: 'promise',
                        path: '/js/promise',
                        icon: 'el-icon-s-home',
                    },
                ]
            },
        ]
    },
    {
        name: 'algorithm',
        path: '/algorithm',
        icon: 'el-icon-s-home',
        children: [
            {
                name: '广度优先(breadth-first)',
                path: '/algorithm/breadth-first',
                icon: 'el-icon-s-home',
            },
            {
                name: '深度优先(depth-first)',
                path: '/algorithm/depth-first',
                icon: 'el-icon-s-home',
            },
            {
                name: '平面转树形(flat2Tree)',
                path: '/algorithm/flat2Tree',
                icon: 'el-icon-s-home',
            },
            {
                name: '树形转平面(tree2Flat)',
                path: '/algorithm/tree2Flat',
                icon: 'el-icon-s-home',
            },
        ]
    },
    {
        name: 'npm-lock',
        path: '/npm-lock',
        icon: 'el-icon-s-home',
    },
    {
        name: 'plugin',
        path: '/plugin',
        icon: 'el-icon-s-home',
    },
]

export default main