<template>
  <v-expand-transition>
    <v-color-picker
      v-click-outside="{
        handler: toggleColorpick,
        isShow
      }"
      elevation="10"
      class="picker"
      dot-size="25"
      v-show="isShow"
      swatches-max-height="200"
      v-model="value"
    ></v-color-picker>
  </v-expand-transition>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';
import { Inner } from '@/store/inner';

@Component({
  watch: {
    value(val: any): void {
      this.$vuetify.theme.themes.light.primary = val.hex;
    }
  },
  computed: {
    ...mapState<Inner>('inner', {
      isShow: (state: Inner) => state.colorpickShow as boolean
    })
  },
  methods: {
    ...mapMutations('inner', ['toggleColorpick'])
  }
})
export default class Colorpick extends Vue {
  value = {};

  // todo
}
</script>

<style scoped>
.picker {
  position: fixed;
  bottom: 120px;
  right: 10px;
}
</style>
