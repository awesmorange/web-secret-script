// 栈类
class Stack {
    constructor() {
        this.items = [];
    }

    // 入栈
    push(element) {
        this.items.push(element);
    }

    // 出栈
    pop() {
        return this.items.pop();
    }

    // 获取栈顶元素
    peek() {
        return this.items[this.items.length - 1];
    }

    // 判断栈是否为空
    isEmpty() {
        return this.items.length === 0;
    }

    // 获取栈中元素个数
    size() {
        return this.items.length;
    }

    // 清空栈
    clear() {
        this.items = [];
    }
}

const defaults = {
    title: '',
    text: '',
    sbText: '',
    isEnter: true,
    enterText: '确定',
    isCancel: true,
    cancelText: '取消',
};

export { Stack, defaults }