import { getShareMainComponent, getMarkdownDoc } from '@/utils/share-main.js';

const routerPage = () => {
    const {
        MarkdownContainer
    } = getShareMainComponent();

    const { reactRouterDoc } = getMarkdownDoc();

    return <MarkdownContainer>
        {reactRouterDoc}
    </MarkdownContainer>
}

export default routerPage