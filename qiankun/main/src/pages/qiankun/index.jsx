import MarkdownContainer from '@/components/markdownContainer'
import qiankunDoc from '@/doc/qiankun/qiankun.md?raw'
const qiankunPage = () => {
    return <MarkdownContainer>
        {qiankunDoc}
    </MarkdownContainer>
}

export default qiankunPage