<template>
  <a :href="href" target="_blank">
    <slot></slot>
  </a>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({
  props: {
    href: {
      type: String,
      required: true
    }
  }
})
export default class Link extends Vue {}
</script>

<style scoped>
a {
  text-decoration: none;
  color: var(--v-accent-base);
  position: relative;
  margin-left: 0.3em;
  margin-right: 0.3em;
}
a:after {
  content: '';
  position: absolute;
  top: 60%;
  left: -0.1em;
  right: -0.1em;
  bottom: 0;
  transition: top 200ms cubic-bezier(0, 0.8, 0.13, 1);
  background-color: var(--v-primary-base);
  opacity: 0.2;
}
a:hover:after {
  top: 0%;
}
</style>
