import {
    contentIcon,
    contentTitle,
    contentSbTitle,
    dialogFooter
} from './style.module.scss';
import warningIcon from '@/assets/images/warning.png';
export default {
    props: {
        // 弹窗标题
        title: {
            type: String,
            default: ""
        },
        // 弹窗提示内容
        text: String,
        // 二级提示内容
        sbText: String,
        // 是否展示确定按钮
        isEnter: {
            type: Boolean,
            default: true
        },
        // 确定按钮文字
        enterText: {
            type: String,
            default: "确定"
        },
        // 是否展示取消按钮
        isCancel: {
            type: Boolean,
            default: true
        },
        // 取消按钮提示
        cancelText: {
            type: String,
            default: "取消"
        },
        // 倒计时功能
        countDown: {
            type: Number,
            default: 0
        },
        stamp: Number
    },
    data() {
        return {
            // 显示与否
            visible: false
        }
    },
    watch: {
        stamp() {
            if (!this.countDown) {
                return;
            };

            const timer = setInterval(() => {
                if (--this.countDown < 1) {
                    clearInterval(timer)
                    this.countDown = 0
                }
            }, 1000);
        }
    },
    render() {
        const { title, text, sbText, isEnter, enterText, isCancel, cancelText, countDown } = this.$props;
        const { visible } = this.$data;
        return (
            <el-dialog
                title={title}
                visible={visible}
                width="fit-content"
                top="calc(50vh - 120px) !important"
                closeOnClickModal={false}
                beforeClose={() => this.$emit('cancel')}
            >
                <div class={contentIcon}>
                    <img src={warningIcon} alt="" />
                </div>
                <div class={contentTitle}>
                    {text}
                </div>
                {sbText && (<div class={contentSbTitle}>{sbText}</div>)}
                <span slot="footer" class={dialogFooter}>
                    {/* 确认按钮 */}
                    {isEnter && (<el-button type="primary" disabled={!!countDown} onClick={() => this.$emit('enter')}>{enterText}{countDown ? countDown + 's' : ''}</el-button>)}
                    {/* 取消按钮 */}
                    {isCancel && (<el-button plain onClick={() => this.$emit('cancel')}>{cancelText}</el-button>)}
                </span>
            </el-dialog>
        )
    }

}
