<template>
  <div class="container">
    <div style="height: 1rem"></div>
    <div>
      <input type="text" class="input" v-model="msg">
    </div>
    <a
      class="button is-info"
      @click="handleClick"
    >
      测试按钮
    </a>
  </div>
</template>

<script>
import TableCell from '@/components/EditableCell'

const socket = new WebSocket('ws://localhost:8501')

socket.onopen = function () {
  socket.send('system:hoister:1:state')
}

socket.onclose = function () {
  console.log('close')
}

socket.onmessage = function (msg) {
  console.log(msg.data)
}

export default {
  components: {
    TableCell
  },

  data () {
    return {
      msg: '',
      isConnected: true
    }
  },

  methods: {
    handleClick () {
    }
  }
}
</script>
