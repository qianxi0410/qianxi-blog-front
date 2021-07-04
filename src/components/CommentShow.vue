<template>
  <div>
    <v-timeline dense>
      <v-timeline-item
        v-for="n in 5"
        :key="n"
        color="primary"
        class="timeline_item"
      >
        <v-card class="elevation-2 mt-1">
          <v-card-text>
            Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola
            imperdiet nec ut, sed euismod convenire principes at.
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class CommentShow extends Vue {}
</script>

<style scoped>
.timeline_item {
  padding-right: 2em;
}
</style>
