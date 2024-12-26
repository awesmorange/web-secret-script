import MarkdownContainer from '@/components/markdownContainer'
import h5Doc from '@/doc/h5/diary.md?raw'
const h5Page = () => {
    return <MarkdownContainer>
        {h5Doc}
    </MarkdownContainer>
}

export default h5Page