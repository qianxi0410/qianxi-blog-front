<template>
  <div class="pic_container">
    <v-parallax :height="height" dark ref="pic" :src="src" class="blur" />
    <v-row align="center" justify="center" class="drag">
      <v-col class="text-center" cols="12">
        <h1 class="font-weight-thin mb-4 text-h3 text-lg-h2">
          {{ title }}
        </h1>
        <h4 class="text-h6">
          {{ motto }}
        </h4>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({
  props: {
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    motto: {
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

<style scoped>
.pic_container {
  position: relative;
  overflow: hidden;
}

.blur {
  -webkit-filter: blur(8px);
  -moz-filter: blur(8px);
  -ms-filter: blur(8px);
  filter: blur(8px);
  transition: all 0.3s ease-in-out;
}

.blur:hover {
  -webkit-filter: blur(0px);
  -moz-filter: blur(0px);
  -ms-filter: blur(0px);
  filter: blur(0px);
}

.drag {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}
</style>
