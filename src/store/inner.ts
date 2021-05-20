// 无关api的数据流
import { VuexModule, Module, Mutation } from 'vuex-module-decorators';
import { BlogName } from '@/config/index';

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
}

export default Inner;
