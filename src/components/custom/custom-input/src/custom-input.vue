<template>
    <el-input v-if="checkType('input')" :type="inputConfig.type" v-model="value"></el-input>
    <el-select v-else-if="checkType('dropdown')" v-model="value" placeholder="Select" >
    <el-option
      v-for="item in inputConfig.dataList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
<script setup lang="ts">
import { InputTypeEnum } from '@/models';
import { computed } from '@vue/reactivity';

const inputTypes = [
    InputTypeEnum.text,
    InputTypeEnum.number
]

// const props = defineProps({
//     type: {
//         type: String,
//         required: true,
//     },
//     modelValue: {
//         required: true
//     }
// })

const props = defineProps(['modelValue', 'inputConfig'])

const emit = defineEmits(['update:modelValue'])

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        console.log('emit event')
        emit('update:modelValue', value)
    }
})

const checkType = (type: string): boolean => {
    const checkTypes = getCheckTypes(type);
    return checkTypes.includes(props.inputConfig.type as InputTypeEnum);
}

const getCheckTypes = (type: string): InputTypeEnum[] => {
    let checkTypes: InputTypeEnum[] = [];
    switch (type) {
        case "input":
            checkTypes = inputTypes;
            break;
        case "dropdown":
            checkTypes = [InputTypeEnum.dropdown];
            break;
    }

    return checkTypes;
}

</script>