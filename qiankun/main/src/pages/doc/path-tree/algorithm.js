import breadthFirstDoc from '@/doc/algorithm/breadth-first.md?raw'
import depthFirstDoc from '@/doc/algorithm/depth-first.md?raw'
import flat2TreeDoc from '@/doc/algorithm/flat2Tree.md?raw'
import tree2FlatDoc from '@/doc/algorithm/tree2Flat.md?raw'

export const ALGORITHM_DOC = [
    { type: 'breadth-first', name: '广度优先', doc: breadthFirstDoc },
    { type: 'depth-first', name: '深度优先', doc: depthFirstDoc },
    { type: 'flat2Tree', name: '平面转树形', doc: flat2TreeDoc },
    { type: 'tree2Flat', name: '树形转平面', doc: tree2FlatDoc },
]

export const ALGORITHM_ROUTER = ALGORITHM_DOC.map(item => ({
    name: item.name,
    path: `doc/algorithm/${item.type}`,
}))