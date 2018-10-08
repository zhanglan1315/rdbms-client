<template>
  <div class="modal is-active">
    <div class="modal-background" @click="handleClose"></div>
    <div class="modal-card" style="width: 360px">
      <header class="modal-card-head">
        <p class="modal-card-title">操作确认</p>
      </header>
      <section class="modal-card-body">
        <p>
          删除已经保存的数据库连接
        </p>
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-info"
          @click="$wait(handleConfirm)"
        >确认</button>
        <button class="button" @click="handleClose">
          取消
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import ConnectionApi from '@/api/connection'
import Notification from './Notification'

export default {
  name: 'ConnectionDestroy',

  props: {
    connectionId: {},
    notifications: Object
  },

  methods: {
    handleClose () {
      this.$router.push({
        name: 'home'
      })
    },

    async handleConfirm () {
      await ConnectionApi.destroy(this.connectionId)
      this.$emit('destroyed', this.connectionId)
      this.handleClose()
      this.notifications.$add({
        component: Notification
      })
    }
  }
}
</script>
