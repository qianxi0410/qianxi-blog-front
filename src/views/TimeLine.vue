<template>
  <div class="top_container">
    <Parallax
      blur
      :motto="parallax.motto"
      :src="TIMELINE_SRC"
      :title="parallax.title"
    />
    <CTimeLine />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import Parallax from '@/components/Parallax.vue';
import CTimeLine from '@/components/TimeLine.vue';
import { TimeLineTitle, TimeLineMotto, BlogName } from '@/config/index';

import { namespace } from 'vuex-class';

const system = namespace('system');

@Component({
  components: {
    Parallax,
    CTimeLine
  }
})
export default class TimeLine extends Vue {
  @system.Getter('TIMELINE_SRC') TIMELINE_SRC!: string[];

  parallax = {
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
        title: `TimeLine: ${this.$route.params.tagName}`,
        motto: `Whatever begins, also ends.`
      };
    } else {
      this.parallax = {
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
