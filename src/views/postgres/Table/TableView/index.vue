<template>
  <div class="full-container is-flex is-flex-column">
    <div
      class="is-flex has-border-bottom"
      style="height: 45px; padding: 0.25rem;"
    >
      <div class="field is-marginless">
        <div class="control">
          <a
            class="button is-white"
            style="margin-right: 0.25rem"
            :class="{'is-light': isQueryShow}"
            @click="isQueryShow = !isQueryShow"
          >
            <span class="icon">
              <i class="iconfont icon-search"></i>
            </span>
          </a>

          <a
            class="button is-white"
            @click="handleRefresh"
            :disabled="isLoading"
          >
            <span class="icon">
              <i class="iconfont icon-refresh"></i>
            </span>
          </a>
        </div>
      </div>

      <div
        class="has-background-grey-lighter"
        style="width: 1px; margin: 0.1rem; margin-left: 0.25rem; margin-right: 0.25rem"
      ></div>

      <div class="field is-marginless">
        <div class="control">
          <a
            class="button is-white"
            :class="{'is-loading': isUpdating}"
            :disabled="!hasModifiers"
            @click="handleSaveModifiers"
          >
            <span class="icon">
              <i class="iconfont icon-save"></i>
            </span>
            <span>保存</span>
          </a>

          <a
            class="button is-white"
            v-if="focusedCell"
            @mousedown.left="handleSetNull"
          >
            <span>设为 NULL</span>
          </a>
        </div>
      </div>

      <div
        class="has-background-grey-lighter"
        style="width: 1px; margin: 0.1rem; margin-left: 0.25rem; margin-right: 0.25rem"
      ></div>
    </div>

    <div
      v-show="isQueryShow"
      class="field"
      style="margin: 0.5rem; margin-bottom: 0"
    >
      <p class="control has-icons-left">
        <input
          type="text"
          class="input is-roundless is-medium"
          style="padding-left: 3.8rem;"
          placeholder="where condition"
          :class="{'is-danger': isQueryError}"
          v-model="where"
          @keypress.enter="handleQuery"
        >
        <span
          class="icon is-left"
          style="width: 4rem"
        >
          SQL
        </span>
      </p>
    </div>

    <div
      class="is-flex-auto has-border-bottom"
      style="overflow: auto; margin-bottom: 0.5rem"
    >
        <table
          v-if="!isLoading"
          class="table is-bordered"
          style="margin: 0.5rem; margin-right: 0.5rem"
        >
          <thead>
            <tr>
              <th v-for="column in displayColumns" :key="column.name">
                <span>{{column.name}}</span>
                <span v-if="column.jsType === 'default'">
                  {{column.pgType}}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(datum, index) in dataSource.data" :key="index">
              <component
                v-for="column in displayColumns" :key="column.name"
                :is="cells[column.jsType]"
                :value="datum[column.key]"
                @modify="handleModify(datum, column, $event)"
                @focus="handleCellFocus"
                @blur="handleCellBlur"
              />
            </tr>
          </tbody>
        </table>
        <div
          v-if="isLoading"
          class="is-flex"
          style="justify-content: center; align-items: center; padding-top: 3rem"
        >
          <div class="button is-text is-loading is-large"></div>
        </div>
    </div>

    <div
      class="is-flex"
      style="padding: 0 0.5rem 0.5rem 0.5rem; align-items: center;"
    >
      <Pagination
        :page="dataSource.page"
        :total="dataSource.total"
        :perPage="dataSource.perPage"
        @change-page="handleChangePage"
      />
      <span style="margin-left: 0.5rem">
        {{dataSource.time}}ms
      </span>
      <div class="is-flex-auto"></div>
      <span>
        {{ dataSource.data.length }} / {{dataSource.total}}
      </span>
    </div>
  </div>
</template>

<script>
import pg from '@/api/postgres'
import float from './cells/Float'
import string from './cells/String'
import integer from './cells/Integer'
import Default from './cells/Default'
import Pagination from '@/components/Pagination'

