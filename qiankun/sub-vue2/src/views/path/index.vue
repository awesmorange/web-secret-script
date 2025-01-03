<template>
    <VueMarkdown class="markdown-body">
        {{ vue2_7_path }}
    </VueMarkdown>
</template>
<script setup>
import { onMounted } from "vue";
import VueMarkdown from 'vue-markdown';

import { getMarkdownDoc } from "@/utils/share-main.js"

const { vue2_7_path } = getMarkdownDoc()

onMounted(() => {
})
</script>

<style scoped></style>