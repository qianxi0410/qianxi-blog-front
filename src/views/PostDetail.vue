<template>
  <div class="top_container">
    <PostBanner
      blur
      :description="post.description"
      :src="post.url"
      :title="post.title"
      :publishDate="new Date(post.created_at)"
      :key="post.id"
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
          <v-row>
            <v-col cols="10">
              <v-chip-group active-class="primary--text" column>
                <v-chip
                  v-for="tag in post.tags.split('-')"
                  :key="tag"
                  class="mr-3"
                >
                  {{ tag }}
                </v-chip>
              </v-chip-group>
            </v-col>
            <v-col>
              <v-btn
                @click="back"
                fab
                small
                rounded
                color="primary"
                class="mt-1"
              >
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <div class="mt-10">
            <Markdown id="markdown" :content="content" />
          </div>
        </v-col>
        <v-col
          v-if="this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl"
        >
          <Toc :toc="toc" />
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row justify="center" class="py-5">
        <v-avatar class="elevation-3">
          <img src="../assets/avatar.jpg" alt="qianxi" />
        </v-avatar>
        <v-chip draggable class="ml-2" @click="go">
          本文采用CC BY 4.0协议
        </v-chip>
      </v-row>
      <v-row justify="center" class="pb-5">
        Last edit at: {{ new Date(post.updated_at).toDateString() }}
      </v-row>
      <v-row class="pb-5 d-flex justify-space-around">
        <v-btn
          rounded
          :color="this.$vuetify.theme.dark ? 'accent' : 'primary'"
          plain
          v-if="post.pre !== -1"
          @click="changePost(post.pre)"
        >
          <v-icon>mdi-menu-left</v-icon> {{ post.pre_title }}
        </v-btn>
        <span v-else></span>
        <v-btn
          rounded
          :color="this.$vuetify.theme.dark ? 'accent' : 'primary'"
          plain
          v-if="post.next !== -1"
          @click="changePost(post.next)"
        >
          {{ post.next_title }} <v-icon>mdi-menu-right</v-icon>
        </v-btn>
        <span v-else></span>
      </v-row>
    </v-container>
    <v-container>
      <CommentShow :comments="post.comments" @delete="handleDelete" />
      <CommentInput @add="handleAdd" />
    </v-container>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import PostBanner from '@/components/PostBanner.vue';
import Markdown from '@/components/Markdown.vue';
import CommentShow from '@/components/CommentShow.vue';
import CommentInput from '@/components/CommentInput.vue';
import Toc from '@/components/Toc.vue';
import { namespace } from 'vuex-class';
import { BlogName } from '@/config/index';
import { getPost } from '../api/post';

const inner = namespace('inner');

@Component({
  components: {
    PostBanner,
    Markdown,
    Toc,
    CommentShow,
    CommentInput
  }
})
export default class PostsDetail extends Vue {
  @inner.Getter('getBlogId') getBlogId!: number;

  @inner.Mutation('setBlogId') setBlogId!: (id: number) => void;

  @inner.Mutation('setIsBack') setIsBack!: (b: boolean) => void;

  post = {
    tags: '',
    title: '',
    path: '',
    comments: [] as any[]
  };

  content = '';

  toc: Array<{ level: string; hook: string; title: string }> = [];

  handleDelete(id: string): void {
    this.post.comments = this.post.comments.filter(e => (e as any).id !== id);
  }

  handleAdd(comment: any): void {
    this.post.comments.push(comment);
  }

  back(): void {
    this.$router.push({ path: `/posts` });
  }

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
            hook: ((e as any) as { id: string }).id,
            title: e.textContent!.slice(2)
          });
        }
      });
    });
  }

  changePost(id: number): void {
    this.setBlogId(id);
    this.$vuetify.goTo(0, {
      easing: 'easeInOutQuart',
      duration: 0
    });
    getPost(this.getBlogId).then(res => {
      this.post = res.data;
      this.content = res.data.path;
      document.title = `${BlogName} | ${
        (this.post as { title: string }).title
      }`;
      this.toc = [];
      this.getToc();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  go(): void {
    window.open('https://creativecommons.org/licenses/by/4.0/');
  }

  mounted(): void {
    this.setIsBack(true);
    this.changePost(this.getBlogId);
  }
}
</script>

<style lang="css" scoped>
.top_container {
  background-color: var(--v-secondary-base);
  color: var(--v-accent-base);
}
</style>
