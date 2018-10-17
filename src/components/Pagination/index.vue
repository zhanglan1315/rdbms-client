<template>
  <div class="field has-addons is-marginless">
    <p class="control">
      <a class="button" @click="changePage(1)">
        <span class="icon is-small">
          <i class="iconfont icon-arrow-double-left"></i>
        </span>
      </a>
    </p>
    <p class="control">
      <a class="button" @click="changePage(page - 1)">
        <span class="icon is-small">
          <i class="iconfont icon-arrow-left"></i>
        </span>
      </a>
    </p>

    <p class="control">
      <input
        type="text"
        class="input"
        style="width: 56px; text-align: center"
        :value="page"
        @keypress.enter="handleInputEnter"
      >
    </p>

    <p class="control">
      <a class="button" @click="changePage(page + 1)">
        <span class="icon is-small">
          <i class="iconfont icon-arrow-right "></i>
        </span>
      </a>
    </p>

    <p class="control">
      <a class="button" @click="changePage(lastPage)">
        <span class="icon is-small">
          <i class="iconfont icon-arrow-double-right "></i>
        </span>
      </a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    page: Number,
    perPage: Number,
    total: Number
  },

  computed: {
    lastPage () {
      return Math.ceil(this.total / this.perPage)
    }
  },

  methods: {
    handleInputEnter (event) {
      const page = this.changePage(event.target.value)

      event.target.value = page
      event.target.blur()
    },

    changePage (value) {
      let page = parseInt(value)

      if (page < 1 || isNaN(page)) {
        page = 1
      } else if (page > this.lastPage) {
        page = this.lastPage
      } else

      if (page !== this.page) {
        this.$emit('change-page', page)
      }

      return page
    }
  }
}
</script>
