<template>
  <EditableCell
    :value="value"
    v-bind="$attrs"
    v-on="$listeners"
    @dblclick="handleDoubleClick"
    :class="value === null && 'is-null'"
  />
</template>

<script>
import EditableCell from '@/components/EditableCell'

export default {
  components: {
    EditableCell
  },

  props: {
    value: {}
  },

  methods: {
    handleDoubleClick () {
      console.log(100)
    }
  }
}
</script>
