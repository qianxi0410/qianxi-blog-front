<template>
  <div class="about">
    <Parallax :src="src" />
    <h1>This is an timeline page</h1>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import Parallax from '@/components/Parallax.vue';

@Component({
  components: {
    Parallax
  }
})
export default class TimeLine extends Vue {
  src = 'https://cdn.vuetifyjs.com/images/parallax/material.jpg';
}
</script>
