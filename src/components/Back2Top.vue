<template>
  <v-fab-transition>
    <v-speed-dial
      v-model="fab"
      v-show="show"
      direction="top"
      right
      bottom
      fixed
      transition="slide-y-reverse-transition"
      class="mb-10"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="primary" dark fab right>
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green" @click="back2Top">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo" @click="toggleColorpick">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-fab-transition>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { namespace } from 'vuex-class';

const inner = namespace('inner');

@Component
export default class Back2Top extends Vue {
  fab = false;

  show = false;

  @inner.State('colorpickShow') isShow: boolean | undefined;

  // eslint-disable-next-line @typescript-eslint/ban-types
  @inner.Mutation('toggleColorpick') toggleColorpick: Function | undefined;

  scrollHandler(): void {
    const top =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    this.show = top >= 400;

    if (this.isShow) {
      // eslint-disable-next-line @typescript-eslint/ban-types
      (this.toggleColorpick as Function)();
    }
  }

  mounted(): void {
    window.addEventListener('scroll', this.scrollHandler);
  }

  destroyed(): void {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  back2Top(): void {
    this.$vuetify.goTo(0, {
      duration: 500,
      easing: 'easeOutQuart'
    });
  }
}
</script>
