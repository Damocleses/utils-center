<template>
    <el-card shadow="always">
        <fast-form :jsonValue="jsonValue"></fast-form>
    </el-card>
</template>
<script setup lang="ts">
    const jsonValue = JSON.parse(`{
  "tableName": "string",
  "tableComment": "string",
  "columns": [
    {
      "columnName": "string",
      "dataType": "string",
      "columnComment": "string"
    }
  ]
}`)
</script>