<template>
  <a
    @click="handleItemClick"
    @mouseout="isHovered = false"
    @mouseover="isHovered = true"
    class="connection-item"
    :class="{'has-background-grey-lighter': isActive}"
  >
    <span
      class="icon is-medium"
      :class="{ 'has-text-info': isHovered }">
      <i class="iconfont icon-postgres"></i>
    </span>

    <p style="flex: 2; margin-left: 0.75rem">
      {{connection.name}}
    </p>

    <div>
      <a
        @click.stop="handleSettingClick"
        class="button is-setting">
        <span class="icon">
          <i class="iconfont icon-gear"></i>
        </span>
      </a>
      <a
        @click.stop="handleDestroyClick"
        class="button is-setting"
        style="margin-left: 0.75rem">
        <span class="icon">
          <i class="iconfont icon-close-bold"></i>
        </span>
      </a>
    </div>
  </a>
</template>

<script>
export default {
  name: 'ConnectionItem',

  props: {
    connection: Object,
    connectionId: {}
  },

  data () {
    return {
      isHovered: false
    }
  },

  computed: {
    isActive () {
      return this.connection.id == this.connectionId
    }
  },

  methods: {
    handleSettingClick () {
      this.$router.push({
        name: 'connection manage',
        params: {
          connectionId: this.connection.id
        }
      })
    },

    handleDestroyClick () {
      this.$router.push({
        name: 'connection destroy',
        params: {
          connectionId: this.connection.id
        }
      })
    },

    async handleItemClick () {
      this.isHovered = false
      switch (this.connection.driver) {
        case 'pgsql':
          this.handlePostgresBoot()
          break
      }
    },

    async handlePostgresBoot () {
      this.$router.push({
        name: 'postgres',
        params: {
          connectionId: this.connection.id
        },
        query: {
          driver: this.connection.driver,
          schema: this.connection.schema,
          database: this.connection.database
        }
      })
    }
  }
}
</script>
