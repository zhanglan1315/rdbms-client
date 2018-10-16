<template>
  <a
    style="flex: 1"
    class="button is-light"
    @click="!isLoading && (isShowDropdown = !isShowDropdown)"
    v-clickoutside="() => isShowDropdown = false"
  >

    <span class="icon">
      <span class="iconfont icon-storage"></span>
    </span>

    <span>{{database}}</span>

    <span
      v-if="isLoading"
      class="button is-text is-loading"
    ></span>

    <div
      class="dropdown-menu"
      :class="{'is-active': !isLoading && isShowDropdown}"
      style="min-width: 230px;"
    >
      <div class="dropdown-content">
        <a
          v-for="db in databases" :key="db"
          class="button is-light is-fullwidth"
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
  props: {
    database: String
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
        try {
          this.databases = await pg.databases()
        } finally {
          this.isLoading = false
        }
      } else {
        this.databases = []
      }
    }
  }
}
</script>
