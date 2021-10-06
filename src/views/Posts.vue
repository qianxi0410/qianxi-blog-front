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
    <v-row justify="center" v-if="length > 0" class="mb-10 mt-n10">
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
import { Vue, Component, Watch } from 'vue-property-decorator';
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

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
]);

@Component({
  components: {
    Parallax,
    PostCard
  }
})
export default class Posts extends Vue {
  @inner.Mutation('setCurrentPage') setCurrentPage!: (page: number) => void;

  @inner.Getter('getCurrentPage') getCurrentPage!: number;

  @inner.Getter('getPostBannerHeight') getPostBannerHeight!: number;

  @inner.Getter('getIsBack') getIsBack!: boolean;

  @Watch('$route')
  onRouteChange(): void {
    this.handleRouteChange();
  }

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

    if (!this.getIsBack) {
      this.page = 1;
    } else {
      this.page = this.getCurrentPage;
    }

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
        const total: number = res.data;
        this.length =
          Math.floor(total / pageSize) + (total % pageSize === 0 ? 0 : 1);
      });
    }
  }

  mounted(): void {
    this.handleRouteChange();
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
