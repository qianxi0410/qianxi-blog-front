<template>
  <div class="pic_container" v-resize="handleHeight">
    <v-parallax
      :height="height"
      :src="this.$vuetify.theme.dark ? src[1] : src[0]"
      ref="parallax"
      :class="blur ? 'blur' : ''"
      :key="title"
    />
    <v-row align="center" justify="center" class="drag text--primary">
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const inner = namespace('inner');

@Component
export default class Parallax extends Vue {
  height = 0;

  @Prop(Array) src!: Array<string>;

  @Prop(String) title!: string;

  @Prop(String) motto!: string;

  @Prop({ type: Boolean, default: false }) blur!: boolean;

  @inner.Mutation('setPostBannerHeight') setPostBannerHeight!: (
    n: number
  ) => void;

  $refs!: {
    parallax: Element;
  };

  handleHeight(): void {
    if (this.$vuetify.breakpoint.xs) {
      this.height = window.innerHeight - 55;
      this.setPostBannerHeight(this.height + 70);
    } else {
      this.height = window.innerHeight * (2 / 3);
      this.setPostBannerHeight(this.height + 80);
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
}
</style>
