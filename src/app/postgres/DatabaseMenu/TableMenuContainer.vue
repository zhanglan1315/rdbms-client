<template>
  <ul>
    <li>
      <a
        @mouseover="isHovered = true"
        @mouseout="isHovered = false"
        @click="isActived = !isActived"
      >
        <div style="width: 1.5rem"></div>

        <span
          class="icon"
          style="cursor: pointer"
          @mouseover="isArrowHovered = true"
          @mouseout="isArrowHovered = false"
          :style="isArrowHovered && 'font-weight: bold'"
        >
          <i
            v-if="isActived"
            @click.stop="isActived = false"
            class="iconfont icon-folder-open"
          ></i>
          <i
            v-else
            @click.stop="isActived = true"
            class="iconfont icon-folder-close"
          ></i>
        </span>

        <span class="icon">
          <i class="iconfont icon-table"></i>
        </span>
        <span>数据表</span>
        <div style="flex: 2"></div>
      </a>
    </li>
    <template v-if="isActived">
      <TableMenu
        v-for="table in tables" :key="table"
        :table="table"
        :schema="schema"
        :database="database"
      />
    </template>
  </ul>
</template>

<script>
import TableMenu from './TableMenu'

export default {
  components: {
    TableMenu
  },

  props: {
    tables: Array,
    schema: String,
    database: String,
  },

  data () {
    return {
      isActived: false,
      isHovered: false,
      isArrowHovered: false,
    }
  },

  created () {
    const { table, schema, database } = this.$route.params

    if (
      table &&
      this.schema === schema &&
      this.database === database
    ) {
      this.isActived = true
    }
  }
}
</script>
