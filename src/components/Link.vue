<template>
  <a
    :href="href"
    target="_blank"
    :class="this.$vuetify.theme.dark ? 'dark' : 'light'"
  >
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
.light {
  text-decoration: none;
  color: var(--v-accent-base);
  position: relative;
}

.light:after {
  content: '';
  position: absolute;
  top: 60%;
  left: -0.1em;
  right: -0.1em;
  bottom: 0;
  transition: top 200ms cubic-bezier(0, 0.8, 0.13, 1);
  background-color: var(--v-primary-base);
  opacity: 0.2;
  margin-right: 0.1rem;
  margin-left: 0.1rem;
}

.light:hover:after {
  top: 0%;
}

.dark {
  text-decoration: none;
  color: var(--v-accent-base);
  position: relative;
}

.dark:after {
  content: '」';
  color: wheat;
  opacity: 0.4;
  transition: all 0.3s ease;
}

.dark:before {
  content: '「';
  color: wheat;
  opacity: 0.4;
  transition: all 0.3s ease;
}

.dark:hover:after {
  opacity: 1;
}

.dark:hover:before {
  opacity: 1;
}
</style>
