<template>
  <button @click="exportExcel">
    <slot>
      Download as Excel
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
      let xlsHeader = []
      let xlsRows = []
      if (!this.columns.length) {
        this.$emit('error', 'Add Columns!')
        return
      }

      if (!this.rows.length) {
        this.$emit('error', 'Data is empty!')
        return
      }

      xlsHeader = this.columns.map((c) => {
        return c.label || ''
      })

      xlsRows.push(xlsHeader)

      this.rows.forEach((row, rowIndex) => {
        let rowData = []
        this.columns.forEach((column, colIndex) => {
          if (column.formatter && typeof column.formatter === 'function') {
            rowData.push(column.formatter(row[column.key], row))
          } else {
            rowData.push(row[column.key])
          }
        })
        xlsRows.push(rowData)
      })

      const exportFilename = this.filename + '.xlsx'
      const book = XLSX.utils.book_new()
      const sheet = XLSX.utils.aoa_to_sheet(xlsRows)
      XLSX.utils.book_append_sheet(book, sheet, this.filename)
      XLSX.writeFile(book, exportFilename)
    }
  }
}
</script>
