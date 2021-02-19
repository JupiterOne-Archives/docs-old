'use strict';

const fs = require('fs');
const rp = require("request-promise-native");
const showdown  = require('showdown');
const yaml = require('js-yaml');
const createHash = require('crypto').createHash;

const config = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));

const converter = new showdown.Converter(
  {
    parseImgDimensions: true,
    simplifiedAutoLink: true,
    tables: true
  }
);

const baseUrl = 'https://jupiterone.zendesk.com/api/v2/help_center/';
const user = process.env.ZENDESK_USER || 'callisto@jupiterone.io/token';
const pass = process.env.ZENDESK_PASS;

const zendesk_managers_agents_group_id = 554213;

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

function parseLinks() {
  let linksMap = {};
  let linksRegexStr = '((\\.|\\.\\.)\\/)+((docs|guides|queries|dashboards)\\/)?(';
  for (const section of config.sections || []) {
    for (const art of section.articles || []) {
      linksMap[art.file.substr(art.file.indexOf('/', 3)+1).replace('.md', '')] = art.webLink;
      linksRegexStr += `(${art.file.replace(/\.\.\/(docs|guides|queries|dashboards)\//, '').replace(/\//g, '\\/').replace(/\.md/, '')})|`;
    }
  }
  linksRegexStr = linksRegexStr.slice(0, -1) + ')(\\.md)';

  const links = {
    linksMap,
    linksRegexStr
  };
  fs.writeFileSync('links.json', JSON.stringify(links, null, 2), 'utf8');

  return links;
}

async function publish() {
  const { linksMap, linksRegexStr } = parseLinks();
  const linksRegex = new RegExp(linksRegexStr);
  const fontAwesome = '<script src="https://kit.fontawesome.com/9f58315920.js" crossorigin="anonymous"></script>';

  for (const section of config.sections || []) {
    for (const art of section.articles || []) {
      let data = fs.readFileSync(art.file, 'utf8')
        .replace(/^#(.*)$/m, '') // removes title
        .replace(/^ {2}(-|\*)/gm, '    -'); // fixes sublist indentation
      
      // Parse internal links to other docs and replace with matching Zendesk article link
      let match = linksRegex.exec(data);
      while (match) {
        data = data.replace(linksRegex, linksMap[match[5]]);
        match = linksRegex.exec(data);
      }
      const staticAssetsUrl = 'https://github.com/JupiterOne/docs/blob/master/assets/$2.$3?raw=true';
      const anchorIcon = `<img src="https://raw.githubusercontent.com/feathericons/feather/master/icons/link.svg?sanitize=true" width="12" height="12">`;
      const anchoredHeaderH2 = `<h2 id="$1">$2 <a href="#$1">${anchorIcon}</a></a></h2>`;
      const anchoredHeaderH3 = `<h3 id="$1">$2 <a href="#$1">${anchorIcon}</a></a></h3>`;
      const html = converter.makeHtml(data)
        .replace(/(\.\.\/)+assets\/(.*)\.(png|jpg|gif|svg)/g, staticAssetsUrl)
        .replace(/<pre><code/g, '<pre><div')
        .replace(/<\/code><\/pre>/g, '</div></pre>')
        .replace(/<h2 id="(.*)">(.*)<\/h2>/g, anchoredHeaderH2)
        .replace(/<h3 id="(.*)">(.*)<\/h3>/g, anchoredHeaderH3)
        .replace(/<\/table>/g, '</table><br>')
        .replace(/<i class="fa[srldb]?\sfa-.+"><\/i>/i, `${fontAwesome}\n$&`);
      const article = {
        title: art.title,
        body: html,
        user_segment_id: null,
        permission_group_id: zendesk_managers_agents_group_id
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
        art.webLink = `https://support.jupiterone.io/hc/en-us/articles/${art.id}`
      }
    }
  }
  fs.writeFileSync('config.yaml', yaml.safeDump(config), 'utf8');
}

publish()
  .catch(console.log);