<template>
    <el-form :model="form" label-position="left">
        <fast-form-item v-model="form" :value="jsonValue"></fast-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, onUpdated, reactive } from 'vue';
import fastFormItem from './fast-form-item.vue'
    const form = reactive({} as any)
    const props = defineProps(["jsonValue"])

    onBeforeMount(() => {
        Object.assign(form, props.jsonValue)
        console.log(form)
    })
</script>