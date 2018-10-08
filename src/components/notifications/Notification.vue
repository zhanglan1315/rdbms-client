<template>
  <div
    class="notification is-marginless"
    style="display: flex; justify-content: center"
  >
    <span :class="'icon has-text-' + color">
      <i class="iconfont icon-success"></i>
    </span>

    <div style="width: 0.5rem"></div>

    <span>{{text}}</span>
  </div>
</template>

<script>
export default {
  name: 'Notification',

  props: {
    text: String,

    icon: String,

    color: String
  }
}
</script>
