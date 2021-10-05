<template>
  <v-row justify="center" class="my-16">
    <transition name="fade-transition" mode="out-in">
      <v-skeleton-loader
        class="rounded-xl"
        :class="$vuetify.breakpoint.xs ? '' : 'my-10'"
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
          <v-img v-ripple class="img" :src="post.url" :max-height="maxHeight">
          </v-img>
        </div>
        <div style="overflow: hidden">
          <v-card-text>
            <div class="d-flex justify-space-between">
              <div class="text-h6 text-lg-h4 font-weight-light accent--text">
                {{ post.title }}
              </div>
              <div class="accent--text d-flex-end">
                {{ new Date(post.created_at).toLocaleDateString() }}
              </div>
            </div>
            <br />
            <div
              class="text-lg-h6 text-subtitle-2 font-weight-light accent--text"
              v-if="post.description.Valid"
            >
              {{ post.description.String }}
            </div>
            <div class="mt-2 d-flex  justify-space-between">
              <v-chip-group active-class="primary--text">
                <v-chip
                  pill
                  class="accent--text font-weight-light"
                  v-for="tag in this.tags"
                  :key="tag"
                  @click="goToTagPage(tag)"
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
                      @click="handleRead"
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
import { Post } from '@/types';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const inner = namespace('inner');

@Component
export default class PostCard extends Vue {
  maxHeight = 0;

  width = 0;

  show = true;

  @Prop({ type: Object, required: true }) post!: Post;

  @inner.Mutation('setBlogId') setBlogId!: (id: number) => void;

  get tags(): Array<string> {
    if (this.post.tags.Valid === false) {
      return [];
    }
    return this.$props.post.tags.String.split('-');
  }

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
    if (this.post.url) {
      const img = new Image();
      img.src = this.post.url;
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

  handleRead(): void {
    this.setBlogId(this.post.id);
    this.$router.push({ path: `/post/${this.post.title}` });
  }

  goToTagPage(tag: string): void {
    this.$router
      .push({ path: `/posts/tag/${tag}` })
      .catch(() => console.log('you are already in this page!'));
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
