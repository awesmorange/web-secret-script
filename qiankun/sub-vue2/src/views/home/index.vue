<template>
    <div>
        动态表单
        动态表格表单
        消息栈
        大文件传输
        自定义指令
    </div>
</template>
<script setup>
import { onMounted } from "vue";
// 提示弹窗
import VEMessageBox from "@/components/MessageBox";

onMounted(async () => {

    await VEMessageBox({
        text: '请确认是否进行数据追加操作？',
        isCancel: false,
        countDown: 0,
        stamp: +new Date()
    })

    console.log('确定')
})
</script>

<style scoped></style>