import scenarioizationDoc from '@/doc/scenarioization/index.md?raw'

import deviceDoc from '@/doc/scenarioization/device&env/de_1.md?raw'
import corsDoc from '@/doc/scenarioization/device&env/de_2.md?raw'
import cookieDoc from '@/doc/scenarioization/device&env/de_3.md?raw'
import paltformDoc from '@/doc/scenarioization/device&env/de_4.md?raw'

import vg_1Doc from '@/doc/scenarioization/version&git/vg_1.md?raw'
import vg_2Doc from '@/doc/scenarioization/version&git/vg_2.md?raw'
import vg_3Doc from '@/doc/scenarioization/version&git/vg_3.md?raw'
import vg_4Doc from '@/doc/scenarioization/version&git/vg_4.md?raw'

export const SCENARIOIZATION_DOC = [
    { type: 'scenarioization', name: '目录', doc: scenarioizationDoc },
    {
        type: 'device', name: '设备与环境判断', docTab: [
            { name: '判断用户设备', doc: deviceDoc },
            { name: 'cdn 请求资源无跨域', doc: corsDoc },
            { name: 'cookie不同域共享', doc: cookieDoc },
            { name: '平台应用判断', doc: paltformDoc },
        ]
    },
    {
        type: 'version', name: '版本控制与代码管理', docTab: [
            { name: '多次提交压为一次', doc: vg_1Doc },
            { name: '定位哪个 commit 引的错', doc: vg_2Doc },
            { name: '移除一个指定的 commit', doc: vg_3Doc },
            { name: 'git 仓库迁移', doc: vg_4Doc },
        ]
    },
]

export const SCENARIOIZATION_ROUTER = SCENARIOIZATION_DOC.map(item => ({
    name: item.name,
    path: `doc/scenarioization/${item.type}`,
}))