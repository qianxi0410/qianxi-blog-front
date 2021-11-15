import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators';

import { systemInfo } from '@/api/system';
import { SystemInfo } from '@/types';

@Module({ namespaced: true })
class System extends VuexModule {
  private systemInfo: SystemInfo = {
    AVATAR: '',
    'BG-1-DARK': '',
    'BG-1-LIGHT': '',
    'BG-2-DARK': '',
    'BG-2-LIGHT': '',
    'BG-3-DARK': '',
    'BG-3-LIGHT': ''
  };

  @Mutation
  public SET_SYSTEMINFO(info: SystemInfo): void {
    this.systemInfo = info;
  }

  get AVATAR(): string {
    return this.systemInfo.AVATAR;
  }

  get INDEX_SRC(): string[] {
    return [this.systemInfo['BG-1-LIGHT'], this.systemInfo['BG-1-DARK']];
  }

  get TIMELINE_SRC(): string[] {
    return [this.systemInfo['BG-2-LIGHT'], this.systemInfo['BG-2-DARK']];
  }

  get ABOUT_SRC(): string[] {
    return [this.systemInfo['BG-3-LIGHT'], this.systemInfo['BG-3-DARK']];
  }

  @Action
  public getSystemInfo(): Promise<null> {
    return new Promise((resolve, reject) => {
      systemInfo()
        .then(response => {
          const { data: res } = response;
          this.context.commit('SET_SYSTEMINFO', res.data);
          resolve(null);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default System;
