<template>
  <div id="container">
    <v-row justify="center">
      <v-img
        src="../../public/auth.gif"
        width="100px"
        height="100px"
        class="img"
      >
        <h3>
          You have completed the certification, please click here to return to
          the blog
        </h3>
      </v-img>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { getQueryVariable } from '../utils/getQueryVariable';

@Component
export default class GithubLogin extends Vue {
  // eslint-disable-next-line class-methods-use-this
  mounted(): void {
    const code: string | undefined = getQueryVariable('code');
  }
}
</script>

<style scoped>
#container {
  overflow: hidden;
}

.img {
  width: 100px;
}
</style>
