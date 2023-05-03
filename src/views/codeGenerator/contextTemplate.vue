<template>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        :current-row-key="currentKey"
        :row-style="rowStyle"
        row-key="key"
        :ref="table"
        border
        default-expand-all
        stripe
        highlight-current-row
        @row-click="rowClick"
      >
      <el-table-column type="index"></el-table-column>
        <el-table-column prop="key" label="key" sortable  >
          <template #default="scope">
              <span v-if="currentKey !=scope.row.key">
                {{ scope.row.key }}
              </span>
              <template v-else>
                <el-input v-model="scope.row.key"/>
              </template>
                
            </template>
        </el-table-column>
        <el-table-column prop="type" label="数据类型" sortable >
            <template #default="scope">
              <span v-if="currentKey !=scope.row.key">
                {{ scope.row.type }}
              </span>
              <template v-else>
                <el-input v-model="scope.row.type"/>
              </template>
                
            </template>
        </el-table-column>
        <el-table-column prop="description" label="说明" sortable>
          <template #default="scope">
              <span v-if="currentKey !=scope.row.key">
                {{ scope.row.description }}
              </span>
              <template v-else>
                <el-input v-model="scope.row.description"/>
              </template>
            </template>
        </el-table-column>
        <el-table-column label="操作" sortable>
          <template #default="scope">
              <template v-if="currentKey ==scope.row.key">
                <a href="javascript:void(0);" style="color:green" @click="addChildren(scope.row)">添加下级</a>
                <a href="javascript:void(0);" style="color:red; margin-left: 8px;">删除</a>
              </template>
            </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
<script setup lang="ts">
import { ContextTemplateModel } from '@/models/codeGenerator/contextTemplateModel'
import { TypeEnum } from '@/models/common';
import { TableInstance } from 'element-plus';
import { VNode, VNodeProps, computed, ref } from 'vue'

let currentKey = ref<string>('')
const table = ref<TableInstance>();

const tableData: ContextTemplateModel[] = [
    {
        key: 'test',
        type: TypeEnum.string,
        description: '一个测试字段',
        children:[
          {
              key: 'test2',
              type: TypeEnum.string,
              description: '一个测试字段3',
          }
        ]
    },
    {
        key: 'test1',
        type: TypeEnum.string,
        description: '一个测试字段2'
    }
]

const rowClick = (r: any, c: any, e: any) => {
  currentKey.value = r.key
  console.log(r)
}

const addChildren = (row: ContextTemplateModel) => {
  if (!row.children) {
    row.children = [];
  }

  const empty = {
        key: '1',
        type: TypeEnum.string,
        description: ''
  }
  row.children.push(empty)
  currentKey.value = '1'
  console.log(currentKey.value)
  table.value?.setCurrentRow(empty)
}

const rowStyle = (e: any) => {
         Object.defineProperty(e.row, 'rowIndex', { //给每一行添加不可枚举属性rowIndex来标识当前行
         value: e.rowIndex, 
         writable: true,
         enumerable: false
       })
      }
 

</script>