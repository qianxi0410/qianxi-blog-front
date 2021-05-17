<template>
  <div class="top_container">
    <Parallax
      blur
      :motto="parallax.motto"
      :src="parallax.src"
      :title="parallax.title"
    />
    <v-container>
      <PostCard
        src="https://images.wallpaperscraft.com/image/sea_boat_rock_207575_1280x720.jpg"
      />
      <PostCard
        src="https://images.wallpaperscraft.com/image/sea_boat_silhouette_169414_1600x1200.jpg"
      />
      <PostCard
        src="https://images.wallpaperscraft.com/image/deer_planet_art_129712_1280x720.jpg"
      />
      <PostCard />
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
