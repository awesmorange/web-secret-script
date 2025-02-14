import routerDoc from '@/doc/react/router/react-router.md?raw'

export const REACT_DOC = [
    { name: 'react-router', type: 'router', doc: routerDoc, }
]

export const REACT_ROUTER = REACT_DOC.map(item => ({
    name: item.name,
    path: `doc/react/${item.type}`,
}))