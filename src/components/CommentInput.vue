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
            <v-avatar @click="logout" size="50" v-if="info.name !== ''">
              <img :src="info.avatar" />
            </v-avatar>
            <span class="ml-2" v-if="info.name !== ''">{{ info.name }}</span>
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
import { namespace } from 'vuex-class';
import { checkStr } from '../utils/checkStr';
import { getQueryVariable } from '../utils/getQueryVariable';
import { getUserInfo } from '../api/oauth2';
import { GitHubUserInfo } from '../types/index';

const inner = namespace('inner');
// eslint-disable-next-line no-use-before-define
@Component<CommentInput>({
  computed: {
    submit(): boolean {
      return checkStr(this.comment) && this.info.name !== '';
    }
  }
})
export default class CommentInput extends Vue {
  comment = '';

  info: GitHubUserInfo = {
    name: '',
    avatar: '',
    login: ''
  };

  @inner.Getter('getGitHubUserInfo') getGitHubUserInfo!:
    | GitHubUserInfo
    | undefined;

  @inner.Mutation('setGithubUserInfo') setGithubUserInfo!: (
    u: GitHubUserInfo
  ) => void;

  @inner.Mutation('logout') userLogout!: () => void;

  // eslint-disable-next-line class-methods-use-this
  login(): void {
    window.location.href = `${github.oauth_uri}?client_id=${github.client_id}&redirect_uri=${window.location}`;
  }

  // eslint-disable-next-line class-methods-use-this
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
