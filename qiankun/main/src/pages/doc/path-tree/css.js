import scssDoc from '@/doc/css/scss/scss.md?raw'
import scssAtUseDoc from '@/doc/css/scss/at-use.md?raw'
import scssAtMixinDoc from '@/doc/css/scss/at-mixin.md?raw'
import scssAtForwardDoc from '@/doc/css/scss/at-forward.md?raw'
import scssAtImportDoc from '@/doc/css/scss/at-import.md?raw'
import scssAtFunctionDoc from '@/doc/css/scss/at-function.md?raw'
import scssAtExtendDoc from '@/doc/css/scss/at-extend.md?raw'
import scssAtRootDoc from '@/doc/css/scss/at-root.md?raw'
import scssAtErrorDoc from '@/doc/css/scss/at-error.md?raw'
import scssAtWarnDoc from '@/doc/css/scss/at-warn.md?raw'
import scssAtDebugDoc from '@/doc/css/scss/at-debug.md?raw'
import scssAtIfDoc from '@/doc/css/scss/at-if.md?raw'
import scssAtEachDoc from '@/doc/css/scss/at-each.md?raw'
import scssAtForDoc from '@/doc/css/scss/at-for.md?raw'
import scssAtWhileDoc from '@/doc/css/scss/at-while.md?raw'

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
            { name: '@error', doc: scssAtErrorDoc },
            { name: '@warn', doc: scssAtWarnDoc },
            { name: '@debug', doc: scssAtDebugDoc },
            { name: '@if', doc: scssAtIfDoc },
            { name: '@each', doc: scssAtEachDoc },
            { name: '@for', doc: scssAtForDoc },
            { name: '@while', doc: scssAtWhileDoc },
        ]
    },
]

export const CSS_ROUTER = CSS_DOC.map(item => ({
    name: item.name,
    path: `doc/css/${item.type}`,
}))