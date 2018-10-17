<template>
  <EditableCell
    :value="input"
    @change="handleChange"
    :is-changed="value !== input"
    ref="cell"
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

  data () {
    return {
      input: {}
    }
  },

  methods: {
    handleChange (value) {
      value = parseInt(value)
      if (isNaN(value)) {
        value = this.value
      }
      this.$emit('change', value)

      this.input = undefined
      this.$nextTick(() => this.input = value)
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
