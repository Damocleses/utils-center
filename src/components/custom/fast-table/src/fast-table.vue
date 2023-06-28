<template>
        <el-form :model="form">
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
              <div v-if="!!column.options && !!column.options.inputConfig && column.options.inputConfig.type == InputTypeEnum.json" v-html="scope.row[column.prop]" style="white-space: pre-wrap;"></div>
              <div v-else>{{ scope.row[column.prop]  }}</div>
            </template>
            <template v-else>
              <el-form-item>
                <custom-input v-model="form[column.prop]" :inputConfig="column.options.inputConfig"></custom-input>
              </el-form-item>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作" v-if="!!tableConfig && !!tableConfig.opType && tableConfig.opType != OperateTypeEnum.None">
          <template #default="scope">
            <div class="buttonGroup">
                <a href="javascript:void(0);"  @click.stop="handleEvent('addChildren', scope.row, addChildren(scope.row))"  v-if="isShowButton(scope.row, 'addChildren')">添加下级</a>
                <a href="javascript:void(0);"  @click.stop="handleEvent('edit', scope.row)"  v-if="isShowButton(scope.row, 'edit')">编辑</a>
                <a href="javascript:void(0);"  class="red" @click="handleEvent('delete', scope.row, removeRow(scope.row.Id))" v-if="isShowButton(scope.row, 'delete')">删除</a>
                <a href="javascript:void(0);"  @click.stop="handleEvent('save', scope.row, saveRow(scope.row))" v-if="isShowButton(scope.row, 'save')">保存</a>
                <a href="javascript:void(0);"  @click.stop="handleEvent('cancel', scope.row, cancel());"  v-if="isShowButton(scope.row, 'cancel')">取消</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
</template>
<script setup lang="ts">
import { InputTypeEnum } from '@/models';
import { computed, ref, reactive } from '@vue/reactivity';
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

const form = reactive({} as any)

let currentKey = ref<number>(-1)
const table = ref<TableInstance>();

const isShowButton = (data: any, type: string) => {
  switch(type) {
    case 'addChildren':
      return props.tableConfig?.opType == OperateTypeEnum.AddChildren;
    case 'edit':
    case 'delete':
      return props.tableConfig?.opType == OperateTypeEnum.Edit && data.rowIndex != currentKey.value;
    case 'save':
    case 'cancel':
      return props.tableConfig?.opType == OperateTypeEnum.Edit && data.rowIndex == currentKey.value;
    default:
      return false;
  }
}

const handleEvent = (event: any, data: any, action?: any) => {
  if (props.tableConfig?.emitEvent?.includes(event)) {
    emit(event, data)
    return
  }

  if (!!action) {
    action()
  }
}

const cancel = () => {
  console.log('cancel')
  currentKey.value = -1;
}

const rowClick = (r: any, c: any, e: any) => {
  if (!props.tableConfig?.editable) {
    return;
  }
  console.log('rowclick:', r.rowIndex);
  currentKey.value = r.rowIndex;
  Object.assign(form, r);
  console.log('form:', form);
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

const saveRow = (data: any) => {
  Object.assign(data, form);
  cancel();
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

<style lang="scss">
.buttonGroup > *{
  &:not(:first-child) {
    margin-left: 8px;
  }

  color: green;
  &.red {
    color: red;
  }
}

</style>