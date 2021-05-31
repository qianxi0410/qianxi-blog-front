<template>
  <div class="">
    <ul class="ul">
      <li
        v-for="(item, index) in $props.toc"
        :key="index"
        :class="`pl-${(Number(item.level) - 2) * 3}`"
        class="mb-1"
      >
        <a
          :href="`#${item.hook}`"
          :class="$vuetify.theme.dark ? 'dark-a' : 'light-a'"
          class="v-toc-link d-block transition-swing text-decoration-none"
          >{{ item.hook }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({
  props: {
    toc: {
      type: Array,
      required: true
    }
  }
})
export default class Toc extends Vue {
  mounted(): void {
    console.log(this.$props.toc);
  }
}
</script>

<style scoped>
ul li {
  list-style: none;
}

.ul {
  width: 100%;
  font-size: 1em;
}

.light-a {
  text-decoration: none;
  color: var(--v-primary-base);
}
.dark-a {
  text-decoration: none;
  color: navajowhite;
}
</style>
