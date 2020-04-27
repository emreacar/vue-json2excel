<template>
  <button @click="exportExcel">
    <slot>
      Export Excel
    </slot>
  </button>
</template>

<script>
import XLSX from 'xlsx/xlsx';

export default {
  name: 'VueJson2Excel',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Array,
      default: () => []
    },
    filename: {
      type: String,
      default: () => 'exported-data'
    }
  },
  methods: {
    exportExcel () {
      alert('OK')
    }
  }
}
</script>
