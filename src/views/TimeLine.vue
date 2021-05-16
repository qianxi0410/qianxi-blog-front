<template>
  <div class="top_container">
    <Parallax
      blur
      :motto="parallax.motto"
      :src="parallax.src"
      :title="parallax.title"
    />
    <h1>This is an timeline page</h1>
    <div style="height: 1000px"></div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import Parallax from '@/components/Parallax.vue';
import { TimeLineSrc, TimeLineTitle, TimeLineMotto } from '@/config/index';

@Component({
  components: {
    Parallax
  }
})
export default class TimeLine extends Vue {
  parallax = {
    src: TimeLineSrc,
    title: TimeLineTitle,
    motto: TimeLineMotto
  };
}
</script>

<style scoped>
.top_container {
  background-color: var(--v-secondary-base);
  color: var(--v-accent-base);
}

::selection {
  background: wheat;
  color: var(--v-primary-base);
}
</style>
