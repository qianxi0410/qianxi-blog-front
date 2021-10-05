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
import { Vue, Component, Watch } from 'vue-property-decorator';
import Parallax from '@/components/Parallax.vue';
import CTimeLine from '@/components/TimeLine.vue';
import {
  TimeLineSrc,
  TimeLineTitle,
  TimeLineMotto,
  BlogName
} from '@/config/index';

@Component({
  components: {
    Parallax,
    CTimeLine
  }
})
export default class TimeLine extends Vue {
  parallax = {
    src: TimeLineSrc,
    title: TimeLineTitle,
    motto: TimeLineMotto
  };

  @Watch('$route')
  onRouteChange(): void {
    this.handleRouteChange();
  }

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

  // eslint-disable-next-line class-methods-use-this
  mounted(): void {
    document.title = `${BlogName} | TimeLine`;
    this.handleRouteChange();
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
