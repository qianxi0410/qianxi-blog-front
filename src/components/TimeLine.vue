<template>
  <v-container>
    <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item v-for="(item, i) in items" :key="i" fill-dot>
        <template v-slot:opposite>
          <h3 class="">{{ item.publishDate }}</h3>
        </template>
        <template v-slot:icon>
          <v-avatar>
            <img src="@/assets/avatar.jpg" alt="qianxi" />
          </v-avatar>
        </template>
        <v-card class="elevation-4">
          <v-card-title class="text-h6">
            {{ item.title }}
          </v-card-title>
          <v-card-text class="text--accent">
            <p>
              {{ item.description }}
            </p>
            <v-row>
              <v-col>
                <v-chip class="mr-2" v-for="(tag, idx) in item.tags" :key="idx">
                  {{ tag }}
                </v-chip>
              </v-col>
              <v-col cols="2">
                <v-tooltip left>
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
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { namespace } from 'vuex-class';

const inner = namespace('inner');

@Component
export default class TimeLine extends Vue {
  items = [
    {
      id: 0,
      src: 'https://w.wallhaven.cc/full/z8/wallhaven-z8p9rj.jpg',
      title: 'promise.js简要实现',
      description: '简单实现了一个promise',
      publishDate: '2021-05-19',
      tags: ['vue', 'javascript']
    },
    {
      id: 1,
      src: 'https://w.wallhaven.cc/full/28/wallhaven-281d5y.png',
      title: 'promise.js简要实现2',
      description:
        '简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise',
      publishDate: '2021-05-20',
      tags: ['vue', 'javascript']
    },
    {
      id: 2,
      src: 'https://w.wallhaven.cc/full/rd/wallhaven-rddgwm.jpg',
      title: 'promise.js简要实现3',
      description: '简单实现了一个promise',
      publishDate: '2021-05-19',
      tags: ['vue', 'javascript']
    },
    {
      id: 3,
      src: 'https://w.wallhaven.cc/full/72/wallhaven-7232p9.jpg',
      title: 'promise.js简要实现4',
      description:
        '简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise简单实现了一个promise',
      publishDate: '2021-05-20',
      tags: ['vue', 'javascript']
    }
  ];

  @inner.Mutation('setBlogId') setBlogId!: (id: number) => void;

  toPostDetail(id: number, title: string): void {
    this.setBlogId(id);
    this.$router.push({ path: `/post/${title}` });
  }
}
</script>
