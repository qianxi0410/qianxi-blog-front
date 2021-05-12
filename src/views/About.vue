<template>
  <div class="about">
    <Parallax :src="src" />
    <h1>This is an about page</h1>
    <div style="height:1000px"></div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import Parallax from '@/components/Parallax.vue';
import { AboutSrc } from '@/config/index';

@Component({
  components: {
    Parallax
  }
})
export default class About extends Vue {
  src = AboutSrc;
}
</script>
