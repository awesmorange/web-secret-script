import onlineDoc from '@/doc/online/index.md?raw'
import corsDoc from '@/doc/online/cors.md?raw'

export const ONLINE_DOC = [
    { type: 'online', name: '部署', doc: onlineDoc },
    { type: 'cors', name: '跨域', doc: corsDoc },
]

export const ONLINE_ROUTER = ONLINE_DOC.map(item => ({
    name: item.name,
    path: `doc/online/${item.type}`,
}))