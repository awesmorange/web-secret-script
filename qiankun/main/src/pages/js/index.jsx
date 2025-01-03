import { useParams } from 'react-router-dom'
import MarkdownContainer from '@/components/markdownContainer'
import amdDoc from '@/doc/js/AMD.md?raw'
import interviewDoc from '@/doc/js/interview.md?raw'
import promiseDoc from '@/doc/js/promise.md?raw'

const DOC_LIST = [
    { key: 'amd', doc: amdDoc },
    { key: 'interview', doc: interviewDoc },
    { key: 'promise', doc: promiseDoc }
]

const jsPage = () => {
    const { type } = useParams()
    return <MarkdownContainer>
        {DOC_LIST.find(item => item.key === type)?.doc}
    </MarkdownContainer>
}

export default jsPage