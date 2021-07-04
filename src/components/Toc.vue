<template>
  <div
    :class="this.$vuetify.theme.dark ? 'dark' : 'light'"
    class="toc"
    ref="toc"
  >
    <ul class="ul">
      <li
        v-for="(item, index) in $props.toc"
        :key="index"
        :class="[
          `pl-${(Number(item.level) - 2) * 3}`,
          activeIndex === index ? 'li-active' : ''
        ]"
        class="mb-1"
        @click="goTo(item.hook, index)"
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
  activeIndex = -1;

  @inner.Getter('getPostBannerHeight') getPostBannerHeight!: number;

  goTo(id: string, index: number): void {
    this.$vuetify.goTo(`#${id}`, {
      duration: 500,
      easing: 'easeOutQuart'
    });
    this.activeIndex = index;
  }
}
</script>

<style scoped>
ul li {
  list-style: none;
  cursor: pointer;
  position: relative;
}

.ul {
  width: 100%;
  font-size: 0.8em;
  margin-top: 2em;
  width: fit-content;
  box-sizing: content-box;
}

.toc {
  position: -webkit-sticky;
  position: sticky;
  top: 2em;
}

.light li:hover {
  text-decoration: none;
  color: var(--v-primary-base);
}
.dark li:hover {
  text-decoration: none;
  color: navajowhite;
}

.dark .li-active {
  color: navajowhite;
}

.dark .li-active::before {
  content: '>';
  color: navajowhite;
  position: absolute;
  left: -1em;
}

.light .li-active {
  color: var(--v-primary-base);
}

.light .li-active::before {
  content: '>';
  color: var(--v-primary-base);
  position: absolute;
  left: -1em;
}
</style>
