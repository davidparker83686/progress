<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <project-creation-modal />
  </main>
  <footer>
    <div class=" text-center text-primary">
      PROGRESS | 2021
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
