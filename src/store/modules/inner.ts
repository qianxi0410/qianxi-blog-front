// 无关api的数据流

import { VuexModule, Module, Mutation } from 'vuex-module-decorators';
import { BlogName } from '@/config/index';

import { GitHubUserInfo } from '@/types/index';
@Module({ namespaced: true, name: 'inner' })
class Inner extends VuexModule {
  // 是否显示取色板
  public colorpickShow = false;

  @Mutation
  public toggleColorpick(): void {
    this.colorpickShow = !this.colorpickShow;
  }

  // 当前blog的id
  public blogId = -1;

  @Mutation
  public setBlogId(id: number): void {
    localStorage.setItem('blogId', id.toString());
    this.blogId = id;
  }

  get getBlogId(): number {
    if (this.blogId !== -1) {
      return this.blogId;
    }

    const id = localStorage.getItem('blogId') || -1;
    return Number(id);
  }

  // 当前页码
  public currentPage = -1;

  @Mutation
  public setCurrentPage(page: number) {
    localStorage.setItem('currentPage', page.toString());
    document.title = `${BlogName} | # ${page}`;
    this.currentPage = page;
  }

  get getCurrentPage(): number {
    if (this.currentPage !== -1) {
      document.title = `${BlogName} | # ${this.currentPage}`;
      return this.currentPage;
    }

    const currentPage = localStorage.getItem('currentPage') || 1;
    document.title = `${BlogName} | # ${currentPage}`;
    return Number(currentPage);
  }

  // 当前post-banner高度
  public postBannerHeight = -1;

  @Mutation
  public setPostBannerHeight(h: number) {
    this.postBannerHeight = h;
  }

  get getPostBannerHeight(): number {
    return this.postBannerHeight;
  }

  // 表达是否退
  public isBack = false;

  @Mutation
  public setIsBack(b: boolean) {
    this.isBack = b;
    if (b) {
      localStorage.setItem('isBack', 'true');
    } else {
      localStorage.setItem('isBack', 'false');
    }
  }

  get getIsBack(): boolean {
    const tmp = localStorage.getItem('isBack');

    return this.isBack && tmp === 'true';
  }

  // github用户信息
  public githubUser: GitHubUserInfo | undefined = undefined;

  @Mutation
  public setGithubUserInfo(u: GitHubUserInfo): void {
    this.githubUser = u;
    localStorage.setItem('githubUserInfo', JSON.stringify(u));
  }

  @Mutation
  public logout(): void {
    this.githubUser = undefined;
    localStorage.removeItem('githubUserInfo');
  }

  get getGitHubUserInfo(): GitHubUserInfo | undefined {
    if (this.githubUser !== undefined) {
      return this.githubUser;
    } else if (localStorage.getItem('githubUserInfo')) {
      return JSON.parse(
        localStorage.getItem('githubUserInfo')!
      ) as GitHubUserInfo;
    }
    return undefined;
  }
}

export default Inner;
