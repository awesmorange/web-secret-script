import { getShareMainComponent } from '@/utils/share-main.js';
import reactRouterDoc from '@/doc/router/react-router.md?raw'
const routerPage = () => {
    const {
        MarkdownContainer
      } = getShareMainComponent();
    return <MarkdownContainer>
        {reactRouterDoc}
    </MarkdownContainer>
}

export default routerPage