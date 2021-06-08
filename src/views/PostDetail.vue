<template>
  <div class="top_container">
    <PostBanner
      blur
      :description="post.description"
      :src="post.src"
      :title="post.title"
      :publishDate="new Date()"
    />
    <v-container>
      <v-row>
        <v-col
          :cols="
            !(this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl)
              ? 12
              : 10
          "
          :class="
            !(this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl)
              ? 'pa-10'
              : ''
          "
        >
          <v-chip-group active-class="primary--text" column>
            <v-chip v-for="tag in post.tags" :key="tag" class="mr-3">
              {{ tag }}
            </v-chip>
          </v-chip-group>
          <div class="mt-10">
            <Markdown id="markdown" />
          </div>
        </v-col>
        <v-col
          v-if="this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl"
        >
          <Toc :toc="toc" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import PostBanner from '@/components/PostBanner.vue';
import Markdown from '@/components/Markdown.vue';
import Toc from '@/components/Toc.vue';
import { namespace } from 'vuex-class';
import { BlogName } from '@/config/index';

const inner = namespace('inner');

@Component({
  components: {
    PostBanner,
    Markdown,
    Toc
  }
})
export default class PostsDetail extends Vue {
  @inner.Getter('getBlogId') getBlogId!: number;

  arr = [
    {
      src: 'https://w.wallhaven.cc/full/z8/wallhaven-z8p9rj.jpg',
      title: 'promise 日记',
      description: '简单实现了一个promise',
      publishDate: '2021-05-19',
      tags: ['vue', 'javascript']
    },
    {
      src: 'https://w.wallhaven.cc/full/28/wallhaven-281d5y.png',
      title: 'promise.js简要实现2',
      description:
        '简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise',
      publishDate: '2021-05-20',
      tags: ['vue', 'javascript']
    },
    {
      src: 'https://w.wallhaven.cc/full/rd/wallhaven-rddgwm.jpg',
      title: 'promise.js简要实现3',
      description: '简单实现了一个promise',
      publishDate: '2021-05-19',
      tags: ['vue', 'javascript']
    },
    {
      src: 'https://w.wallhaven.cc/full/72/wallhaven-7232p9.jpg',
      title: 'promise.js简要实现4',
      description:
        '简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise',
      publishDate: '2021-05-20',
      tags: ['vue', 'javascript']
    }
  ];

  post = {};

  toc: Array<{ level: string; hook: string; title: string }> = [];

  getToc(): void {
    this.$nextTick(() => {
      const theme = this.$vuetify.theme.dark ? '.dark' : '.light';
      const container = document.querySelector(theme);
      const children = container?.childNodes;
      // eslint-disable-next-line no-unused-expressions
      children?.forEach(e => {
        if (e.nodeName.includes('H')) {
          this.toc.push({
            level: e.nodeName.slice(1),
            hook: e.id,
            title: e.textContent!
          });
        }
      });
    });
  }

  mounted(): void {
    this.post = this.arr[this.getBlogId];
    document.title = `${BlogName} | ${(this.post as { title: string }).title}`;
    this.getToc();
  }
}
</script>

<style lang="css" scoped>
.top_container {
  background-color: var(--v-secondary-base);
  color: var(--v-accent-base);
}
</style>