const cells = {
  float,
  string,
  integer,
  default: Default
}

export default {
  name: 'PostgresTableView',

  components: {
    Pagination
  },

  props: {
    table: String,
    schema: String,
    database: String,
    connectionId: {},
  },

  data () {
    return {
      cells,
      page: 1,
      where: '',
      perPage: 30,
      modifiers: {},
      focusedCell: null,
      isLoading: false,
      isUpdating: false,
      isQueryShow: false,
      isQueryError: false,
      dataSource: {
        page: 1,
        data: [],
        time: 0.001,
        columns: [],
        perPage: 200,
      },
    }
  },

  computed: {
    key () {
      return this.table + this.schema + this.database + this.connectionId
    },

    params () {
      return {
        page: this.page,
        table: this.table,
        schema: this.schema,
        perPage: this.perPage,
        database: this.database,
        where: this.isQueryShow && this.where,
        connectionId: this.connectionId
      }
    },

    displayColumns () {
      const columns = []
      this.dataSource.columns.forEach((column, key) => {
        if (column.name !== 'ctid') {
          columns.push({
            key, ...column,
            pgType: column.type,
            jsType: this.transColumnType(column.type)
          })
        }
      })

      return columns
    },

    hasModifiers () {
      return Object.keys(this.modifiers).length
    }
  },

  methods: {
    handleInitialize () {
      this.page = 1
      this.search()
    },

    handleChangePage (page) {
      this.page = page
      this.search()
    },

    handleQuery () {
      this.page = 1
      this.search()
    },

    handleRefresh () {
      this.page = 1
      this.search()
    },

    handleCellFocus (cell) {
      this.focusedCell = cell
    },

    handleCellBlur () {
      this.focusedCell = null
    },

    handleSetNull () {
      this.focusedCell.setNull()
    },

    handleModify (data, column, value) {
      const ctid = data[0]
      const mdfs = this.modifiers
      const oldValue = data[column.key]

      if (!mdfs[ctid]) {
        if (value === oldValue) return

        this.$set(mdfs, ctid, {
          set: {},
          where: { ctid }
        })
      }

      const modifier = mdfs[ctid]

      if (value === oldValue) {
        this.$delete(modifier.set, column.name)
        this.$delete(modifier.where, column.name)
        if (!Object.keys(modifier.set).length) {
          this.$delete(mdfs, ctid)
        }
      } else {
        this.$set(modifier.set, column.name, value)
        this.$set(modifier.where, column.name, oldValue)
      }
    },

    handleSaveModifiers () {
      if (!this.hasModifiers) return
      const params = {
        table: this.table,
        schema: this.schema,
        database: this.database,
        modifiers: this.modifiers,
        connectionId: this.connectionId
      }
      this.isUpdating = true
      pg.tableUpdate(params)
        .then(response => this.search())
        .catch(error => {
          const message = error.response.data.message
          this.$notification.error(message, 1000000)
        })
        .finally(() => this.isUpdating = false)
    },

    search () {
      if (this.isLoading) return

      this.modifiers = {}
      this.isLoading = true
      this.isQueryError = false
      this.dataSource.data = []
      this.dataSource.columns = []

      const handleError = error => {
        this.$notification.error(error.response.data.message, 100000)
      }

      return pg.tableSearch(this.params)
        .then(response => this.dataSource = response.data)
        .catch(handleError)
        .finally(() => this.isLoading = false)
    },

    transColumnType (type) {
      if (type.match(/^int/)) {
        return 'integer'
      } else if (type.match(/^float/)) {
        return 'float'
      } else if (type.match(/char/)) {
        return 'string'
      } else if (type.match(/^_/)) {
        return 'string'
      } else {
        return 'default'
      }
    }
  },

  created () {
    if (
      this.table === undefined ||
      this.schema === undefined ||
      this.database === undefined ||
      this.connectionId === undefined
    ) {
      return
    }

    this.handleInitialize()
  }
}
</script>
