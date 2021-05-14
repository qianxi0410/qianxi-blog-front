// 无关api的数据流
export interface Inner {
  colorpickShow: boolean;
}

export const inner = {
  namespaced: true,
  state(): Inner {
    return {
      colorpickShow: false
    };
  },
  mutations: {
    toggleColorpick(state: Inner): void {
      state.colorpickShow = !state.colorpickShow;
    }
  }
};
