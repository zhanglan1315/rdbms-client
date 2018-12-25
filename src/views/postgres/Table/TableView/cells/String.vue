<template>
  <EditableCell
    :value="input"
    :is-changed="value !== input"
    @change="handleChange"
    v-on="$listeners"
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

      // console.log(this.value, this.input)
      this.$emit('modify', this.input)
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
