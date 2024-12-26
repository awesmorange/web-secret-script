import MarkdownContainer from '@/components/markdownContainer'
import reactRouterDoc from '@/doc/router/react-router.md?raw'
const routerPage = () => {
    return <MarkdownContainer>
        {reactRouterDoc}
    </MarkdownContainer>
}

export default routerPage