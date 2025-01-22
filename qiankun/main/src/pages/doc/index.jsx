import { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import MarkdownContainer from '@/components/markdownContainer'

import { DOC_TREE } from './path-tree'

const docPage = () => {
    const { subject, type } = useParams()
    const docTab = useMemo(() => {
        const tree = DOC_TREE.find(item => item.subject === subject)
        const tab = tree?.children?.find(item => item.type === type)
        return tab?.docTab || (tab?.doc ? [{ doc: tab.doc }] : [])
    }, [subject, type])

    const [active, setActive] = useState(0)
    const handleClick = (index) => {
        setActive(index)
    }

    const mdContent = useMemo(() => {
        const errMd = `
                # 404
                **抱歉，您访问的页面不存在。**
            `
        if (!docTab || !docTab.length) {
            return errMd
        }
        return docTab?.[active]?.doc || errMd
    }, [docTab, active])

    return (<>
        <MarkdownContainer>
            {mdContent}
        </MarkdownContainer>
        {
            docTab?.length > 1 && (<div className='tab-box'>
                {
                    docTab?.map((item, index) => (<div key={index} className={['tab-item', active === index ? 'active' : ''].join(' ')} onClick={() => handleClick(index)}>{item.name}</div>))
                }
            </div>)
        }
    </>
    )
}

export default docPage