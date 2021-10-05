<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="9">
        <v-textarea
          outlined
          placeholder="it is fine to keep silent, dear."
          name="comment-input"
          class="mt-10"
          :disabled="info.name === ''"
          counter
          :rules="rules"
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
          <v-col cols="7">
            <v-menu
              bottom
              min-width="200px"
              rounded
              offset-x
              v-if="info.name !== ''"
            >
              <template v-slot:activator="{ on }">
                <v-btn icon x-large v-on="on">
                  <v-avatar size="50">
                    <img :src="info.avatar" />
                  </v-avatar>
                </v-btn>
              </template>
              <v-card>
                <v-list-item-content class="justify-center">
                  <div class="mx-auto text-center">
                    <v-avatar color="brown">
                      <img :src="info.avatar" />
                    </v-avatar>
                    <h3>{{ info.name }}</h3>
                    <p class="text-caption mt-1">
                      {{ info.login }}
                    </p>
                    <v-divider class="my-3"></v-divider>
                    <v-btn depressed @click="logout" rounded text>
                      Logout
                    </v-btn>
                  </div>
                </v-list-item-content>
              </v-card>
            </v-menu>
            <v-tooltip top v-else>
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
                  @click="saveComment"
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
    <v-snackbar v-model="snackbar" color="primary" rounded="pill">
      Comment Success

      <template :timeout="-1" v-slot:action="{ attrs }">
        <v-btn color="accent" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { github } from '@/config';
import { namespace } from 'vuex-class';
import { checkStr } from '../utils/checkStr';
import { getQueryVariable } from '../utils/getQueryVariable';
import { getUserInfo } from '../api/oauth2';
import { GitHubUserInfo, Comment } from '../types/index';
import { saveComment } from '../api/comment';

const inner = namespace('inner');

@Component
export default class CommentInput extends Vue {
  comment = '';

  snackbar = false;

  rules = [(v: string | any[]): boolean => v.length <= 255];

  info: GitHubUserInfo = {
    name: '',
    avatar: '',
    login: ''
  };

  get submit(): boolean {
    return (
      checkStr(this.comment) &&
      this.info.name !== '' &&
      this.comment.length <= 255
    );
  }

  @inner.Getter('getGitHubUserInfo') getGitHubUserInfo!:
    | GitHubUserInfo
    | undefined;

  @inner.Getter('getBlogId') getBlogId!: number;

  @inner.Mutation('setGithubUserInfo') setGithubUserInfo!: (
    u: GitHubUserInfo
  ) => void;

  @inner.Mutation('logout') userLogout!: () => void;

  saveComment(): void {
    const comment: Comment = {
      id: -1,
      post_id: this.getBlogId,
      content: this.comment,
      created_at: new Date(),
      updated_at: new Date(),
      ...this.info
    };
    saveComment(comment).then(res => {
      this.comment = '';
      this.snackbar = true;

      comment.id = res.data;
      this.$emit('add', {
        ...comment
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  login(): void {
    window.location.href = `${github.oauth_uri}?client_id=${github.client_id}&redirect_uri=${window.location}`;
  }

  logout(): void {
    this.info = {
      name: '',
      avatar: '',
      login: ''
    };
    this.userLogout();
  }

  getCommentDetail(): void {
    const code: string | undefined = getQueryVariable('code');
    if (!code || code === undefined) {
      if (this.getGitHubUserInfo !== undefined) {
        this.info = this.getGitHubUserInfo;
      }
      return;
    }
    let url = window.location.href;
    url = url.replace(/(\?|#)[^'"]*/, '');
    window.history.pushState({}, '0', url);
    getUserInfo(code).then(res => {
      const obj = JSON.parse(res.data);
      this.info = obj as GitHubUserInfo;
      this.setGithubUserInfo({
        name: obj.name as string,
        avatar: obj.avatar_url as string,
        login: obj.login as string
      } as GitHubUserInfo);
    });
  }

  mounted(): void {
    this.getCommentDetail();
  }
}
</script>

<style scoped>
::selection {
  background: wheat;
  color: var(--v-primary-base);
}
</style>
