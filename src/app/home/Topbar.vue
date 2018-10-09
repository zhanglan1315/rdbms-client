<template>
  <nav class="app-topbar level is-marginless">
    <div
      class="title"
      @click="$router.push('/')"
      style="cursor: pointer"
    >
      RDBMS
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppTopbar'
}
</script>
