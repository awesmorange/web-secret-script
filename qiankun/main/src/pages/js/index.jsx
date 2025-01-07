import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import MarkdownContainer from '@/components/markdownContainer'

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
// note
import amdDoc from '@/doc/js/note/AMD.md?raw'
import noteDoc from '@/doc/js/note/note.md?raw'
import promiseDoc from '@/doc/js/note/promise.md?raw'

const DOC_LIST = [
    { key: 'index', doc: jsDoc },
    {
        key: 'function', docTab: [
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
    { key: 'amd', doc: amdDoc },
    { key: 'note', doc: noteDoc },
    { key: 'promise', doc: promiseDoc },
]

const jsPage = () => {
    const { type } = useParams()
    const docTab = useMemo(() => {
        const item = DOC_LIST.find(item => item.key === type)
        return item?.docTab || [item]
    }, [type])

    const [active, setActive] = useState(0)
    const handleClick = (index) => {
        setActive(index)
    }

    return (<>
        {
            docTab?.length > 1 && (<div className='inline-box'>
                {
                    docTab?.map((item, index) => (<div key={index} className={['inline-item', active === index ? 'active' : ''].join(' ')} onClick={() => handleClick(index)}>{item.name}</div>))
                }
            </div>)
        }
        <MarkdownContainer>
            {docTab[active].doc}
        </MarkdownContainer>
    </>
    )
}

export default jsPage