<template>
  <div class="top_container">
    <Parallax
      blur
      :motto="parallax.motto"
      :src="parallax.src"
      :title="parallax.title"
    />
    <v-container>
      <PostCard :post="item" v-for="(item, index) in post" :key="index" />
    </v-container>
    <v-row justify="center" class="mb-10 mt-n10">
      <v-pagination
        :color="this.$vuetify.theme.dark ? '#3f3f5f' : 'primary'"
        circle
        v-model="page"
        :length="2"
        :total-visible="7"
        @input="handleInput"
      ></v-pagination>
    </v-row>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import Parallax from '@/components/Parallax.vue';
import PostCard from '@/components/PostCard.vue';
import { IndexSrc, IndexTitle, IndexMotto, BlogName } from '@/config/index';

// eslint-disable-next-line no-use-before-define
@Component<Posts>({
  components: {
    Parallax,
    PostCard
  }
})
export default class Posts extends Vue {
  parallax = {
    src: IndexSrc,
    title: IndexTitle,
    motto: IndexMotto
  };

  page = 1;

  arr = [
    {
      src: 'https://w.wallhaven.cc/full/z8/wallhaven-z8p9rj.jpg',
      title: 'promise.js简要实现',
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

  post = this.arr.slice(0, 2);

  handleInput(): void {
    document.title = `${BlogName} | # ${this.page}`;
    if (this.page === 1) {
      this.post = this.arr.slice(0, 2);
    } else {
      this.post = this.arr.slice(2, 4);
    }
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
