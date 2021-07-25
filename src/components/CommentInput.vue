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
          disabled
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
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="login"
                  v-bind="attrs"
                  v-on="on"
                  plain
                  rounded
                  class="mt-4"
                >
                  <v-icon>mdi-github</v-icon>
                </v-btn>
              </template>
              <span>Login With GitHub</span>
            </v-tooltip>
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
import { github } from '@/config';
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

  // eslint-disable-next-line class-methods-use-this
  login(): void {
    window.localStorage.preventHref = window.location.href;
    window.location.href = `${github.oauth_uri}?client_id=${github.client_id}&redirect_uri=${window.location}`;
  }
}
</script>

<style scoped>
::selection {
  background: wheat;
  color: var(--v-primary-base);
}
</style>
