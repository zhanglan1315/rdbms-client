<template>
  <div class="modal is-active">
    <div class="modal-background" @click="handleClose"></div>
    <div class="modal-card">
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
          class="button is-success"
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

export default {
  name: 'ConnectionDestroy',

  props: {
    connectionId: {}
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
    }
  }
}
</script>
