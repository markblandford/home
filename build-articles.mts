import { existsSync, readdirSync, readFileSync, watch, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Marked } from 'marked';
import type { Tokens } from 'marked';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';
// @ts-expect-error -- emoji-toolkit ships no type declarations
import joypixels from 'emoji-toolkit';

const articlesDir = join(dirname(fileURLToPath(import.meta.url)), 'src', 'assets', 'articles');
const sourceFilename = 'article.md';
const outputFilename = 'article.html';

const escapeHtml = (text: string): string => text
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const marked = new Marked({
  gfm: true,
  breaks: true,
  pedantic: false,
  renderer: {
    code({ text, lang }: Tokens.Code): string {
      const language = (lang || '').split(/\s+/)[0];

      if (language && !Prism.languages[language]) {
        loadLanguages([language]);
      }

      const grammar = language ? Prism.languages[language] : undefined;
      const body = grammar ? Prism.highlight(text, grammar, language) : escapeHtml(text);
      const cls = `language-${language || 'none'}`;

      return `<pre class="${cls}"><code class="${cls}">${body}</code></pre>\n`;
    },
  },
});

function renderArticle(id: string): void {
  const source = join(articlesDir, id, sourceFilename);

  if (!existsSync(source)) {
    return;
  }

  const markdown = joypixels.shortnameToUnicode(readFileSync(source, 'utf8'));
  const html = marked.parse(markdown, { async: false });

  writeFileSync(join(articlesDir, id, outputFilename), html);
  console.log(`${id}/${outputFilename} built`);
}

function buildArticles(): void {
  readdirSync(articlesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .forEach((entry) => renderArticle(entry.name));
}

buildArticles();

if (process.argv.includes('--watch')) {
  console.log(`Watching ${articlesDir} for changes...`);

  watch(articlesDir, { recursive: true }, (_event, filename) => {
    if (filename && filename.endsWith(sourceFilename)) {
      renderArticle(filename.split(/[\\/]/)[0]);
    }
  });
}
