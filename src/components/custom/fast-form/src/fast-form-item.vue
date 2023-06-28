<template>
    <template v-if="checkType('array')">
        1 <br />
        <fast-form-item v-for="(item, index) in (value as any[])" :value="item" :label="index" :form="value"></fast-form-item>
        <el-button @click="">添加</el-button>
        1<br />
    </template>
    <el-form-item v-else :label="label">
        <template v-if="checkType('input')">
            <el-input :type="type == 'string' ? 'text' : 'number'" :value="form[label]"/>
        </template>
        <template v-if="checkType('boolean')">
            <el-switch :value="form[label]"/>
        </template>
    </el-form-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { FastFormItemTypeEnum } from '../models/FastFormItemTypeEnum'

const props = defineProps(["label", "value", "form"])
const singleTypes = ["string"]
const numberTypes = ["string"]
const inputTypes = [
    FastFormItemTypeEnum.string,
    FastFormItemTypeEnum.number,
]

const type = computed({
    get: () => {
        return getType(props.value)
    },
    set: (value) => {

    }
})

const getType = (value: any): string => {
    const type = typeof(value);
    if (numberTypes.includes(value)) {
        return FastFormItemTypeEnum.number;
    }

    if (singleTypes.includes(type)) {
        return type;
    }

    if (value instanceof Array) {
        return FastFormItemTypeEnum.array
    }

    return FastFormItemTypeEnum.object;
}

const checkType = (typeStr: string) => {
    switch (typeStr) {
        case 'input':
            return inputTypes.includes(type.value as FastFormItemTypeEnum);
        default:
            return false;
    }
}

const addArrayData = () => {
    const value = (props.value as any[])
    switch(type.value) {
        case FastFormItemTypeEnum.string:
        value.push("");
        break;
        case FastFormItemTypeEnum.number:
            value.push(0);
        case FastFormItemTypeEnum.object:

    }
}

</script>