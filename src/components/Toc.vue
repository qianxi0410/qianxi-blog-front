<template>
  <div :class="this.$vuetify.theme.dark ? 'dark' : 'light'" ref="toc">
    <ul class="ul">
      <li
        v-for="(item, index) in $props.toc"
        :key="index"
        :class="`pl-${(Number(item.level) - 2) * 3}`"
        class="mb-1"
        @click="goTo(item.hook)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { namespace } from 'vuex-class';

const inner = namespace('inner');

@Component({
  props: {
    toc: {
      type: Array,
      required: true
    }
  }
})
export default class Toc extends Vue {
  @inner.Getter('getPostBannerHeight') getPostBannerHeight!: number;

  goTo(id: string): void {
    this.$vuetify.goTo(`#${id}`, {
      duration: 500,
      easing: 'easeOutQuart'
    });
  }

  toggleTocClass(): void {
    if (
      window.pageYOffset >= this.getPostBannerHeight &&
      this.$refs.toc !== undefined
    ) {
      (this.$refs.toc as Element).classList.add('toc');
    } else if (this.$refs.toc !== undefined) {
      (this.$refs.toc as Element).classList.remove('toc');
    }
  }

  mounted(): void {
    window.addEventListener('scroll', this.toggleTocClass);
  }

  destroyed(): void {
    window.removeEventListener('scroll', this.toggleTocClass);
  }
}
</script>

<style scoped>
ul li {
  list-style: none;
  cursor: pointer;
}

.ul {
  width: 100%;
  font-size: 0.7em;
}

.toc {
  position: fixed;
  right: 8em;
  top: 4em;
}

.light li:hover {
  text-decoration: none;
  color: var(--v-primary-base);
}
.dark li:hover {
  text-decoration: none;
  color: navajowhite;
}
</style>
