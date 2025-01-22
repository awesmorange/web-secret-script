import aboutDoc from '@/doc/ci/write-github-workflows/about-workflows.md?raw'
import useTemplateDoc from '@/doc/ci/write-github-workflows/use-workflow-templates.md?raw'
import triggerWorkflowsDoc from '@/doc/ci/write-github-workflows/when-workflows-run/trigger-a-workflow.md?raw'
import triggerEventDoc from '@/doc/ci/write-github-workflows/when-workflows-run/trigger-event.md?raw'
import conditionDoc from '@/doc/ci/write-github-workflows/when-workflows-run/using-conditions.md?raw'

export const CI_DOC = [
    { name: '关于 Workflows', type: 'about-workflows', doc: aboutDoc, },
    { name: '使用 Workflows 模板', type: 'use-workflows-templates', doc: useTemplateDoc, },
    {
        name: '触发 Workflows', type: 'trigger-a-workflow', docTab: [
            { name: '触发 Workflows', doc: triggerWorkflowsDoc, },
            { name: '触发事件', doc: triggerEventDoc, },
            { name: '使用条件', doc: conditionDoc, },
        ]
    },
]

export const CI_ROUTER = CI_DOC.map((item) => ({
    name: item.name,
    path: `doc/ci/${item.type}`,
}))