<template>
  <router-view />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class App extends Vue {
  isDarkTheme(): void {
    const time = new Date().getHours();
    this.$vuetify.theme.dark = !(time >= 7 && time < 20);
  }

  mounted(): void {
    this.isDarkTheme();
  }
}
</script>

<style>
::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
  background: hsla(0, 0%, 100%, 0.6);
}

::-webkit-scrollbar-track {
  border-radius: 0;
}

::-webkit-scrollbar-thumb {
  border-radius: 0;
  background-color: var(--v-primary-base);
  transition: all 0.2s;
  border-radius: 0.5rem;
}
</style>
