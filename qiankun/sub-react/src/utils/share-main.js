let shareMainComponent = {}

// 获取共享的组件
export const getShareMainComponent = () => {
    return shareMainComponent;
}

// 设置共享的组件
export const setShareMainComponent = (currShareMainComponent) => {
    for (const key in currShareMainApp) {
        if (Object.prototype.hasOwnProperty.call(currShareMainComponent, key)) {
            shareMainComponent[key] = currShareMainComponent[key];
        }
    }
}
