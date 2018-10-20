<template>
  <EditableCell
    :class="value === null && 'is-null'"
    :value="value"
    v-bind="$attrs"
    @blur="$emit('blur')"
    @change="handleChange"
    @focus.stop="handleFocus"
  />
</template>

<script>
import EditableCell from '@/components/EditableCell'

const state = {
  isSettingNull: false
}

export default {
  components: {
    EditableCell
  },

  props: {
    value: {}
  },

  methods: {
    handleFocus () {
      this.$emit('focus', this)
    },

    handleChange (value) {
      state.isSettingNull || this.$emit('change', value)
    },

    setNull () {
      state.isSettingNull = true
      setTimeout(() => {
        this.$emit('change', null)
        state.isSettingNull = false
      }, 0)
    }
  }
}
</script>
