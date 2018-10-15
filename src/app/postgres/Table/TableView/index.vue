<template>
  <div class="table-container">
    <table class="table is-fullwidth is-bordered">
      <thead>
        <tr>
          <th v-for="column in dataSource.columns" :key="column.name">
            <span>{{column.name}}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(datum, key) in dataSource.data" :key="key">
          <td v-for="(value, key) in datum" :key="key">
            {{value}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    dataSource: Object
  }
}
</script>
