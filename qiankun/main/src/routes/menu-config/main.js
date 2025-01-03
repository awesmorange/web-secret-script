const main = [
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
        children: [
            {
                name: 'AMD',
                path: '/js/amd',
                icon: 'el-icon-s-home',
            },
            {
                name: 'interview',
                path: '/js/interview',
                icon: 'el-icon-s-home',
            },
            {
                name: 'promise',
                path: '/js/promise',
                icon: 'el-icon-s-home',
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