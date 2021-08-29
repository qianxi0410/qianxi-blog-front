<template>
  <div class="top_container">
    <Parallax
      blur
      :motto="parallax.motto"
      :src="parallax.src"
      :title="parallax.title"
    />
    <v-container class="about">
      <h1>Hello.</h1>
      <p style="font-weight: 500; font-size: 2.2em">My name is Liu Yihan :D.</p>
      <p>
        I am a senior student who is about to graduate from the Computer
        Department of Hainan University. After graduating from university, I
        will go to Northwestern Polytechnical University for postgraduate
        studies.
      </p>
      <p>
        In my spare time, I like to write some js/go code, all my code works are
        open source and pinned on
        <Link href="https://github.com/qianxi0410">GitHub</Link>. If you want,
        you can still contact me on
        <Link href="https://www.zhihu.com/people/qian-xi-8-12-94">ZhiHu</Link>.
      </p>
      <p>
        An interesting (maybe not) fact about me is that I like to use qianxi as
        my code name on the Internet, so if you see someone whose code name is
        qianxi(qianxi0410), there is a
        <Link href="https://taylorswift.fandom.com/wiki/13">13%</Link>
        chance that it is me.
      </p>
    </v-container>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import Parallax from '@/components/Parallax.vue';
import Link from '@/components/Link.vue';
import { AboutSrc, AboutTitle, AboutMotto, BlogName } from '@/config/index';

@Component({
  components: {
    Parallax,
    Link
  }
})
export default class About extends Vue {
  parallax = {
    src: AboutSrc,
    title: AboutTitle,
    motto: AboutMotto
  };

  // eslint-disable-next-line class-methods-use-this
  mounted(): void {
    document.title = `${BlogName} | About`;
  }
}
</script>

<style scoped>
@font-face {
  font-family: qianxifont;
  src: url('../font/FiraCode-Regular.ttf') ；;
}

.top_container {
  background-color: var(--v-secondary-base);
  color: var(--v-accent-base);
}

.about {
  font-family: qianxifont;
  font-size: calc(10px + 0.33vw);
  -webkit-font-smoothing: antialiased;
  padding: 5vh 10vw;
}

h1 {
  font-size: 4.5em;
  font-weight: 500;
  margin-bottom: 0;
}

p {
  font-size: 1.6em;
  font-weight: 300;
  line-height: 1.4;
  max-width: 28em;
}

::selection {
  background: wheat;
  color: var(--v-primary-base);
}
</style>
