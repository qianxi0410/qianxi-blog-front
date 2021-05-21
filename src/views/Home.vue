<template>
  <v-app>
    <Bar />
    <transition name="slide-x-transition" mode="out-in">
      <router-view />
    </transition>
    <Colorpick />

    <Back2Top />
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Bar from '@/components/Bar.vue';
import Footer from '@/components/Footer.vue';
import Back2Top from '@/components/Back2Top.vue';
import Colorpick from '@/components/Colorpick.vue';

@Component({
  components: {
    Bar,
    Footer,
    Back2Top,
    Colorpick
  }
})
export default class Home extends Vue {
  colorShow = false;
}
</script>
