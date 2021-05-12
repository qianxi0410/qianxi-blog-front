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
import { TimeLineSrc } from '@/config/index';

@Component({
  components: {
    Parallax
  }
})
export default class TimeLine extends Vue {
  src = TimeLineSrc;
}
</script>
