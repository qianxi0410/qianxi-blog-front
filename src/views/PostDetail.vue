<template>
  <div class="top_container">
    <PostBanner
      blur
      :description="post.description"
      :src="post.src"
      :title="post.title"
      :publishDate="new Date()"
    />
    <v-container style="height:1000px"> </v-container>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import PostCard from '@/components/PostCard.vue';
import PostBanner from '@/components/PostBanner.vue';
import { namespace } from 'vuex-class';
import { BlogName } from '@/config/index';

const inner = namespace('inner');

@Component({
  components: {
    PostBanner,
    PostCard
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

  mounted(): void {
    this.post = this.arr[this.getBlogId];
    document.title = `${BlogName} | ${(this.post as { title: string }).title}`;
  }
}
</script>

<style scoped>
.top_container {
  background-color: var(--v-secondary-base);
  color: var(--v-accent-base);
}

::selection {
  background: wheat;
  color: var(--v-primary-base);
}
</style>
