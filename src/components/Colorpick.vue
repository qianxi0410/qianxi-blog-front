<template>
  <v-expand-transition>
    <v-color-picker
      elevation="10"
      class="picker"
      dot-size="25"
      hide-inputs
      v-if="isShow"
      swatches-max-height="200"
      v-model="value"
    ></v-color-picker>
  </v-expand-transition>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { namespace } from 'vuex-class';

type Color = {
  alpha: number;
  hex: string;
  hexa: string;
  hsla: {
    h: number;
    s: number;
    l: number;
    a: number;
  };
  hsva: {
    h: number;
    s: number;
    v: number;
    a: number;
  };
  hue: number;
  rgba: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
};

const inner = namespace('inner');

@Component({
  watch: {
    value(val: Color): void {
      this.$vuetify.theme.themes.light.primary = val.hex;
    }
  }
})
export default class Colorpick extends Vue {
  value: Color = {} as Color;

  @inner.State('colorpickShow') isShow!: boolean;
}
</script>

<style scoped>
.picker {
  position: fixed;
  bottom: 120px;
  right: 10px;
}
</style>
