<template>
  <div>
    <div class="dark" v-html="content" v-if="this.$vuetify.theme.dark"></div>
    <div class="light" v-html="content" v-else></div>
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
      content: ''
    };
  },

  mounted() {
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
    md.use(markdownItAnchor, {});
    const tokens = md.render(`
> this is this is this is this is this is this is this is this is this is this is this is this is this is this is this is this is this is this is 

# csrf attack

## Overview

**Cross-Site Request Forgery (CSRF)跨站请求伪造** \`is an attack that forces\` an end user to execute unwanted actions on a web application in which they’re currently authenticated. With a little help of social engineering (such as sending a link via email or chat), an attacker may trick the users of a web application into executing actions of the attacker’s choosing. If the victim is a normal user, a successful CSRF attack can force the user to perform state changing requests like transferring funds, changing their email address, and so forth. If the victim is an administrative account, CSRF can compromise the entire web application.

## Description

\`\`\`go
import "fmt"

func main() {
  fmt.Println("hello world")
  ch := make(chan int)
  go func() {
    ch <- 1
  }()
}
\`\`\`

CSRF is an attack that tricks the victim into submitting a malicious request. It inherits the identity and privileges of the victim to perform an undesired function on the victim’s behalf. For most sites, browser requests automatically include any credentials associated with the site, such as the user’s session cookie, IP address, Windows domain credentials, and so forth. Therefore, if the user is currently authenticated to the site, the site will have no way to distinguish between the forged request sent by the victim and a legitimate request sent by the victim.

CSRF attacks target functionality that causes a state change on the server, such as changing the victim’s email address or password, or purchasing something. Forcing the victim to retrieve data doesn’t benefit an attacker because the attacker doesn’t receive the response, the victim does. As such, CSRF attacks target state-changing requests.

\`It’s sometimes possible to store the CSRF attack on the vulnerable site itself.\` Such vulnerabilities are called “stored CSRF flaws”. This can be accomplished by simply storing an IMG or IFRAME tag in a field that accepts HTML, or by a more complex cross-site scripting attack. If the attack can store a CSRF attack in the site, the severity of the attack is amplified. In particular, the likelihood is increased because the victim is more likely to view the page containing the attack than some random page on the Internet. The likelihood is also increased because the victim is sure to be authenticated to the site already.

### Synonyms

CSRF attacks are also known by a number of other names, including XSRF, “Sea Surf”, Session Riding, Cross-Site Reference Forgery, and Hostile Linking. Microsoft refers to this type of attack as a One-Click attack in their threat modeling process and many places in their online documentation.

## Prevention measures that do **NOT** work

### Using a secret cookie

Remember that all cookies, even the _secret_ ones, will be submitted with every request. All authentication tokens will be submitted regardless of whether or not the end-user was tricked into submitting the request. Furthermore, session identifiers are simply used by the application container to associate the request with a specific session object. The session identifier does not verify that the end-user intended to submit the request.

### Only accepting POST requests

Applications can be developed to only accept POST requests for the execution of business logic. The misconception is that since the attacker cannot construct a malicious link, a CSRF attack cannot be executed. Unfortunately, this logic is incorrect. There are numerous methods in which an attacker can trick a victim into submitting a forged POST request, such as a simple form hosted in an attacker’s Website with hidden values. This form can be triggered automatically by JavaScript or can be triggered by the victim who thinks the form will do something else.

![132132](https://w.wallhaven.cc/full/l3/wallhaven-l3zmwy.jpg)


A number of flawed ideas for defending against CSRF attacks have been developed over time. Here are a few that we recommend you avoid.

### Multi-Step Transactions

Multi-Step transactions are not an adequate prevention of CSRF. As long as an attacker can predict or deduce each step of the completed transaction, then CSRF is possible.

### URL Rewriting

This might be seen as a useful CSRF prevention technique as the attacker cannot guess the victim’s session ID. However, the user’s session ID is exposed in the URL. We don’t recommend fixing one security flaw by introducing another.

### HTTPS

HTTPS by itself does nothing to defend against CSRF.

However, HTTPS should be considered a prerequisite for any preventative measures to be trustworthy.

### Examples

#### How does the attack work?

There are numerous ways in which an end user can be tricked into loading information from or submitting information to a web application. In order to execute an attack, we must first understand how to generate a valid malicious request for our victim to execute. Let us consider the following example: Alice wishes to transfer $100 to Bob using the _bank.com_ web application that is vulnerable to CSRF. Maria, an attacker, wants to trick Alice into sending the money to Maria instead. The attack will comprise the following steps:

1.  Building an exploit URL or script
  - this
  - this this
  - this is two
2.  Tricking Alice into executing the action with [Social Engineering](<https://en.wikipedia.org/wiki/Social_engineering_(security)>)
#### GET scenario

If the application was designed to primarily use GET requests to transfer parameters and execute actions, the money transfer operation might be reduced to a request like:


Maria now decides to exploit this web application vulnerability using Alice as the victim. Maria first constructs the following exploit URL which will transfer $100,000 from Alice’s account to Maria’s account. Maria takes the original command URL and replaces the beneficiary name with herself, raising the transfer amount significantly at the same time:


The [social engineering](<https://en.wikipedia.org/wiki/Social_engineering_(security)>) aspect of the attack tricks Alice into loading this URL when Alice is logged into the bank application. This is usually done with one of the following techniques:

-   sending an unsolicited email with HTML content
-   planting an exploit URL or script on pages that are likely to be visited by the victim while they are also doing online banking

The exploit URL can be disguised as an ordinary link, encouraging the victim to click it:


Or as a 0x0 fake image:

If this image tag were included in the email, Alice wouldn’t see anything. However, the browser _will still_ submit the request to bank.com without any visual indication that the transfer has taken place.

A real life example of CSRF attack on an application using GET was a [uTorrent exploit](https://www.ghacks.net/2008/01/17/dos-vulnerability-in-utorrent-and-bittorrent/) from 2008 that was used on a mass scale to download malware.

#### POST scenario

The only difference between GET and POST attacks is how the attack is being executed by the victim. Let’s assume the bank now uses POST and the vulnerable request looks like this:


Such a request cannot be delivered using standard A or IMG tags, but can be delivered using a FORM tags:


This form will require the user to click on the submit button, but this can be also executed automatically using JavaScript:

#### Other HTTP methods

Modern web application APIs frequently use other HTTP methods, such as PUT or DELETE. Let’s assume the vulnerable bank uses PUT that takes a JSON block as an argument:


Such requests can be executed with JavaScript embedded into an exploit page:


Fortunately, this request will **not** be executed by modern web browsers thanks to [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy) restrictions. This restriction is enabled by default unless the target web site explicitly opens up cross-origin requests from the attacker’s (or everyone’s) origin by using [CORS](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html) with the following header:


[美团关于 csrf 的文章](https://tech.meituan.com/2018/10/11/fe-security-csrf.html)`);
    this.content = tokens;
  }
};
</script>

<style scoped src="../style/dark.css"></style>
<style scoped src="../style/light.css"></style>
