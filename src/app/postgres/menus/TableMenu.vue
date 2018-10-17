<template>
  <ul>
    <li>
      <a
        :class="{'is-active': isSelected}"
        @click="handleClick"
      >
        <div style="width: 1rem"></div>

        <span class="icon">
          <i class="iconfont icon-table"></i>
        </span>

        <div style="width: 0.25rem"></div>

        <span>{{table}}</span>

        <div style="flex: 2"></div>

        <a
          v-if="isLoading"
          class="button is-text is-loading"
        ></a>
      </a>
    </li>
  </ul>
</template>

<script>
// import pg from '@/api/postgres'
// import { sleep } from '@/utils/async'

export default {
  name: 'PostgresTableMenu',

  props: {
    table: String,
    schema: String,
    database: String,
  },

  data () {
    return {
      isActived: false,
      isLoading: false
    }
  },

  computed: {
    isSelected () {
      const { table, schema, database } = this.$route.query

      return table === this.table &&
        schema === this.schema &&
        database === this.database
    }
  },

  methods: {
    async handleClick () {
      this.isActived = !this.isActived
      this.$router.push({
        name: 'postgres table',
        query: {
          table: this.table,
          schema: this.schema,
          database: this.database
        }
      })
    }
  }
}
</script>
