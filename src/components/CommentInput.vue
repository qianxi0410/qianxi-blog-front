<template>
  <v-textarea
    outlined
    name="comment-input"
    class="my-10 mx-10"
    clearable
    counter
    clear-icon="mdi-close-circle"
    color="accent"
    label="Leave a comment"
  ></v-textarea>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class CommentInput extends Vue {}
</script>
