// 无关api的数据流
import { VuexModule, Module, Mutation } from 'vuex-module-decorators';

@Module({ namespaced: true, name: 'inner' })
class Inner extends VuexModule {
  public colorpickShow = false;

  @Mutation
  public toggleColorpick(): void {
    this.colorpickShow = !this.colorpickShow;
  }
}

export default Inner;
