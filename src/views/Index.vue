<template>
  <div class="top_container">
    <Parallax
      blur
      :motto="parallax.motto"
      :src="parallax.src"
      :title="parallax.title"
    />
    <v-container>
      <PostCard :post="item" v-for="item in post" :key="item" />
    </v-container>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import Parallax from '@/components/Parallax.vue';
import PostCard from '@/components/PostCard.vue';
import { IndexSrc, IndexTitle, IndexMotto } from '@/config/index';

@Component({
  components: {
    Parallax,
    PostCard
  }
})
export default class Index extends Vue {
  parallax = {
    src: IndexSrc,
    title: IndexTitle,
    motto: IndexMotto
  };

  post = [
    {
      src:
        'https://images.wallpaperscraft.com/image/sea_boat_rock_207575_1280x720.jpg',
      title: 'promise.js简要实现',
      description: '简单实现了一个promise',
      publishDate: '2021-05-19',
      tags: ['vue', 'javascript']
    },
    {
      src:
        'https://images.wallpaperscraft.com/image/sea_boat_rock_207575_1280x720.jpg',
      title: 'promise.js简要实现2',
      description: '简单实现了一个promise',
      publishDate: '2021-05-20',
      tags: ['vue', 'javascript']
    }
  ];
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
