import pluginDoc from '@/doc/plugin/readme.md?raw'

export const PLUGIN_DOC = [
    { type: 'index', name: 'plugin', doc: pluginDoc },
]

export const PLUGIN_ROUTER = PLUGIN_DOC.map(item => ({
    name: item.name,
    path: `doc/plugin/${item.type}`,
}))