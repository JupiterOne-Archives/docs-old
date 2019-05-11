'use strict';

const fs = require('fs');
const rp = require("request-promise-native");
const showdown  = require('showdown');
const yaml = require('js-yaml');
const createHash = require('crypto').createHash;

const config = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));

const converter = new showdown.Converter({tables: true});

const baseUrl = 'https://jupiterone.zendesk.com/api/v2/help_center/';
const user = process.env.ZEKDESK_USER || 'callisto@jupiterone.io/token';
const pass = process.env.ZEKDESK_PASS;

const request = rp.defaults({
  baseUrl,
  auth: {
    user,
    pass
  },
  json: true
});

function sha256(object) {
  const data = JSON.stringify(object);
  const hash = createHash('sha256');
  hash.update(data);
  return hash.digest('base64');
}

async function publish() {
  for (const section of config.sections || []) {
    for (const art of section.articles || []) {
      const data = fs.readFileSync(art.file, 'utf8')
        .replace(/^#(.*)$/m, ''); // removes title
      const html = converter.makeHtml(data)
        .replace(/..\/assets\//g, 'http://jupiterone.com/wp-content/uploads/')
        .replace(/<pre><code/g, '<pre><div')
        .replace(/<\/code><\/pre>/g, '</div></pre>');
      const article = {
        title: art.title,
        body: html,
      }

      // Calculate hash to determine if the content needs updating
      const hash = sha256(article);
      if (hash !== art.hash) {
        // Update existing article if there is an id
        const response = art.id
          ? await request.put({
            uri: `articles/${art.id}/translations/en-us.json`,
            body: { translation: article }
          })
          : await request.post({
            uri: `en-us/sections/${section.id}/articles.json`,
            body: { article }
          });

        if (response) {
          art.hash = hash;
        }
        if (response.article) {
          art.id = response.article.id;
        } 
      }
    }
  }
  fs.writeFileSync('config.yaml', yaml.safeDump(config), 'utf8');
}

publish()
  .catch(console.log);