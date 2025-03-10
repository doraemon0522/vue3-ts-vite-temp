<script setup lang="ts">
  import HelloWorld from './components/HelloWorld.vue';
  import LmButton from './components/lmButton/index.vue';
  import LmMap from './components/lmMap/dynamicTianDi.vue';
  import LmCloud from './components/lmCloud/d3Cloud.vue';
  import LmBall from './components/lmBall/terrain3D.vue';
</script>

<template>
  <div>
    <div style="height: 30px"><lm-button /></div>
    <div style="height: 500px"><lm-ball /></div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
