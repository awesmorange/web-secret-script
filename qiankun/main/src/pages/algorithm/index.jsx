import { useParams } from 'react-router-dom'
import MarkdownContainer from '@/components/markdownContainer'
import breadthFirstDoc from '@/doc/algorithm/breadth-first.md?raw'
import depthFirstDoc from '@/doc/algorithm/depth-first.md?raw'
import flat2TreeDoc from '@/doc/algorithm/flat2Tree.md?raw'
import tree2FlatDoc from '@/doc/algorithm/tree2Flat.md?raw'

const DOC_LIST = [
    { key: 'breadth-first', doc: breadthFirstDoc },
    { key: 'depth-first', doc: depthFirstDoc },
    { key: 'flat2Tree', doc: flat2TreeDoc },
    { key: 'tree2Flat', doc: tree2FlatDoc },
]

const algorithmPage = () => {
    const { type } = useParams()
    return <MarkdownContainer>
        {DOC_LIST.find(item => item.key === type)?.doc}
    </MarkdownContainer>
}

export default algorithmPage
