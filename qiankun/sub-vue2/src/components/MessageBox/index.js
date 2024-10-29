/*
 * @Author: wanglan wlan.orange@qq.com
 * @Date: 2023-09-05 10:42:35
 * @LastEditors: wanglan wlan.orange@qq.com
 * @LastEditTime: 2023-09-11 17:49:28
 * @FilePath: \src\components\MessageBox\index.js
 * @Description: 异步触发dialog，返回promise函数，点击确认，resolve，点击取消，reject
 */
import Vue from 'vue';
import Warning from './Warning';
import merge from 'element-ui/src/utils/merge';
import { Stack, defaults } from './util';

let currentMsg, instance;
let msgStack = new Stack();
let DialogConstructor = Vue.extend(Warning);

/**
 * @description: 初始化实例
 * @return {void}
 */
const initInstance = () => {
    instance = new DialogConstructor({
        el: document.createElement('div')
    })
};

/**
 * @description: 展示上一条信息
 * @return {void}
 */
const showNextMsg = () => {
    // 消息栈为空，返回
    if (msgStack.isEmpty()) return;
    // 没有实例，初始化一个实例
    if (!instance) {
        initInstance();
    }
    // 实例还没有展示
    if (!instance?.visible) {
        // 取出一个消息
        currentMsg = msgStack.pop();
        // 将消息配置，放到实例中
        let options = currentMsg.propsData;
        for (let prop in options) {
            if (options.hasOwnProperty(prop)) {
                instance[prop] = options[prop];
            }
        }
        // 将实例放到body标签中
        document.body.appendChild(instance.$el);

        instance.$nextTick(() => {
            instance.visible = true;
        });
    }
};

/**
 * @description: 关闭
 * @return {void}
 */
function close() {
    if (!instance?.visible) return showNextMsg();
    instance.$nextTick(() => {
        if (!instance?.visible) return showNextMsg();
        instance.$destroy(true);
        instance.$el.parentNode.removeChild(instance.$el);
        instance = null;
    })
}

/**
 * @description: 消息弹窗方法
 * @return {void}
 */
const VEMessageBox = function (propsData) {
    if (typeof Promise !== 'undefined') {
        msgStack.push({ propsData: merge({}, defaults, propsData) });
        // 如果当前没有实例或者实例已关闭，则展示下一条信息
        if (!instance?.visible) {
            showNextMsg();
        }
        return new Promise((resolve, reject) => {
            let onClose = () => {
                instance.visible = false;
                reject('cancel');
                close();
            }
            let onSuccess = (data) => {
                instance.visible = false;
                resolve(data);
                close();
            }
            instance.$on('cancel', onClose);
            instance.$on('enter', onSuccess);
        })
    }
}

export default VEMessageBox;
export { VEMessageBox };
