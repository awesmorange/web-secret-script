let shareMainComponent = {}

// 获取共享的组件
export const getShareMainComponent = () => {
    return shareMainComponent;
}

// 设置共享的组件
export const setShareMainComponent = (currShareMainApp) => {
    for (const key in currShareMainApp) {
        if (Object.prototype.hasOwnProperty.call(currShareMainApp, key)) {
            shareMainComponent[key] = currShareMainApp[key];
        }
    }
}

// markdown 文档
let markdownDoc = {}

export const getMarkdownDoc = () => {
    return markdownDoc;
}

export const setMarkdownDoc = (currMarkdownDoc) => {
    for (const key in currMarkdownDoc) {
        if (Object.prototype.hasOwnProperty.call(currMarkdownDoc, key)) {
            markdownDoc[key] = currMarkdownDoc[key];
        }
    }
}
