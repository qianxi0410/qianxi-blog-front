<template>
  <router-view />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { systemVisit } from './api/system';
import { show } from './console/index';

const system = namespace('system');

@Component
export default class App extends Vue {
  isDarkTheme(): void {
    const time = new Date().getHours();
    this.$vuetify.theme.dark = !(time >= 7 && time < 20);
  }

  @system.Action('getSystemInfo') getSystemInfo!: () => Promise<null>;

  mounted(): void {
    this.isDarkTheme();
    show();
    this.getSystemInfo();
  }

  created(): void {
    systemVisit('/');
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
