<template>
  <div
    class="notification is-flex is-marginless"
    :class="'is-' + color"
    style="align-items: center"
  >
    <div style="width: 28px; margin-right: 0.25rem">
      <button
        class="delete is-medium"
        @click="$emit('close')"
      ></button>
    </div>

    <div
      class="is-flex is-flex-auto"
      style="justify-content: center; align-items: center"
    >
      <span>{{text}}</span>
    </div>
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
