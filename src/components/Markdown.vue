<template>
  <div>
    <div class="dark" v-html="html" v-if="this.$vuetify.theme.dark"></div>
    <div class="light" v-html="html" v-else></div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import markdownItAnchor from 'markdown-it-anchor';
import 'highlight.js/styles/atom-one-dark.css';

export default {
  data() {
    return {
      html: 'loading ...'
    };
  },
  watch: {
    content() {
      this.markDownRender();
    }
  },
  props: {
    content: {
      type: String,
      require: true
    }
  },
  methods: {
    markDownRender() {
      const md = new MarkdownIt();

      const highlight = {
        highlight(str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              const preCode = hljs.highlight(lang, str, true).value;
              const lines = preCode.split(/\n/).slice(0, -1);
              let html = lines.map(item => `<li>${item}</li>`).join('');
              html = `<ol>${html}</ol>`;
              if (lines.length) {
                html += `<b class="name">${lang}</b>`;
              }
              return `<pre><code class="hljs">${html}</code></pre>`;
            } catch (__) {
              // to make eslint happy
            }
          }
          const preCode = md.utils.escapeHtml(str);
          const lines = preCode.split(/\n/).slice(0, -1);
          let html = lines.map(item => `<li>${item}</li>`).join('');
          html = `<ol>${html}</ol>`;
          return `<pre><code class="hljs">${html}</code></pre>`;
        }
      };
      md.set(highlight);
      md.use(markdownItAnchor, {
        permalink: true,
        permalinkSymbol: '#',
        permalinkBefore: true,
        permalinkClass: 'href',
        slugify: string => `${string.split(' ').join('-')}`
      });
      if (this.content !== undefined) {
        this.html = md.render(this.content);
      }
    }
  }
};
</script>

<style scoped src="../style/dark.css"></style>
<style scoped src="../style/light.css"></style>
