<template>
  <EditableCell
    :class="value === null && 'is-null'"
    :value="value"
    v-bind="$attrs"
    @blur="$emit('blur')"
    @focus.stop="handleFocus"
    @change="$emit('change', $event)"
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
    setNull () {
      this.$emit('change', null)
    },

    handleFocus () {
      this.$emit('focus', this)
    }
  }
}
</script>
