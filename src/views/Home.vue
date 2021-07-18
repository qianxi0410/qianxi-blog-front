<template>
  <v-app>
    <Bar />
    <v-progress-linear
      :value="progressPerCent"
      v-show="progressShow"
      class="progress"
      buffer-value="0"
      rounded
      :color="this.$vuetify.theme.dark ? '#ffdead' : 'primary'"
    ></v-progress-linear>

    <transition name="slide-x-transition" mode="out-in">
      <router-view ref="view" />
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
import { namespace } from 'vuex-class';
import { test } from '@/api/post';

const inner = namespace('inner');

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

  progressShow = false;

  progressPerCent = 0;

  @inner.Getter('getPostBannerHeight') getPostBannerHeight!: number;

  handleProgress(): void {
    if (window.pageYOffset >= this.getPostBannerHeight) {
      this.progressShow = true;
      this.progressPerCent =
        ((window.pageYOffset - this.getPostBannerHeight) /
          (document.body.clientHeight -
            this.getPostBannerHeight -
            window.innerHeight)) *
        100;
    } else {
      this.progressShow = false;
    }
  }

  mounted(): void {
    test().then(res => console.log(res));
    window.addEventListener('scroll', this.handleProgress);
  }

  destroyed(): void {
    window.removeEventListener('scroll', this.handleProgress);
  }
}
</script>

<style scoped>
.progress {
  height: 10em;
  position: fixed;
  top: 0;
  z-index: 1;
}
</style>
