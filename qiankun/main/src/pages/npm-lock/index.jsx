import MarkdownContainer from '@/components/markdownContainer'
import npmLockDoc from '@/doc/npm-lock/readme.md?raw'
const npmLockPage = () => {
    return <MarkdownContainer>
        {npmLockDoc}
    </MarkdownContainer>
}

export default npmLockPage