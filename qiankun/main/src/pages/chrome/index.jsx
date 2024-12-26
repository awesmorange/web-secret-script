import MarkdownContainer from '@/components/markdownContainer'
import chromeDoc from '@/doc/chrome/readme.md?raw'
const chromePage = () => {
    return <MarkdownContainer>
        {chromeDoc}
    </MarkdownContainer>
}

export default chromePage