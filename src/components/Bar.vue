<template>
  <div>
    <v-navigation-drawer v-model="mobile.drawer" v-if="isMobile" app>
      <v-list nav dense>
        <v-list-item-group active-class="primary--text text--accent-4">
          <v-list-item @click="toPosts">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Posts</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toTimeLine">
            <v-list-item-icon>
              <v-icon>mdi-antenna</v-icon>
            </v-list-item-icon>
            <v-list-item-title>TimeLine</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toAbout">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" class="accent--text" ref="bar">
      <div>
        <v-toolbar-title class="ml-3">{{ blogName }}</v-toolbar-title>
      </div>

      <v-avatar class="ml-6">
        <img :src="AVATAR" alt="qianxi" />
      </v-avatar>

      <v-spacer></v-spacer>

      <v-slide-y-transition>
        <v-tabs
          v-if="!isMobile"
          active-class="accent--text"
          right
          class="mr-10"
        >
          <v-tabs-slider color="white" />
          <v-tab @click="toPosts">Posts</v-tab>
          <v-tab to="/timeline">TimeLine</v-tab>
          <v-tab to="/about">About</v-tab>
        </v-tabs>
      </v-slide-y-transition>

      <v-fab-transition>
        <v-app-bar-nav-icon
          v-if="isMobile"
          @click="mobile.drawer = !mobile.drawer"
        />
      </v-fab-transition>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { BlogName } from '@/config/index';
import { namespace } from 'vuex-class';
import { SystemInfo } from '@/types';

const inner = namespace('inner');
const system = namespace('system');

@Component
export default class Bar extends Vue {
  mobile = {
    drawer: null
  };

  blogName = BlogName;

  @inner.Mutation('setIsBack') setIsBack!: (b: boolean) => void;

  @system.Getter('AVATAR') AVATAR!: string;

  get isMobile(): boolean {
    return this.$vuetify.breakpoint.xs;
  }

  toAbout(): void {
    this.$router.push({ path: '/about' }).catch(err => {
      console.log(`%c ${err}`, 'color: pink; font-size: 15px;');
    });
  }

  toPosts(): void {
    this.setIsBack(false);
    this.$router.push({ path: '/posts' }).catch(err => {
      console.log(`%c ${err}`, 'color: pink; font-size: 15px;');
    });
  }

  toTimeLine(): void {
    this.$router.push({ path: '/timeline' }).catch(err => {
      console.log(`%c ${err}`, 'color: pink; font-size: 15px;');
    });
  }
}
</script>
