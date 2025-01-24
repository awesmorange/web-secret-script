import scssDoc from '@/doc/css/scss/scss.md?raw'
import scssAtUseDoc from '@/doc/css/scss/at-use.md?raw'
import scssAtMixinDoc from '@/doc/css/scss/at-mixin.md?raw'
import scssAtForwardDoc from '@/doc/css/scss/at-forward.md?raw'
import scssAtImportDoc from '@/doc/css/scss/at-import.md?raw'
import scssAtFunctionDoc from '@/doc/css/scss/at-function.md?raw'
import scssAtExtendDoc from '@/doc/css/scss/at-extend.md?raw'
import scssAtRootDoc from '@/doc/css/scss/at-root.md?raw'
import scssForCodeDoc from '@/doc/css/scss/for-code.md?raw'
import scssAtControlDoc from '@/doc/css/scss/at-control.md?raw'

export const CSS_DOC = [
    { type: 'scss', name: 'SCSS 快速入门', doc: scssDoc },
    {
        type: 'at', name: 'SCSS @规则详解', docTab: [
            { name: '@use', doc: scssAtUseDoc },
            { name: '@forward', doc: scssAtForwardDoc },
            { name: '@import', doc: scssAtImportDoc },
            { name: '@mixin和@include', doc: scssAtMixinDoc },
            { name: '@function', doc: scssAtFunctionDoc },
            { name: '@extend', doc: scssAtExtendDoc },
            { name: '@at-root', doc: scssAtRootDoc },
            { name: '调试', doc: scssForCodeDoc },
            { name: '控制', doc: scssAtControlDoc },
        ]
    },
]

export const CSS_ROUTER = CSS_DOC.map(item => ({
    name: item.name,
    path: `doc/css/${item.type}`,
}))