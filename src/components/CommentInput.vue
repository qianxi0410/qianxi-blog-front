<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="9">
        <v-textarea
          outlined
          placeholder="it is fine to keep silent, dear."
          name="comment-input"
          class="mt-10"
          clearable
          counter
          v-model="comment"
          clear-icon="mdi-close-circle"
          :color="$vuetify.theme.dark ? 'accent' : 'primary'"
          label="Leave a comment"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-n12">
      <v-col cols="9">
        <v-row justify="space-between">
          <v-col cols="4">
            <v-text-field
              label="Nickname"
              v-model="nickname"
              :color="$vuetify.theme.dark ? 'accent' : 'primary'"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :disabled="!submit"
                  class="mt-4"
                  :color="$vuetify.theme.dark ? 'accent' : 'primary'"
                  plain
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-share</v-icon>
                </v-btn>
              </template>
              <span>Share your comment</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { checkStr } from '../utils/checkStr';

// eslint-disable-next-line no-use-before-define
@Component<CommentInput>({
  computed: {
    submit(): boolean {
      return checkStr(this.nickname) && checkStr(this.comment);
    }
  }
})
export default class CommentInput extends Vue {
  nickname = '';

  comment = '';
}
</script>

<style scoped>
::selection {
  background: wheat;
  color: var(--v-primary-base);
}
</style>
