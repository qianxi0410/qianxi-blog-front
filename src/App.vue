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
