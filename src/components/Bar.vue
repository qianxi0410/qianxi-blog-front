<template>
  <div>
    <v-navigation-drawer v-model="mobile.drawer" v-if="isMobile" app />

    <v-app-bar color="blue darken-1" dark>
      <v-tool-bar>
        <v-toolbar-title class="ml-3">千禧's blog</v-toolbar-title>
      </v-tool-bar>

      <v-avatar class="ml-6">
        <img src="@/assets/avatar.jpg" alt="John" />
      </v-avatar>

      <v-spacer></v-spacer>

      <v-slide-y-transition>
        <v-tabs v-if="!isMobile" right class="mr-10">
          <v-tabs-slider color="white" />
          <v-tab to="/index">Index</v-tab>
          <v-tab to="/timeline">TimeLine</v-tab>
          <v-tab to="/about">About</v-tab>
        </v-tabs>
      </v-slide-y-transition>

      <v-fab-transition>
        <v-app-bar-nav-icon
          v-if="isMobile"
          @click="mobile.drawer = !mobile.drawer"
        />
      </v-fab-transition>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({
  computed: {
    isMobile(): boolean {
      return this.$vuetify.breakpoint.xs;
    }
  }
})
export default class Bar extends Vue {
  mobile = {
    drawer: null
  };
}
</script>
