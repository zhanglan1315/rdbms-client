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
      if (value === '' && this.value === null) {
        this.input = this.value
      } else {
        this.input = value
      }

      this.$emit('change', this.input)
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
