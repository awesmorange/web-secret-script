import MarkdownContainer from '@/components/markdownContainer'
import pluginDoc from '@/doc/plugin/readme.md?raw'
const pluginPage = () => {
    return <MarkdownContainer>
        {pluginDoc}
    </MarkdownContainer>
}

export default pluginPage