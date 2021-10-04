<template>
  <v-expand-transition>
    <v-color-picker
      elevation="10"
      class="picker"
      hide-canvas
      hide-mode-switch
      hide-sliders
      show-swatches
      hide-inputs
      v-if="isShow"
      swatches-max-height="200px"
      v-model="value"
      :swatches="swatches"
      v-click-outside="handleClickOutside"
    ></v-color-picker>
  </v-expand-transition>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { namespace } from 'vuex-class';
import { themes } from '../config/index';

const inner = namespace('inner');

@Component({
  watch: {
    value(val: string): void {
      this.$vuetify.theme.themes.light.primary = val;
    }
  }
})
export default class Colorpick extends Vue {
  value = '#2196F3';

  @inner.State('colorpickShow') isShow!: boolean;

  @inner.Mutation('toggleColorpick') toggleColorpick!: () => void;

  handleClickOutside(): void {
    this.toggleColorpick();
  }

  swatches = themes;
}
</script>

<style scoped>
.picker {
  position: fixed;
  bottom: 120px;
  right: 10px;
}
</style>
