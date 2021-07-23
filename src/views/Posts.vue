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
        :length="length"
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
import { IndexSrc, IndexTitle, IndexMotto, pageSize } from '@/config/index';
import { namespace } from 'vuex-class';
import {
  getPosts,
  getCount,
  getPostsWithTag,
  getCountWithTag
} from '../api/post';

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

  @inner.Getter('getIsBack') getIsBack!: boolean;

  parallax = {
    src: IndexSrc,
    title: IndexTitle,
    motto: IndexMotto
  };

  page = 1;

  post = [];

  length = -1;

  handleInput(): void {
    this.setCurrentPage(this.page);

    const { tagName } = this.$route.params;
    if (!tagName) {
      getPosts(this.page).then(res => {
        this.post = res.data;
      });
    } else {
      getPostsWithTag(this.page, tagName).then(res => {
        this.post = res.data;
      });
    }
    this.$vuetify.goTo(this.getPostBannerHeight, {
      duration: 0,
      easing: 'easeInOutQuad'
    });
  }

  handleRouteChange(): void {
    const { tagName } = this.$route.params;
    if (tagName) {
      this.parallax = {
        src: IndexSrc,
        title: `Tag: ${tagName}`,
        motto: `too simple, sometimes naive.`
      };
    } else {
      this.parallax = {
        src: IndexSrc,
        title: IndexTitle,
        motto: IndexMotto
      };
    }
    this.page = 1;
    this.handleInput();
    this.getLength();

    this.$vuetify.goTo(0, {
      duration: 0,
      easing: 'easeInOutQuint'
    });
  }

  getLength(): void {
    const { tagName } = this.$route.params;

    if (!tagName) {
      getCount().then(res => {
        const total = res.data;
        this.length =
          Math.floor(total / pageSize) + (total % pageSize === 0 ? 0 : 1);
      });
    } else {
      getCountWithTag(tagName).then(res => {
        const total = res.data;
        this.length =
          Math.floor(total / pageSize) + (total % pageSize === 0 ? 0 : 1);
      });
    }
  }

  mounted(): void {
    if (this.getIsBack) {
      this.page = this.getCurrentPage;
      const { tagName } = this.$route.params;
      if (tagName) {
        this.parallax = {
          src: IndexSrc,
          title: `Tag: ${tagName}`,
          motto: `too simple, sometimes naive.`
        };
      } else {
        this.parallax = {
          src: IndexSrc,
          title: IndexTitle,
          motto: IndexMotto
        };
      }
      this.handleInput();
      this.getLength();
    } else {
      this.handleRouteChange();
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
