<template>
  <div class="top_container">
    <Parallax
      blur
      :motto="parallax.motto"
      :src="parallax.src"
      :title="parallax.title"
    />
    <CTimeLine />
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import Parallax from '@/components/Parallax.vue';
import CTimeLine from '@/components/TimeLine.vue';
import { TimeLineSrc, TimeLineTitle, TimeLineMotto } from '@/config/index';

// eslint-disable-next-line no-use-before-define
@Component<TimeLine>({
  components: {
    Parallax,
    CTimeLine
  },
  watch: {
    $route(to: any, from: any): void {
      this.handleRouteChange();
    }
  }
})
export default class TimeLine extends Vue {
  parallax = {
    src: TimeLineSrc,
    title: TimeLineTitle,
    motto: TimeLineMotto
  };

  handleRouteChange(): void {
    if (this.$route.params.tagName) {
      this.parallax = {
        src: TimeLineSrc,
        title: `TimeLine: ${this.$route.params.tagName}`,
        motto: `Whatever begins, also ends.`
      };
    } else {
      this.parallax = {
        src: TimeLineSrc,
        title: TimeLineTitle,
        motto: TimeLineMotto
      };
    }
    this.$vuetify.goTo(0, {
      duration: 0,
      easing: 'easeInOutQuint'
    });
  }
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
