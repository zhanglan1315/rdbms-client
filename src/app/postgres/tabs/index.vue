<template>
  <div class="vue-tabs is-flex-auto is-flex is-flex-column">
    <div
      class="tabs is-boxed is-marginless"
      style="height: 45px"
    >
      <ul>
        <li
          v-for="tab in activedTabs" :key="tab.fullpath"
          :class="{'is-active': tab.fullpath === fullpath}"
          class="is-flex"
        >
          <a @click="handleTabClick(tab)">
            <span
              class="is-flex-auto"
              style="padding-right: 0.75rem"
            >{{tab.name}}</span>
            <button
              class="delete is-small"
              style="margin-right: -0.25rem"
              @click.stop="handleTabRemove(tab)"
            ></button>
          </a>
        </li>
      </ul>
    </div>

    <div
      v-show="activedTabs.length > 0"
      class="is-flex-auto"
    >
      <keep-alive
        :max="max"
        :include="include"
        :exclude="exclude"
      >
        <router-view
          :key="fullpath"
          @created="handleTabCreate"
          @activated="handleTabActivated"
          v-bind="$attrs"
          v-on="$listeners"
        />
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueTabs',

  props: {
    max: {},
    include: {},
    exclude: {},
    parentRoute: {},
  },

  data () {
    return {
      list: [],
      data: {}
    }
  },

  computed: {
    fullpath () {
      return this.$route.fullPath
    },

    activedTabs () {
      const tabs = []

      for (let i = 0, L = this.list.length; i < L; i++) {
        if (this.data[this.list[i]].activated === true) {
          tabs.push(this.data[this.list[i]])
        }
      }

      return tabs
    }
  },

  methods: {
    handleTabRemove (tab) {
      const tabs = this.activedTabs
      const index = tabs.indexOf(tab)
      const length = this.activedTabs.length

      if (tab.fullpath !== this.fullpath) {

      } else if (length === 1) {
        if (this.parentRoute) {
          this.$router.push(this.parentRoute)
        }
      } else if (index > 0) {
        this.handleTabClick(tabs[index - 1])
      } else {
        this.handleTabClick(tabs[index + 1])
      }

      tab.activated = false
    },

    handleTabClick (tab) {
      this.$router.push(tab.fullpath)
    },

    handleTabCreate ({vnode, name}) {
      const fullpath = this.fullpath

      if (this.list.indexOf(fullpath) !== -1) {
        return
      }
      if (this.list.length >= this.max) {
        this.list.shift()
      }

      this.list.push(fullpath)
      this.$set(this.data, fullpath, {
        name,
        vnode,
        fullpath,
        activated: true
      })
    },

    handleTabActivated () {
      const tab = this.data[this.fullpath]

      if (!tab.activated) {
        this.list.splice(this.list.indexOf(tab.fullpath), 1)
        this.list.push(tab.fullpath)
        tab.activated = true
      }
    }
  }
}
</script>
