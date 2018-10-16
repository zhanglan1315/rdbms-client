<template>
  <table class="table is-fullwidth is-bordered">
    <thead>
      <tr>
        <th v-for="column in displayColumns" :key="column.name">
          <span>{{column.name}}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(datum, key) in data" :key="key">
        <td v-for="column in displayColumns" :key="column.name">
          {{datum[column.key]}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    dataSource: Object,
    data: Array,
    columns: Array,
  },

  computed: {
    displayColumns () {
      const columns = []
      this.columns.forEach((column, key) => {
        if (column.name !== 'ctid') {
          columns.push({
            key, ...column
          })
        }
      })

      return columns
    }
  }
}
</script>
