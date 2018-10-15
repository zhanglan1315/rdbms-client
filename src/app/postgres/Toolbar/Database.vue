<template>
  <div
    class="dropdown"
    :class="{ 'is-active': isActive }">
    <div class="dropdown-trigger">
      <button
        class="button"
        @click="isActive = !isActive"
        v-clickoutside="() => isActive = false"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
      >
        <span>{{database}}</span>
        <span class="icon">
          <i class="iconfont icon-arrow-down" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a href="#" class="dropdown-item">
          Dropdown item
        </a>
        <a class="dropdown-item">
          Other dropdown item
        </a>
        <a href="#" class="dropdown-item is-active">
          Active dropdown item
        </a>
        <a href="#" class="dropdown-item">
          Other dropdown item
        </a>
        <hr class="dropdown-divider">
        <a href="#" class="dropdown-item">
          With a divider
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostgresToolbarDatabase',

  data () {
    return {
      isActive: false
    }
  },

  computed: {
    database () {
      return this.$route.params.database
    }
  }
}
</script>
