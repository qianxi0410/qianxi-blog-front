<template>
  <v-container>
    <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item v-for="(item, i) in posts" :key="i" fill-dot>
        <template v-slot:opposite>
          <h3>{{ new Date(item.created_at).toLocaleDateString() }}</h3>
        </template>
        <template v-slot:icon>
          <v-avatar>
            <img src="@/assets/avatar.jpg" alt="qianxi" />
          </v-avatar>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="text-h6">
            {{ item.title }}
          </v-card-title>
          <v-card-text class="text--accent">
            <p>
              {{ item.description }}
            </p>
            <v-row>
              <v-col>
                <v-chip
                  class="mr-2"
                  v-for="(tag, idx) in item.tags.split('-')"
                  :key="idx"
                  @click="goToTagPage(tag)"
                >
                  {{ tag }}
                </v-chip>
              </v-col>
              <v-col cols="2" class="mr-5">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-0"
                      plain
                      @click="toPostDetail(item.id, item.title)"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-airplane</v-icon>
                    </v-btn>
                  </template>
                  <span>Read</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <v-row justify="center" class="my-1">
      <v-card-title v-if="showEndText">
        Congratulations, you have reached the end of the world :)
      </v-card-title>
      <v-progress-circular
        v-else
        :size="30"
        :color="$vuetify.theme.dark ? 'accent' : 'primary'"
        indeterminate
      ></v-progress-circular>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { namespace } from 'vuex-class';
import { getPosts, getPostsWithTag } from '../api/post';

const inner = namespace('inner');

// eslint-disable-next-line no-use-before-define
@Component<TimeLine>({
  watch: {
    $route(to: any, from: any): void {
      this.handleRouteChange();
    }
  }
})
export default class TimeLine extends Vue {
  posts = [] as Array<any>;

  page = 0;

  showEndText = false;

  @inner.Mutation('setBlogId') setBlogId!: (id: number) => void;

  toPostDetail(id: number, title: string): void {
    this.setBlogId(id);
    this.$router.push({ path: `/post/${title}` });
  }

  goToTagPage(tag: string): void {
    this.$router
      .push({ path: `/timeline/tag/${tag}` })
      .catch(() => console.log('you are already in this page!'));
  }

  nextPage(): void {
    this.page += 1;
    const { tagName } = this.$route.params;

    if (!tagName) {
      getPosts(this.page).then(res => {
        if (res.data === null) {
          window.removeEventListener('scroll', this.handleScroll);
          this.showEndText = true;
        } else {
          this.posts.push(...res.data);
        }
      });
    } else {
      getPostsWithTag(this.page, tagName).then(res => {
        if (res.data === null) {
          window.removeEventListener('scroll', this.handleScroll);
          this.showEndText = true;
        } else {
          this.posts.push(...res.data);
        }
      });
    }
  }

  handleRouteChange(): void {
    this.page = 0;
    this.posts = [];
    this.nextPage();
  }

  handleScroll(): void {
    if (
      (window.pageYOffset + window.innerHeight) / document.body.clientHeight >=
      0.99
    ) {
      this.nextPage();
    }
  }

  mounted(): void {
    this.nextPage();
    window.addEventListener('scroll', this.handleScroll);
  }
}
</script>
