<template>
  <TableView
    :table="table"
    :schema="schema"
    :database="database"
    :connectionId="connectionId"
  />
</template>

<script>
import TableView from './TableView'

export default {
  name: 'PostgresTableWrapper',

  components: {
    TableView
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
  },

  created () {
    this.$emit('created', {
      vnode: this,
      icon: 'table',
      name: this.table
    })
  },

  activated () {
    this.$emit('activated')
  }
}
</script>
