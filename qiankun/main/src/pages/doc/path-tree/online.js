import onlineDoc from '@/doc/online/index.md?raw'

export const ONLINE_DOC = [
    { type: 'online', name: '部署', doc: onlineDoc },
]

export const ONLINE_ROUTER = ONLINE_DOC.map(item => ({
    name: item.name,
    path: `doc/online/${item.type}`,
}))