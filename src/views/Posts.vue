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
import { IndexSrc, IndexTitle, IndexMotto } from '@/config/index';
import { namespace } from 'vuex-class';

const inner = namespace('inner');

// eslint-disable-next-line no-use-before-define
@Component<Posts>({
  components: {
    Parallax,
    PostCard
  },
  watch: {
    $route(to: any, from: any): void {
      this.handleRouteChange();
    }
  }
})
export default class Posts extends Vue {
  @inner.Mutation('setCurrentPage') setCurrentPage!: (page: number) => void;

  @inner.Getter('getCurrentPage') getCurrentPage!: number;

  @inner.Getter('getPostBannerHeight') getPostBannerHeight!: number;

  parallax = {
    src: IndexSrc,
    title: IndexTitle,
    motto: IndexMotto
  };

  page = 1;

  arr = [
    {
      id: 0,
      src: 'https://w.wallhaven.cc/full/z8/wallhaven-z8p9rj.jpg',
      title: 'promise.js简要实现',
      description: '简单实现了一个promise',
      publishDate: '2021-05-19',
      tags: ['vue', 'javascript1']
    },
    {
      id: 1,
      src: 'https://w.wallhaven.cc/full/28/wallhaven-281d5y.png',
      title: 'promise.js简要实现2',
      description:
        '简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise',
      publishDate: '2021-05-20',
      tags: ['vue', 'javascript2']
    },
    {
      id: 2,
      src: 'https://w.wallhaven.cc/full/rd/wallhaven-rddgwm.jpg',
      title: 'promise.js简要实现3',
      description: '简单实现了一个promise',
      publishDate: '2021-05-19',
      tags: ['vue', 'javascript3']
    },
    {
      id: 3,
      src: 'https://w.wallhaven.cc/full/72/wallhaven-7232p9.jpg',
      title: 'promise.js简要实现4',
      description:
        '简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise',
      publishDate: '2021-05-20',
      tags: ['vue', 'javascript4']
    }
  ];

  post = this.arr.slice(0, 2);

  handleInput(): void {
    this.setCurrentPage(this.page);
    if (this.page === 1) {
      this.post = this.arr.slice(0, 2);
    } else {
      this.post = this.arr.slice(2, 4);
    }
    this.$vuetify.goTo(this.getPostBannerHeight, {
      duration: 0,
      easing: 'easeInOutQuad'
    });
  }

  handleRouteChange(): void {
    if (this.$route.params.tagName) {
      this.parallax = {
        src: IndexSrc,
        title: `Tag: ${this.$route.params.tagName}`,
        motto: `too simple, sometimes naive.`
      };
      this.post = this.arr.filter(e =>
        e.tags.includes(this.$route.params.tagName)
      );
    } else {
      this.parallax = {
        src: IndexSrc,
        title: IndexTitle,
        motto: IndexMotto
      };
      this.handleInput();
    }
    this.$vuetify.goTo(0, {
      duration: 0,
      easing: 'easeInOutQuint'
    });
  }

  mounted(): void {
    this.page = this.getCurrentPage;
    this.handleInput();
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
