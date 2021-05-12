<template>
  <v-parallax :height="height" dark :src="src">
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12">
        <h1 class="display-1 font-weight-thin mb-4">
          Vuetify
        </h1>
        <h4 class="subheading">
          Build your application today!
        </h4>
      </v-col>
    </v-row>
  </v-parallax>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({
  props: {
    src: {
      type: String,
      required: true
    }
  }
})
export default class Parallax extends Vue {
  height = 0;

  handleHeight(): void {
    if (this.$vuetify.breakpoint.xs) {
      this.height = window.innerHeight - 55;
    } else {
      this.height = window.innerHeight * (2 / 3);
    }
  }

  mounted(): void {
    this.handleHeight();
  }
}
</script>
