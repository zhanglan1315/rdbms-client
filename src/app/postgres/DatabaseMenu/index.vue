<template>
  <ul>
    <li>
      <a
        @mouseover="isHovered = true"
        @mouseout="isHovered = false"
        @click="handleClick"
      >
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
          <i class="iconfont icon-storage"></i>
        </span>

        <span>{{database}}</span>

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
            class="iconfont icon-circle has-text-danger"
            @click.stop="handleArrowUpClick"
          ></i>
          <i
            v-else
            @click="handleArrowDownClick"
            class="iconfont icon-circle has-text-success"
          ></i>
        </span> -->
      </a>
    </li>

    <template v-if="isActived">
      <SchemaMenu
        v-for="schema in schemas" :key="schema"
        :schema="schema"
        :database="database"
      />
    </template>
  </ul>
</template>

<script>
import pg from '@/api/postgres'
import { sleep } from '@/utils/async'
import SchemaMenu from './SchemaMenu'
import Dependencies from '@/core/runtime'

export default {
  name: 'PostgresDatabaseMenu',

  components: {
    SchemaMenu
  },

  props: {
    database: {},
  },

  data () {
    return {
      schemas: [],
      isHovered: false,
      isActived: false,
      isLoading: false,
      isArrowHovered: false,
    }
  },

  methods: {
    async handleArrowDownClick () {
      if (this.isActived) return

      try {
        this.isLoading = true
        await sleep(500)
        this.schemas = await pg.schemas(this.database)

        this.isActived = true
      } catch (e) {
        Dependencies.notification.error('打开数据库失败')
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
    if (this.$route.params.database === this.database) {
      this.handleArrowDownClick()
    }
  }
}
</script>
