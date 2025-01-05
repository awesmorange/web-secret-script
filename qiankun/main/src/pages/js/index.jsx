import { useParams } from 'react-router-dom'
import MarkdownContainer from '@/components/markdownContainer'
import jsDoc from '@/doc/js/js.md?raw'
import amdDoc from '@/doc/js/AMD.md?raw'
import noteDoc from '@/doc/js/note.md?raw'
import promiseDoc from '@/doc/js/promise.md?raw'

const DOC_LIST = [
    { key: 'index', doc: jsDoc },
    { key: 'amd', doc: amdDoc },
    { key: 'note', doc: noteDoc },
    { key: 'promise', doc: promiseDoc },
]

const jsPage = () => {
    const { type } = useParams()
    return <MarkdownContainer>
        {DOC_LIST.find(item => item.key === type)?.doc}
    </MarkdownContainer>
}

export default jsPage