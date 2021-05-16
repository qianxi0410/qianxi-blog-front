import Vue from 'vue';
import { colors } from 'vuetify/lib';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        // 主体配色
        primary: colors.blue.darken1,
        // 文字背景色
        // secondary: '#f5f5f5',
        secondary: '#EAEAEF',
        // 文字颜色
        accent: '#121314'
      },
      dark: {
        primary: '#1C1E26',
        secondary: '#1C1E26',
        accent: '#BECDDA'
      }
    }
  }
});
