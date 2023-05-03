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
			<el-tag
				v-if="getDictLabelClass(store.appStore.dictList, props.dictType, scope.row[props.prop])"
				:type="
					getDictLabelClass(store.appStore.dictList, props.dictType, scope.row[props.prop]) === 'primary'
						? ''
						: getDictLabelClass(store.appStore.dictList, props.dictType, scope.row[props.prop])
				"
			>
				{{ getDictLabel(store.appStore.dictList, props.dictType, scope.row[props.prop]) }}
			</el-tag>
			<span v-else>
				{{ getDictLabel(store.appStore.dictList, props.dictType, scope.row[props.prop]) }}
			</span>
		</template>
	</el-table-column>
</template>
<script setup lang="ts">

</script>