<template>
  <div class="login-dialog">
    <h1 class="title is-5">用户登陆</h1>
      <div class="field">
        <p class="control has-icons-left">
          <input type="text"
            :value="params.username"
            @focus="focused.username = true"
            @blur="handleUsernameBlur($event.target.value)"
            @click="message = false"
            autocomplete="current-password"
            :class="{
              'input': true,
              'is-danger': usernameDanger
            }"
          >

          <span class="icon is-left">
            <i class="iconfont icon-user"></i>
          </span>
        </p>
        <p class="help is-danger" v-show="usernameDanger">
          用户名不能为空
        </p>
      </div>

      <div style="height: 12px"></div>

      <div class="field">
        <p class="control has-icons-left">
          <input type="password"
            :value="params.password"
            @focus="focused.password = true"
            @blur="handlePasswordBlur($event.target.value)"
            @click="message = false"
            @keyup.enter="handlePasswordBlur($event.target.value), submit()"
            autocomplete="current-password"
            :class="{'input':true, 'is-danger': passwordDanger}"
          >

          <span class="icon is-left">
            <i class="iconfont icon-password"></i>
          </span>
        </p>
        <p class="help is-danger" v-if="passwordDanger">
          密码不能为空
        </p>
      </div>

    <a
      class="button is-primary is-rounded is-fullwidth"
      style="margin-top: 18px"
      :class="{'is-loading': isLoginning}"
      @click="submit"
    >
      登录
    </a>

    <p
      v-show="message"
      class="help is-danger"
      style="margin-top: 8px;"
    >
      用户名或密码错误
    </p>
  </div>
</template>

<script>
import storage from 'store'
import auth from '@/api/auth'

export default {
  data () {
    return {
      params: {
        username: '',
        password: ''
      },
      submitted: false,
      touched: {
        username: false,
        password: false
      },
      focused: {
        username: false,
        password: false
      },
      message: false,

      isLoginning: false
    }
  },

  computed: {
    usernameDanger () {
      return (
        (this.touched.username || this.submitted) &&
        !this.params.username && !this.focused.username
      )
    },

    passwordDanger () {
      return (
        (this.touched.password || this.submitted) &&
        !this.params.password && !this.focused.password
      )
    }
  },

  methods: {
    async submit (value) {
      this.submitted = true
      if (
        this.passwordDanger ||
        this.usernameDanger
      ) return

      this.isLoginning = true

      auth.login(this.params.username, this.params.password)
        .then(response => {
          // console.log(response)
          const token = response.data
          storage.set('token', token)
          this.$store.commit('token/setToken', token)
          this.$store.commit('token/setIsVerified', true)
          this.$router.push('/')
        })
        .catch(e => {
          if (!e.response) {
            throw e
          } else if (e.response.status === 403) {
            this.message = '用户名或密码错误'
          }
        }).finally(() => {
          this.isLoginning = false
        })
    },

    handleUsernameBlur (value) {
      this.params.username = value
      this.touched.username = true
      this.focused.username = false
    },

    handlePasswordBlur (value) {
      this.params.password = value
      this.touched.password = true
      this.focused.password = false
    }
  }
}
</script>
