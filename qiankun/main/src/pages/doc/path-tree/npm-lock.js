import npmLockDoc from '@/doc/npm-lock/readme.md?raw'

export const NPM_LOCK_DOC = [
    { name: 'npm-lock', type: 'npm-lock', doc: npmLockDoc, }
]

export const NPM_LOCK_ROUTER = NPM_LOCK_DOC.map(item => ({
    name: item.name,
    path: `doc/npm-lock/${item.type}`,
}))