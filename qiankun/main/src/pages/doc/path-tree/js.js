import jsDoc from '@/doc/js/js.md?raw'
// function
import arrowFunctionDoc from '@/doc/js/function/arrow-function.md?raw'
import functionDoc from '@/doc/js/function/function.md?raw'
import insideDoc from '@/doc/js/function/inside.md?raw'
import propertiesAndMethodDoc from '@/doc/js/function/properties-and-methods.md?raw'
import recursionDoc from '@/doc/js/function/recursion.md?raw'
import tailCallDoc from '@/doc/js/function/tail-call.md?raw'
import closureDoc from '@/doc/js/function/closure.md?raw'
import privateVarDoc from '@/doc/js/function/private-variable.md?raw'
// object-class
import objectDoc from '@/doc/js/object-class/object.md?raw'
import createDoc from '@/doc/js/object-class/create.md?raw'
import prototypeDoc from '@/doc/js/object-class/prototype.md?raw'
import extendDoc from '@/doc/js/object-class/extend.md?raw'
import classDoc from '@/doc/js/object-class/class.md?raw'
// note
import amdDoc from '@/doc/js/note/AMD.md?raw'
import noteDoc from '@/doc/js/note/note.md?raw'
import promiseDoc from '@/doc/js/note/promise.md?raw'
import chromeDoc from '@/doc/chrome/readme.md?raw'
import h5Doc from '@/doc/h5/diary.md?raw'

export const JS_DOC = [
    { type: 'index', name: '目录', doc: jsDoc },
    {
        type: 'function', name: '函数', docTab: [
            { name: '箭头函数', doc: arrowFunctionDoc },
            { name: '函数', doc: functionDoc },
            { name: '函数内部', doc: insideDoc },
            { name: '属性和方法', doc: propertiesAndMethodDoc },
            { name: '递归', doc: recursionDoc },
            { name: '尾调用优化', doc: tailCallDoc },
            { name: '闭包', doc: closureDoc },
            { name: '私有变量', doc: privateVarDoc },

        ]
    },
    {
        type: 'object-class', name: '对象、类', docTab: [
            { name: '理解对象', doc: objectDoc },
            { name: '创建对象', doc: createDoc },
            { name: '原型模式', doc: prototypeDoc },
            { name: '继承', doc: extendDoc },
            { name: '类', doc: classDoc },
        ]
    },
    {
        type: 'note', name: '踩坑记录', docTab: [
            { name: 'js 笔记', doc: noteDoc },
            { name: 'AMD', doc: amdDoc },
            { name: 'promise', doc: promiseDoc },
            { name: 'chrome', doc: chromeDoc },
            { name: 'h5', doc: h5Doc },
        ]
    },
]

export const JS_ROUTER = JS_DOC.map((item) => ({
    name: item.name,
    path: `doc/js/${item.type}`,
}))