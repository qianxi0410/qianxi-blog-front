<template>
  <div>
    <Parallax
      :motto="parallax.motto"
      :src="parallax.src"
      :title="parallax.title"
    />
    <h1>This is an about page</h1>
    <div style="height:1000px"></div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import Parallax from '@/components/Parallax.vue';
import { AboutSrc, AboutTitle, AboutMotto } from '@/config/index';

@Component({
  components: {
    Parallax
  }
})
export default class About extends Vue {
  parallax = {
    src: AboutSrc,
    title: AboutTitle,
    motto: AboutMotto
  };
}
</script>
