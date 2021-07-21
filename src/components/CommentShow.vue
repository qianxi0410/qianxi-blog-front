<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-icon class="mb-1">
          mdi-comment
        </v-icon>
        <v-divider></v-divider>
        <v-timeline dense v-if="comments.length > 0">
          <v-timeline-item v-for="n in comments" :key="n" color="primary">
            <v-card class="elevation-2 mt-1">
              <v-card-text>
                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
                scaevola imperdiet nec ut, sed euismod convenire principes at.
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
        <v-divider v-if="comments.length > 0"></v-divider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    comments: {
      type: Array,
      required: true
    }
  }
})
export default class CommentShow extends Vue {}
</script>

<style scoped>
::selection {
  background: wheat;
  color: var(--v-primary-base);
}
</style>
