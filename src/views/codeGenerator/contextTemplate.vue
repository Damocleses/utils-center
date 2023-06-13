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
  </template>
<script setup lang="ts">
import { DropDownConfig, InputConfig } from '@/components/custom/custom-input/models';
import { BaseColumn, OperateTypeEnum, TableConfig } from '@/components/custom/fast-table/models';
import { ContextTemplateModel } from '@/models/codeGenerator/contextTemplateModel';
import { InputTypeEnum } from '@/models/enums/InputTypeEnum';
import { ElMessageBox } from 'element-plus';
import { ref } from 'vue';

const dataList = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
]

const tableData = ref<ContextTemplateModel[]>([{
  Id: "1",
  key: "template1",
  type: InputTypeEnum.text,
  description: "This is template 1",
  children: [
    {
      Id: "2",
      key: "template2",
      type: InputTypeEnum.text,
      description: "This is template 2",
      children: []
    },
  ]
}
])

const tableConfig = {
  editable: false,
  opType: OperateTypeEnum.Edit
} as TableConfig;

const columnList: BaseColumn[] = [
  {
    label: 'Id',
    prop: 'Id',
    options: {
      inputConfig: new InputConfig()
    }
  },
  {
    label: '数据类型',
    prop: 'type',
    options: {
      inputConfig: new DropDownConfig(dataList)
    }
  },
  {
    label: '说明',
    prop: 'description',
    options: {
      inputConfig: new InputConfig()
    }
  },
]

const save = () => {
  console.log(tableData);
}

const edit = (data: ContextTemplateModel) => {
  ElMessageBox.alert(data.description);
}
 

</script>