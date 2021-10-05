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
import { Vue, Component, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { themes } from '../config/index';

const inner = namespace('inner');

@Component
export default class Colorpick extends Vue {
  value = '#2196F3';

  @inner.State('colorpickShow') isShow!: boolean;

  @inner.Mutation('toggleColorpick') toggleColorpick!: () => void;

  @Watch('value')
  onValueChange(val: string): void {
    this.$vuetify.theme.themes.light.primary = val;
  }

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
