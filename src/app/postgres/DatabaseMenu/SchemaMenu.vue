<template>
  <ul>
    <li>
      <a
        @mouseover="isHovered = true"
        @mouseout="isHovered = false"
        @click="handleClick"
      >
        <div style="width: 0.75rem"></div>

        <span
          class="icon"
          style="cursor: pointer"
          :style="isArrowHovered && 'font-weight: bold'"
          @mouseover="isArrowHovered = true"
          @mouseout="isArrowHovered = false"
        >
          <i
            v-if="isActived"
            class="iconfont icon-folder-open"
            @click.stop="handleArrowUpClick"
          ></i>
          <i
            v-else
            @click="handleArrowDownClick"
            class="iconfont icon-folder-close"
          ></i>
        </span>

        <span
          class="icon"
          :class="{ 'has-text-info': isActived }"
        >
          <i class="iconfont icon-server"></i>
        </span>

        <span>{{schema}}</span>

        <div style="flex: 2"></div>

        <a
          v-if="isLoading"
          class="button is-text is-loading"
        ></a>

        <!-- <span
          class="icon"
          style="cursor: pointer"
          v-show="isHovered || isActived"
          :style="isArrowHovered && 'font-weight: bold'"
          @mouseover="isArrowHovered = true"
          @mouseout="isArrowHovered = false"
        >
          <i
            v-if="isActived"
            class="iconfont icon-arrow-down"
            @click.stop="handleArrowUpClick"
          ></i>
          <i
            v-else
            @click="handleArrowDownClick"
            class="iconfont icon-arrow-up"
          ></i>
        </span> -->
      </a>
    </li>
    <TableMenuContainer
      v-if="isActived"
      :tables="tables"
      :schema="schema"
      :database="database"
      :notifications="notifications"
    />
  </ul>
</template>

<script>
import pg from '@/api/postgres'
import { sleep } from '@/utils/async'
import TableMenuContainer from './TableMenuContainer'

export default {
  name: 'PostgresSchemaMenu',

  components: {
    TableMenuContainer
  },

  props: {
    schema: String,
    database: String,
    notifications: Object
  },

  data () {
    return {
      tables: [],
      isHovered: false,
      isActived: false,
      isLoading: false,
      isArrowHovered: false
    }
  },

  methods: {
    async handleArrowDownClick () {
      if (this.isActived) return

      try {
        this.isLoading = true
        await sleep(500)
        this.tables = await pg.tables(this.database, this.schema)

        this.isActived = true
      } catch (e) {
        this.notifications.$error('打开数据库失败')
      } finally {
        this.isLoading = false
      }
    },

    async handleArrowUpClick () {
      this.isLoading = false
      this.isActived = false
    },

    async handleClick () {
      if (this.isActived) {
        this.handleArrowUpClick()
      } else {
        this.handleArrowDownClick()
      }
    }
  },

  created () {
    const { schema, database } = this.$route.params

    if (
      this.schema === schema &&
      this.database === database
    ) {
      this.handleArrowDownClick()
    }
  }
}
</script>
