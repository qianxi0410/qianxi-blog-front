<template>
  <div class="toc" ref="toc">
    <ul class="ul">
      <li
        v-for="(item, index) in this.toc"
        :key="index"
        :class="[`pl-${(Number(item.level) - 2) * 3}`]"
        class="mb-1"
      >
        <a :href="`#${item.hook}`">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Tocs } from '@/types';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const inner = namespace('inner');

@Component
export default class Toc extends Vue {
  activeIndex = -1;

  @inner.Getter('getPostBannerHeight') getPostBannerHeight!: number;

  @Prop({ type: Array, required: true }) toc!: Array<Tocs>;
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
  font-size: 0.7em;
  margin-top: 2em;
  width: fit-content;
  box-sizing: content-box;
}

.toc {
  position: -webkit-sticky;
  position: sticky;
  top: 2em;
}

a {
  text-decoration: none;
  color: var(--v-accent);
}
</style>
