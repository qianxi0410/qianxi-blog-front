<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-icon class="mb-1">
          mdi-comment
        </v-icon>
        <v-divider></v-divider>
        <v-timeline dense v-if="comments.length > 0">
          <v-timeline-item
            v-for="(comment, index) in comments"
            :key="index"
            color="primary"
          >
            <template v-slot:icon>
              <v-menu bottom min-width="200px" rounded offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn icon x-large v-on="on">
                    <v-avatar size="50">
                      <img :src="comment.avatar" />
                    </v-avatar>
                  </v-btn>
                </template>
                <v-card>
                  <v-list-item-content class="justify-center">
                    <div class="mx-auto text-center">
                      <v-avatar color="brown">
                        <img :src="comment.avatar" />
                      </v-avatar>
                      <v-divider class="my-3"></v-divider>
                      <h4 class="link" @click="toGitHub(comment.login)">
                        {{ comment.name }}
                      </h4>
                    </div>
                  </v-list-item-content>
                </v-card>
              </v-menu>
            </template>
            <v-card class="elevation-3 mt-1 d-inline-flex">
              <v-card-text>
                {{ comment.content }}
              </v-card-text>
              <v-btn
                v-if="
                  getGitHubUserInfo !== undefined &&
                    getGitHubUserInfo.login === comment.login
                "
                class="mt-2"
                plain
                @click="deleteComment(comment.id)"
                ><v-icon>mdi-delete</v-icon></v-btn
              >
            </v-card>
          </v-timeline-item>
        </v-timeline>
        <v-divider v-if="comments.length > 0"></v-divider>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" color="primary" rounded="pill">
      Delete Success

      <template :timeout="-1" v-slot:action="{ attrs }">
        <v-btn color="accent" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { namespace } from 'vuex-class';
import { GitHubUserInfo } from '../types/index';
import { deleteComment } from '../api/comment';

const inner = namespace('inner');
@Component({
  props: {
    comments: {
      type: Array,
      required: true
    }
  }
})
export default class CommentShow extends Vue {
  snackbar = false;

  @inner.Getter('getGitHubUserInfo') getGitHubUserInfo!:
    | GitHubUserInfo
    | undefined;

  deleteComment(id: string): void {
    deleteComment(id).then(res => {
      this.snackbar = true;
      this.$emit('delete', id);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  toGitHub(login: string): void {
    window.location.href = `https://github.com/${login}`;
  }
}
</script>

<style scoped>
::selection {
  background: wheat;
  color: var(--v-primary-base);
}

.link {
  cursor: pointer;
}
</style>
