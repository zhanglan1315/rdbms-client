<template>
  <div
    v-if="!isDestroyed"
    class="is-flex-auto is-flex is-flex-column"
  >
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

  props: {
    tabs: Array
  },

  components: {
    TableView
  },

  data () {
    return {
      isDestroyed: false
    }
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
      name: this.table,
      fullPath: this.$route.fullPath
    })
  }
}
</script>
