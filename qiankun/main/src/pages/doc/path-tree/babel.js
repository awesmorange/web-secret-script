import babelDoc from '@/doc/babel/babel.md?raw'
import buildToolsDoc from '@/doc/babel/build-tools.md?raw'
import conceptsDoc from '@/doc/babel/concepts.md?raw'
import configurationDoc from '@/doc/babel/configuration.md?raw'
import coreComponentsDoc from '@/doc/babel/core-components.md?raw'
import polyfillDoc from '@/doc/babel/polyfill.md?raw'
import practiceDoc from '@/doc/babel/practice.md?raw'
import presetsAndPlugindDoc from '@/doc/babel/presets-and-plugins.md?raw'

export const BABEL_DOC = [
    { type: 'babel', name: '学什么？', doc: babelDoc },
    { type: 'concepts', name: '基本概念', doc: conceptsDoc },
    { type: 'core-components', name: '核心组件', doc: coreComponentsDoc },
    { type: 'configuration', name: '配置文件', doc: configurationDoc },
    { type: 'presets-and-plugins', name: '常用预设和插件', doc: presetsAndPlugindDoc },
    { type: 'build-tools', name: '构建工具', doc: buildToolsDoc },
    { type: 'polyfill', name: 'polyfill', doc: polyfillDoc },
    { type: 'practice', name: '实践', doc: practiceDoc },
]

export const BABEL_ROUTER = BABEL_DOC.map(item => ({
    name: item.name,
    path: `doc/babel/${item.type}`,
}))