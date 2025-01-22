import qiankunDoc from '@/doc/qiankun/qiankun.md?raw'

export const QIANKUN_DOC = [
    { type: 'index', name: 'qiankun', doc: qiankunDoc },
]

export const QIANKUN_ROUTER = QIANKUN_DOC.map(item => ({
    name: item.name,
    path: `doc/qiankun/${item.type}`,
}))