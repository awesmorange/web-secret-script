import { ALGORITHM_DOC, ALGORITHM_ROUTER } from './algorithm'
import { BABEL_DOC, BABEL_ROUTER } from './babel'
import { CI_DOC, CI_ROUTER } from './ci'
import { CSS_DOC, CSS_ROUTER } from './css'
import { JS_DOC, JS_ROUTER } from './js'
import { NPM_LOCK_DOC, NPM_LOCK_ROUTER } from './npm-lock'
import { PLUGIN_DOC, PLUGIN_ROUTER } from './plugin'
import { QIANKUN_DOC, QIANKUN_ROUTER } from './qiankun'

export const DOC_TREE = [
    {
        name: 'qiankun',
        subject: 'qiankun',
        children: QIANKUN_DOC
    },
    {
        name: 'js',
        subject: 'js',
        children: JS_DOC
    },
    {
        name: 'babel',
        subject: 'babel',
        children: BABEL_DOC
    },
    {
        name: 'algorithm',
        subject: 'algorithm',
        children: ALGORITHM_DOC
    },
    {
        name: 'css',
        subject: 'css',
        children: CSS_DOC
    },
    {
        name: 'npm-lock',
        subject: 'npm-lock',
        children: NPM_LOCK_DOC
    },
    {
        name: 'plugin',
        subject: 'plugin',
        children: PLUGIN_DOC
    },
    {
        name: 'ci',
        subject: 'ci',
        children: CI_DOC
    },
]

export const DOC_ROUTER = [
    {
        name: 'qiankun',
        path: 'doc/qiankun',
        children: QIANKUN_ROUTER
    },
    {
        name: 'js',
        path: 'doc/js',
        children: JS_ROUTER
    },
    {
        name: 'babel',
        path: 'doc/babel',
        children: BABEL_ROUTER
    },
    {
        name: '算法',
        path: 'doc/algorithm',
        children: ALGORITHM_ROUTER
    },
    {
        name: 'css',
        path: 'doc/css',
        children: CSS_ROUTER
    },
    {
        name: 'npm-lock',
        path: 'doc/npm-lock',
        children: NPM_LOCK_ROUTER
    },
    {
        name: '插件',
        path: 'doc/plugin',
        children: PLUGIN_ROUTER
    },
    {
        name: 'ci',
        path: 'doc/ci',
        children: CI_ROUTER
    },
]