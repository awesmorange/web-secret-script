import { useParams } from 'react-router-dom'

import MarkdownContainer from '@/components/markdownContainer'

import babelDoc from '@/doc/babel/babel.md?raw'
import buildToolsDoc from '@/doc/babel/build-tools.md?raw'
import conceptsDoc from '@/doc/babel/concepts.md?raw'
import configurationDoc from '@/doc/babel/configuration.md?raw'
import coreComponentsDoc from '@/doc/babel/core-components.md?raw'
import polyfillDoc from '@/doc/babel/polyfill.md?raw'
import practiceDoc from '@/doc/babel/practice.md?raw'
import presetsAndPlugindDoc from '@/doc/babel/presets-and-plugins.md?raw'

const DOC_LIST = [
    {
        key: 'babel',
        doc: babelDoc
    },
    {
        key: 'build-tools',
        doc: buildToolsDoc
    },
    {
        key: 'concepts',
        doc: conceptsDoc
    },
    {
        key: 'configuration',
        doc: configurationDoc
    },
    {
        key: 'core-components',
        doc: coreComponentsDoc
    },
    {
        key: 'polyfill',
        doc: polyfillDoc
    },
    {
        key: 'practice',
        doc: practiceDoc
    },
    {
        key: 'presets-and-plugins',
        doc: presetsAndPlugindDoc
    }
]
const babelPage = () => {
    const { type } = useParams()
    return <MarkdownContainer>
        {DOC_LIST.find(item => item.key === type)?.doc}
    </MarkdownContainer>
}

export default babelPage