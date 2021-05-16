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

const inner = namespace('inner');

@Component({
  watch: {
    value(val: any): void {
      this.$vuetify.theme.themes.light.primary = val.hex;
      // this.$vuetify.theme.themes.light.accent = val.hex;
    }
  }
})
export default class Colorpick extends Vue {
  value = {};

  @inner.State('colorpickShow') isShow: boolean | undefined;
}
</script>

<style scoped>
.picker {
  position: fixed;
  bottom: 120px;
  right: 10px;
}
</style>
