<template>
  <v-row justify="center" class="my-16">
    <transition name="fade-transition" mode="out-in">
      <v-skeleton-loader
        class="rounded-xl"
        :class="this.$vuetify.breakpoint.xs ? '' : 'my-10'"
        :width="width"
        type="card"
        elevation="2"
        v-if="show"
      >
      </v-skeleton-loader>
      <v-card
        :width="width"
        :class="$vuetify.breakpoint.xs ? '' : 'rounded-xl my-10'"
        elevation="3"
        v-else
      >
        <div style="overflow: hidden">
          <v-img
            class="img"
            v-if="post.src !== ''"
            :src="post.src"
            :max-height="maxHeight"
          >
          </v-img>
        </div>
        <div style="overflow: hidden">
          <v-card-text>
            <div class="d-flex justify-space-between">
              <div
                class="text-h5 text-lg-h4 font-weight-light accent--text mb-2"
              >
                {{ post.title }}
              </div>
              <div class="accent--text d-flex-end">
                {{ post.publishDate }}
              </div>
            </div>
            <br />
            <div
              class="text-lg-h6 text-subtitle-1 font-weight-light accent--text"
            >
              {{ post.description }}
            </div>
            <div class="mt-2 d-flex  justify-space-between">
              <v-chip-group active-class="primary--text">
                <v-chip
                  pill
                  class="accent--text"
                  outlined
                  v-for="tag in post.tags"
                  :key="tag"
                >
                  {{ tag }}
                </v-chip>
              </v-chip-group>
              <div>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      depressed
                      plain
                      class="mt-3 accent--text"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-read</v-icon>
                    </v-btn>
                  </template>
                  <span class="accent--text">Read</span>
                </v-tooltip>
              </div>
            </div>
          </v-card-text>
        </div>
      </v-card>
    </transition>
  </v-row>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({
  props: {
    post: {
      type: Object,
      required: true
    }
  }
})
export default class PostCard extends Vue {
  maxHeight = 0;

  width = 0;

  show = true;

  getImgSize(): void {
    if (this.$vuetify.breakpoint.name !== 'xs') {
      this.width = (document.body.offsetWidth * 2) / 3;
      this.maxHeight = (this.width * 2.8) / 4;
    } else {
      this.width = (document.body.offsetWidth * 4.5) / 5;
      this.maxHeight = (this.width * 2) / 3;
    }
  }

  handleLoad(): void {
    if (this.$props.post.src) {
      const img = new Image();
      img.src = this.$props.post.src;
      img.onload = () => {
        this.show = false;
      };
      img.onerror = () => {
        this.show = false;
      };
    } else {
      this.show = false;
    }
  }

  mounted(): void {
    window.addEventListener('resize', this.getImgSize);

    this.getImgSize();
    this.handleLoad();
  }

  destroyed(): void {
    window.removeEventListener('resize', this.getImgSize);
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

::selection {
  background: wheat;
  color: var(--v-primary-base);
}
</style>
