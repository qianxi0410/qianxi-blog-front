<template>
  <v-row justify="center" class="my-10 pa-10">
    <v-card :class="$vuetify.breakpoint.xs ? '' : 'rounded-xl'" elevation="3">
      <div style="overflow: hidden">
        <v-img
          class="img"
          v-show="src !== ''"
          :src="src"
          :max-height="maxHeight"
          :width="width"
        ></v-img>
      </div>
      <div>
        <v-card-text>
          <div class="font-weight-light grey--text title mb-2">
            For the perfect meal
          </div>
          <h3 class="display-1 font-weight-light orange--text mb-2">
            QW cooking utensils
          </h3>
          <div class="font-weight-light title mb-2">
            Our Vintage kitchen utensils delight any chef.<br />
            Made of bamboo by hand
          </div>
        </v-card-text>
      </div>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({
  props: {
    src: {
      type: String
    }
  }
})
export default class PostCard extends Vue {
  maxHeight = 0;

  width = 0;

  getImgSize(): void {
    if (this.$vuetify.breakpoint.name !== 'xs') {
      this.width = (window.screen.width * 2) / 3;
      if (this.$props.src !== '') {
        const img = new Image();
        img.src = this.$props.src;
        img.onload = () => {
          if (this.$vuetify.breakpoint.name !== 'xs') {
            this.maxHeight = img.height * 1.2;
            if (this.maxHeight > (this.width * 16) / 9) {
              this.maxHeight = (this.width * 16) / 9;
            }
          } else {
            this.maxHeight = (window.screen.height * 3) / 2;
          }
        };
      }
    } else {
      this.width = 450;
      this.maxHeight = 400;
    }
  }

  mounted(): void {
    this.getImgSize();
  }
}
</script>

<style scoped>
.img {
  transition: all 800ms cubic-bezier(0.075, 0.82, 0.165, 1);
}

.img:hover {
  transform: scale(1.2);
}
</style>
