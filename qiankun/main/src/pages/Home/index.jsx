import MarkdownContainer from '@/components/markdownContainer'
import planDoc from '@/doc/dev-plan/progress.md?raw'
const homePage = () => {
    return <MarkdownContainer>
        {planDoc}
    </MarkdownContainer>
}

export default homePage