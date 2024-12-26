import MarkdownContainer from '@/components/markdownContainer'
import amdDoc from '@/doc/js/AMD.md?raw'
import interviewDoc from '@/doc/js/interview.md?raw'
import promiseDoc from '@/doc/js/promise.md?raw'

const jsPage = () => {
    return <>
    <MarkdownContainer>
        {amdDoc}
    </MarkdownContainer>
    <MarkdownContainer>
        {interviewDoc}
    </MarkdownContainer>
    <MarkdownContainer>
        {promiseDoc}
    </MarkdownContainer>
    </>
}

export default jsPage