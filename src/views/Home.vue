<template>
  <v-app>
    <Bar />
    <transition name="slide-x-transition" mode="out-in">
      <router-view />
    </transition>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Bar from '@/components/Bar.vue';

@Component({
  components: {
    Bar
  }
})
export default class Home extends Vue {}
</script>
