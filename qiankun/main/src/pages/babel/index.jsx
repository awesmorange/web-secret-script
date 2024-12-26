import MarkdownContainer from '@/components/markdownContainer'
import babelDoc from '@/doc/babel/babel.md?raw'
const babelPage = () => {
    return <MarkdownContainer>
        {babelDoc}
    </MarkdownContainer>
}

export default babelPage