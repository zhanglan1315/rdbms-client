<template>
  <td
    ref="td"
    tabindex="0"
    v-html="value"
    :class="klass"
    @blur="handleBlur"
    @focus="handleFocus"
    @keypress.enter="handleCancel"
  />
</template>

<script>
export default {
  name: 'EditableCell',

  props: {
    value: {},
    isChanged: Boolean
  },

  computed: {
    klass () {
      return {
        'is-editable': true,
        'is-changed': this.isChanged
      }
    },

    dom () {
      return this.$refs.td
    }
  },

  methods: {
    handleBlur (event) {
      const range = document.createRange()
      const selection = window.getSelection()
      range.selectNodeContents(event.target)
      selection.removeAllRanges()
      this.inputValue = event.target.innerText.trim()

      this.$emit('change', this.inputValue)
    },

    handleFocus (event) {
      this.isFocused = true
      const range = document.createRange()
      const selection = window.getSelection()
      range.selectNodeContents(event.target)
      selection.removeAllRanges()
      selection.addRange(range)
    },

    handleCancel (event) {
      event.target.blur()
    },

    focus () {
      this.$refs.td.focus()
    }
  }
}
</script>
