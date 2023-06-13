<template>
    <el-table
        :data="dataList"
        style="width: 100%; margin-bottom: 20px"
        :current-row-key="currentKey"
        :row-style="rowStyle"
        row-key="Id"
        :ref="table"
        border
        default-expand-all
        stripe
        highlight-current-row
        @row-click="rowClick"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column v-for="column in columnList" :label="column.label" :prop="column.prop" sortable>
          <template #default="scope">
            <template v-if="!editable || !column.options || column.options.editable == false || currentKey !=scope.row.rowIndex">
              {{ scope.row[column.prop] }}
            </template>
            <template v-else>
              <custom-input v-model="scope.row[column.prop]" :inputConfig="column.options.inputConfig"></custom-input>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作" v-if="!!tableConfig && !!tableConfig.opType && tableConfig.opType != OperateTypeEnum.None">
          <template #default="scope">
                <a href="javascript:void(0);" style="color:green" @click="addChildren(scope.row)"  v-if="tableConfig.opType == OperateTypeEnum.AddChildren">添加下级</a>
                <a href="javascript:void(0);" style="color:green" @click="$emit('edit',scope.row)"  v-if="tableConfig.opType == OperateTypeEnum.Edit">编辑</a>
                <a href="javascript:void(0);" style="color:red; margin-left: 8px;" @click="removeRow(scope.row.Id)">删除</a>
          </template>
        </el-table-column>
      </el-table>
</template>
<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';
import { TableInstance } from 'element-plus';
import { PropType } from 'vue';
import { OperateTypeEnum, TableConfig } from '../models/fast-table-config';
import { BaseColumn } from '../models/fast-table-config/fast-column-config';

const props = defineProps({
    modelValue: {
        type: Object as PropType<any>,
		    required: true
    },
    columnList: {
        type: Array as PropType<BaseColumn[]>,
		    required: true
    },
    tableConfig: {
        type: Object as PropType<TableConfig>,
		    required: false,
    }
})

const editable = computed({
  get() {
    return !!props.tableConfig && props.tableConfig.editable;
  },
  set(value) {

  }
})

const emit = defineEmits(['update:modelValue', 'edit'])

const dataList = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})


let currentKey = ref<number>(-1)
const table = ref<TableInstance>();

const rowClick = (r: any, c: any, e: any) => {
  console.log('rowclick:', r.rowIndex)
  currentKey.value = r.rowIndex
}

const addChildren = (row: any) => {
  if (!row.children) {
    row.children = [];
  }

  const empty = {} as any;
  const length = row.children.length
  const rowIndex = length == 1 ? row.rowIndex + 1 : row.children[length - 1].rowIndex + 1;
  empty.rowIndex = rowIndex;
  row.children.push(empty)
  table.value?.setCurrentRow(empty)
  console.log(rowIndex);
  currentKey.value = rowIndex;
}

const removeRow = (id: string) => {
  dataList.value = removeChild(dataList.value, id)
}

const removeChild = (dataArr: any[], id: string): any[] => {
  if (dataArr.some(d => d.Id == id)) {
    dataArr = dataArr.filter(d => d.Id != id);
    return dataArr;
  }

  dataArr.forEach(data => {
    const child = removeChild(data.children,id)
    if (child.length != data.children.length) {
      data.children = child
      return;
    }
  })

  return dataArr;
}

const rowStyle = (e: any) => {
         Object.defineProperty(e.row, 'rowIndex', { //给每一行添加不可枚举属性rowIndex来标识当前行
         value: e.rowIndex, 
         writable: true,
         enumerable: false
       })
}

</script>