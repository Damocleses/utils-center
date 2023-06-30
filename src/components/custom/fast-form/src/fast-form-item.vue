<template>
    <el-row>
        <el-col style="padding: 0 48px;">
            <template v-if="checkType('array')">
                <label>{{ label }}</label>
                <br />
                <fast-form-item v-for="(item, index) in (value as any[])" :value="item" v-model="form[index]"></fast-form-item>
                <el-button @click="">添加</el-button>
                <br />
            </template>
            <template v-else-if="checkType('object')">
                <label>{{ label }}</label>
                <br />
                <fast-form-item v-for="pro in (getObjectProps())" :value="value[pro]" :label="pro" v-model="form[pro]"></fast-form-item>
                <br />
            </template>
            <el-form-item v-else :label="label">
            <template v-if="checkType('input')">
                <el-input :type="type == 'string' ? 'text' : 'number'" v-model="form[label]"/>
                </template>
                <template v-if="checkType('boolean')">
                    <el-switch v-model="form[label]"/>
                </template>
            </el-form-item>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { FastFormItemTypeEnum } from '../models/FastFormItemTypeEnum'

const props = defineProps(["label", "value", "modelValue"])
const singleTypes = ["string"]
const numberTypes = ["number"]
const inputTypes = [
    FastFormItemTypeEnum.string,
    FastFormItemTypeEnum.number,
]

const emit = defineEmits(["update:modelValue"])

const type = computed({
    get: () => {
        return getType(props.value) as FastFormItemTypeEnum
    },
    set: (value) => {

    }
})

const form = computed({
    get: () => {
        return props.modelValue;
    },
    set: (value) => {
        emit('update:modelValue', value)
    }
})

const getType = (value: any): string => {
    const type = typeof(value);
    console.log(value)
    console.log(type);
    if (numberTypes.includes(type)) {
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
            return inputTypes.includes(type.value);
        case 'array':
        case 'object':
            return type.value == typeStr;
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

const getObjectProps = () => {
    return Object.getOwnPropertyNames(props.value);
}

</script>