import scssDoc from '@/doc/css/scss.md?raw'
import scssAtDoc from '@/doc/css/scss-at.md?raw'

export const CSS_DOC = [
    { type: 'scss', name: 'SCSS 快速入门', doc: scssDoc },
    { type: 'at', name: 'SCSS @规则详解', doc: scssAtDoc },
]

export const CSS_ROUTER = CSS_DOC.map(item => ({
    name: item.name,
    path: `doc/css/${item.type}`,
}))