<template>
  <a
    style="flex: 1"
    class="button is-white is-roundless"
    @click="!isLoading && (isShowDropdown = !isShowDropdown)"
    v-clickoutside="() => isShowDropdown = false"
  >
    <span class="icon">
      <span class="iconfont icon-storage"></span>
    </span>

    <span>{{params.database}}</span>

    <div
      class="dropdown-menu"
      :class="{'is-active': isShowDropdown}"
    >
      <div class="dropdown-content">
        <span
          v-if="isLoading"
          class="button is-medium is-text is-loading"
        ></span>
        <a
          v-for="db in databases" :key="db"
          class="dropdown-item"
          @click="$emit('change', db)"
        >
          <span class="icon">
            <span class="iconfont icon-storage"></span>
          </span>
          <span>{{db}}</span>
        </a>
      </div>
    </div>
  </a>
</template>

<script>
import pg from '@/api/postgres'

export default {
  name: 'PostgresDatabaseMenu',

  props: {
    params: Object
  },

  data () {
    return {
      databases: [],
      isLoading: false,
      isShowDropdown: false
    }
  },

  watch: {
    async isShowDropdown (show) {
      if (show) {
        this.isLoading = true
        pg.databases(this.params)
          .then(response => this.databases = response.data)
          .finally(() => this.isLoading = false)
      } else {
        this.databases = []
      }
    }
  }
}
</script>
