<template>
  <div
    v-if="!isLoading"
    class="container"
    style="max-width: 600px; margin-top: 0.75rem"
  >
    <TheItem
      :key="key"
      :connection="connection"
      :connectionId="connectionId"
      v-for="(connection, key) in connections"
    />

    <div style="
      display: flex;
      justify-content: center;
      margin-top: 0.75rem;
      margin-bottom: 0.75rem;
    ">
      <a
        @click="$router.push({name: 'connection create'})"
        class="button is-info">
        <span class="icon">
          <i class="iconfont icon-plus-bold"></i>
        </span>
        <span>
          新的连接
        </span>
      </a>
    </div>

    <router-view
      :total="connections.length"
      :connection="data[connectionId]"
      @created="addConnection"
      @updated="updateConnection"
      @destroyed="removeConnection"
    />
  </div>
  <div v-else>
    <div class="loading" />
  </div>
</template>

<script>
import TheItem from './Item'
import { sleep } from '@/utils/async'
import ConnectionApi from '@/api/connection'

export default {
  name: 'Connections',

  components: {
    TheItem
  },

  props: {
    connectionId: {},
  },

  data () {
    return {
      list: [],
      data: {},
      isLoading: false,
    }
  },

  computed: {
    connections () {
      return this.list.map(id => this.data[id])
    }
  },

  methods: {
    async getConnections () {
      this.isLoading = true
      try {
        await sleep(1000)
        const connections = await ConnectionApi.all()
        const list = [], data = {}

        connections.forEach(item => {
          list.push(item.id)
          data[item.id] = item
        })

        this.list = list
        this.data = data
      } finally {
        this.isLoading = false
      }
    },

    addConnection (item) {
      this.list.push(item.id)
      this.$set(this.data, item.id, item)
    },

    updateConnection (item) {
      this.data[item.id] = item
    },

    removeConnection (id) {
      this.list.splice(this.list.indexOf(id), 1)
      this.$delete(this.data, id)
    }
  },

  created () {
    this.getConnections()
  }
}
</script>
