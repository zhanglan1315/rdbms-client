<template>
  <EditableCell
    :value="input"
    @change="handleChange"
    :is-changed="value !== input"
    ref="cell"
  />
</template>

<script>
import EditableCell from './BasicCell'

export default {
  components: {
    EditableCell
  },

  props: {
    value: {}
  },

  data () {
    return {
      input: {}
    }
  },

  methods: {
    handleChange (value) {
      if (value !== null) {
        value = parseInt(value)
        if (isNaN(value)) {
          value = this.value
        }
      }

      // This is not work
      // this.input = value
      this.input = undefined
      this.$nextTick(() => this.input = value)

      this.$emit('change', value)
    }
  },

  watch: {
    value: {
      immediate: true,
      handler () {
        this.input = this.value
      }
    }
  }
}
</script>
