<template>
    <el-card shadow="always">
      <fast-table 
      v-model="tableData" 
      :columnList="columnList" 
      :editable="true"
      :tableConfig="tableConfig"
      @edit="edit"
      ></fast-table>
      <el-button @click="save()">保存</el-button>
    </el-card>
    <el-drawer
    v-model="drawer"
    title="I am the title"
    direction="rtl">
    </el-drawer>
</template>
<script setup lang="ts">
import { DropDownConfig, InputConfig } from '@/components/custom/custom-input/models';
import { BaseColumn, OperateTypeEnum, TableConfig } from '@/components/custom/fast-table/models';
import { ContextTemplate } from '@/models';
import { ContextTemplateContent } from '@/models/codeGenerator/contextTemplateContent';
import { InputTypeEnum } from '@/models/enums/InputTypeEnum';
import { assert } from '@vueuse/core';
import { ElMessageBox } from 'element-plus';
import { ref } from 'vue';

const dataList = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
]

const drawer = ref(false)

// const tableData = ref<ContextTemplateContent[]>([
//   {
//   Id: "1",
//   key: "template1",
//   type: InputTypeEnum.text,
//   description: "This is template 1",
//   children: [
//     {
//       Id: "2",
//       key: "template2",
//       type: InputTypeEnum.text,
//       description: "This is template 2",
//       children: []
//     },
//   ]
//   }
// ])


const tableConfig = {
  editable: true,
  opType: OperateTypeEnum.Edit
} as TableConfig;

// const columnList: BaseColumn[] = [
//   {
//     label: 'Id',
//     prop: 'Id',
//     options: {
//       inputConfig: new InputConfig()
//     }
//   },
//   {
//     label: '数据类型',
//     prop: 'type',
//     options: {
//       inputConfig: new DropDownConfig(dataList)
//     }
//   },
//   {
//     label: '说明',
//     prop: 'description',
//     options: {
//       inputConfig: new InputConfig()
//     }
//   },
// ]

const tableData = ref<ContextTemplate[]>([{
  id: 1,
  name: "Mysql",
  content: 
`{
  "tableName": "string",
  "tableComment": "string",
  "columns": [
    {
      "columnName": "string",
      "dataType": "string",
      "columnComment": "string"
    }
  ]
}`,
  opType: OperateTypeEnum.None,
}
])

const columnList: BaseColumn[] = [
  {
    label: 'id',
    prop: 'id',
  },
  {
    label: '模板名字',
    prop: 'name',
    options: {
      inputConfig: new InputConfig(InputTypeEnum.text),
      editable: true,
    }
  },
  {
    label: '模板内容(json)',
    prop: 'content',
    options: {
      inputConfig: new InputConfig(InputTypeEnum.json),
      editable: true,
    },
  },
]

const save = () => {
  const data = JSON.parse(tableData.value[0].content);
  const props = Object.getOwnPropertyNames(data)
  props.forEach(prop => {
    console.log("props: ", prop, ", type: ", typeof(data[prop]), ", is arr: ", data[prop] instanceof Array)
  })
}

const edit = (data: ContextTemplateContent) => {
  drawer.value = true;
}
 

</script>