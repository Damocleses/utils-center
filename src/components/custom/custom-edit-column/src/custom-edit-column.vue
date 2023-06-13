<template>
    	<el-table-column
		:prop="prop"
		:label="label"
		:header-align="headerAlign"
		:align="align"
		:width="width"
		:min-width="minWidth"
		:class-name="className"
	>
	<template #default="scope">
              <span v-if="tableConfig.currentKey !=scope.row[tableConfig.keyName]">
                {{ scope.row[prop] }}
              </span>
              <template v-else>
					<custom-input v-model="scope.row[prop]" :type="type" :dataList="dataList"></custom-input>
              </template>
                
    </template>
	</el-table-column>
</template>
<script setup lang="ts"  name="EditTableColumn">
import { InputTypeEnum } from '@/models';
import { DropDownSource, TableConfig } from '@/models/common';
import { PropType } from 'vue';


const props = defineProps({
	prop: {
		type: String,
		required: true
	},
	label: {
		type: String,
		required: true
	},
	headerAlign: {
		type: String,
		required: false,
		default: () => 'center'
	},
	align: {
		type: String,
		required: false,
		default: () => 'center'
	},
	width: {
		type: String,
		required: false,
		default: () => ''
	},
	minWidth: {
		type: String,
		required: false,
		default: () => ''
	},
	className: {
		type: String,
		required: false,
		default: () => ''
	},
	type: {
		type: String,
		required: false,
		default: () => InputTypeEnum.text
	},
	tableConfig: {
		type: Object as PropType<TableConfig>,
		required: false,
		default: () => ''
	},
	dataList: {
		type: Array as PropType<DropDownSource[]>,
		required: false,
		default: () => []
	}
})

</script>