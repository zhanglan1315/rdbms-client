<template>
  <a
    style="flex: 1"
    class="button is-white"
    @click="!isLoading && (isShowDropdown = !isShowDropdown)"
    v-clickoutside="() => isShowDropdown = false"
  >
    <span class="icon">
      <span class="iconfont icon-storage"></span>
    </span>
    <span>{{schema}}</span>
    <div
      class="dropdown-menu is-right"
      :class="{'is-active': isShowDropdown}"
      style="min-width: 220px;"
    >
      <div class="dropdown-content">
        <span
          v-if="isLoading"
          class="button is-text is-loading"
        ></span>
        <a
          v-for="scm in schemas" :key="scm"
          class="button is-white is-fullwidth"
          @click="$emit('change', scm)"
        >
          <span class="icon">
            <span class="iconfont icon-process"></span>
          </span>
          <span>{{scm}}</span>
        </a>
      </div>
    </div>
  </a>
</template>

<script>
import pg from '@/api/postgres'

export default {
  name: 'PostgresSchemaMenu',

  props: {
    params: Object,
    schema: String,
    database: String
  },

  data () {
    return {
      schemas: [],
      isLoading: false,
      isShowDropdown: false
    }
  },

  watch: {
    async isShowDropdown (show) {
      if (show) {
        this.isLoading = true
        pg.schemas(this.params)
          .then(response => this.schemas = response.data)
          .finally(() => this.isLoading = false)
      } else {
        this.schemas = []
      }
    }
  }
}
</script>
