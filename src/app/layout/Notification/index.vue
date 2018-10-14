<template>
  <div class="notifications">
    <component
      v-for="item in items" :key="item.id"
      :is="item.component"
      v-bind="item.props"
    />
  </div>
</template>

<script>
import Notification from './Notification'

export default {
  data () {
    return {
      id: 1,
      items: [],
    }
  },

  methods: {
    open (context) {
      const id = this.id++
      const { items } = this

      items.push({
        id,
        props: context.props,
        component: context.component
      })

      setTimeout(() => {
        this.items.splice(items.findIndex(item => item.id === id), 1)
      }, context.duration || 5000)
    },

    success (text) {
      this.open({
        component: Notification,
        props: { text, icon: 'success', color: 'success' }
      })
    },

    error (text) {
      this.open({
        component: Notification,
        props: { text, icon: 'error', color: 'danger' }
      })
    }
  }
}
</script>
