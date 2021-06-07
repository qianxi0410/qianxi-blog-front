<template>
  <div class="">
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

@Component({
  props: {
    toc: {
      type: Array,
      required: true
    }
  }
})
export default class Toc extends Vue {
  goTo(id: string): void {
    console.log(id);

    this.$vuetify.goTo(`#${id}`, {
      duration: 500,
      easing: 'easeOutQuart'
    });
  }

  mounted(): void {
    console.log(this.$props.toc);
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
