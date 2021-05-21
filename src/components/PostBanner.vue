<template>
  <div class="pic_container">
    <v-parallax :height="height" :src="src" :class="blur ? 'blur' : ''" />
    <v-row align="center" justify="center" class="drag accent--text">
      <v-col class="text-center" cols="12">
        <div class="font-weight-thin mb-4 text-h4 text-lg-h3">
          {{ title }}
        </div>
        <div class="font-weight-medium text-lg-subtitle-1 text-subtitle-2 mb-1">
          {{ description }}
        </div>
        <div class="font-weight-regular">
          {{ publishDate.toLocaleDateString() }}
        </div>
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
      required: true,
      default: ''
    },
    title: {
      type: String,
      required: true,
      default: ''
    },
    description: {
      type: String,
      required: false,
      default: ''
    },
    publishDate: {
      type: Date,
      required: true
    },
    blur: {
      type: Boolean,
      required: true,
      default: false
    }
  }
})
export default class PostBanner extends Vue {
  height = 0;

  handleHeight(): void {
    if (this.$vuetify.breakpoint.xs) {
      this.height = window.innerHeight - 55;
    } else {
      this.height = window.innerHeight * (2 / 3);
    }
  }

  back2Top(): void {
    this.$vuetify.goTo(0, {
      duration: 500,
      easing: 'easeOutQuart'
    });
  }

  mounted(): void {
    window.addEventListener('resize', this.handleHeight);
    this.handleHeight();
    this.back2Top();
  }

  destroyed(): void {
    window.removeEventListener('resize', this.handleHeight);
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
}
</style>
