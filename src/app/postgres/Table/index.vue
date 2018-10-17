<template>
  <div class="full-container is-flex is-flex-column">
    <TableView
      :table="table"
      :schema="schema"
      :database="database"
      :connectionId="connectionId"
    />
  </div>
</template>

<script>
import TableView from './TableView'

export default {
  name: 'PostgresTable',

  components: {
    TableView,
  },

  computed: {
    table () {
      return this.$route.query.table
    },

    schema () {
      return this.$route.query.schema
    },

    database () {
      return this.$route.query.database
    },

    connectionId () {
      return this.$route.params.connectionId
    }
  }
}
</script>
