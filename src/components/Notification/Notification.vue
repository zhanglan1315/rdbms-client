<template>
  <div
    class="notification is-flex is-marginless"
    :class="'is-' + color"
    style="align-items: center"
  >
    <div
      class="is-flex is-flex-auto"
      style="justify-content: center; align-items: center"
    >
      <span>{{text}}</span>
    </div>

    <div
      style="
        width: 28px;
        height: 100%;
        display: flex;
        align-items: center;
        margin-right: 0.25rem;
        justify-content: center;
      "
    >
      <button
        class="delete"
        @click="$emit('close')"
      ></button>
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
