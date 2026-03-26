import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';

import { transformAsync } from '@babel/core';
import { build as esbuild } from 'esbuild';

// Use process.cwd() so the script works reliably when run from the working repo.
const repoDir = process.cwd();
const sourceHtmlPath = path.join(repoDir, 'index.html');
const manifestPath = path.join(repoDir, 'manifest.json');
const serviceWorkerPath = path.join(repoDir, 'sw.js');
const tempDir = path.join(repoDir, '.build-temp');
const docsDir = path.join(repoDir, 'docs');
const assetsDir = path.join(docsDir, 'assets');

function extractOrThrow(source, regex, label) {
  const match = source.match(regex);
  if (!match) {
    throw new Error(`Unable to locate ${label} in index.html`);
  }
  return match[1];
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    // Use 'ignore' for all stdio — Tailwind writes its CSS output to the file
    // specified by -o, so stdout/stderr are only progress messages we don't need.
    // Avoid pipe-based forwarding which can deadlock when the parent stdout is
    // itself a pipe (e.g. `npm run build > file`).
    const child = spawn(command, args, {
      cwd: repoDir,
      shell: false,
      stdio: 'ignore'
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} ${args.join(' ')} failed with exit code ${code}`));
    });
    child.on('error', reject);
  });
}

async function main() {
  const sourceHtml = await fs.readFile(sourceHtmlPath, 'utf8');
  const customStyles = extractOrThrow(sourceHtml, /<style>([\s\S]*?)<\/style>/, 'custom styles').trim();
  const appSource = extractOrThrow(sourceHtml, /<script type="text\/babel">([\s\S]*?)<\/script>\s*<\/body>/, 'inline app script');
  const title = extractOrThrow(sourceHtml, /<title>([\s\S]*?)<\/title>/, 'page title').trim();
  const themeInitSource = extractOrThrow(sourceHtml, /<script>\s*\/\/ Initialize theme from localStorage before React mounts to avoid flash([\s\S]*?)<\/script>/, 'theme init script').trim();
  const externalScripts = [...sourceHtml.matchAll(/<script src="([^"]+)"><\/script>/g)]
    .map((match) => match[0])
    .filter((tag) => !tag.includes('cdn.tailwindcss.com'))
    .filter((tag) => !tag.includes('react@18/umd/react.production.min.js'))
    .filter((tag) => !tag.includes('react-dom@18/umd/react-dom.production.min.js'))
    .filter((tag) => !tag.includes('firebasejs/'))
    .filter((tag) => !tag.includes('jspdf.umd.min.js'))
    .filter((tag) => !tag.includes('@babel/standalone'));
  const linkTags = [...sourceHtml.matchAll(/<link\b[^>]*>/g)]
    .map((match) => match[0])
    .filter((tag) => !tag.includes('rel="manifest"'));

  const entrySource = appSource
    .replace(/const\s*\{\s*useState,\s*useEffect,\s*useMemo,\s*useRef\s*\}\s*=\s*React;\s*/m, "import firebase from 'firebase/compat/app';\nimport 'firebase/compat/firestore';\nimport 'firebase/compat/auth';\nimport { useEffect, useMemo, useRef, useState } from 'react';\nimport { createRoot } from 'react-dom/client';\n\n")
    .replace(/const root = ReactDOM\.createRoot\(document\.getElementById\('root'\)\);/, "const root = createRoot(document.getElementById('root'));\n");

  if (!entrySource.includes("from 'react'")) {
    throw new Error('React import replacement failed');
  }
  if (!entrySource.includes('createRoot(document.getElementById')) {
    throw new Error('ReactDOM createRoot replacement failed');
  }

  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  manifest.start_url = './';
  manifest.scope = './';

  await fs.rm(tempDir, { recursive: true, force: true });
  await fs.rm(docsDir, { recursive: true, force: true });
  await fs.mkdir(tempDir, { recursive: true });
  await fs.mkdir(assetsDir, { recursive: true });

  const tempEntryPath = path.join(tempDir, 'app.entry.jsx');
  const tempBabelPath = path.join(tempDir, 'app.transpiled.js');
  const tempTailwindInputPath = path.join(tempDir, 'tailwind.input.css');
  const tailwindCliPath = path.join(repoDir, 'node_modules', 'tailwindcss', 'lib', 'cli.js');
  const builtCssPath = path.join(assetsDir, 'app.css');
  const builtJsPath = path.join(assetsDir, 'app.js');

  await fs.writeFile(tempEntryPath, entrySource.trimStart(), 'utf8');
  await fs.writeFile(tempTailwindInputPath, `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n${customStyles}\n`, 'utf8');

  await runCommand(process.execPath, [
    tailwindCliPath,
    '-i',
    tempTailwindInputPath,
    '-o',
    builtCssPath,
    '--content',
    sourceHtmlPath,
    '--minify'
  ]);

  const babelResult = await transformAsync(entrySource, {
    babelrc: false,
    configFile: false,
    filename: 'app.entry.jsx',
    presets: [
      ['@babel/preset-env', { bugfixes: true, modules: false, targets: 'defaults' }],
      ['@babel/preset-react', { runtime: 'automatic' }]
    ]
  });

  if (!babelResult?.code) {
    throw new Error('Babel returned no output');
  }

  await fs.writeFile(tempBabelPath, babelResult.code, 'utf8');

  await esbuild({
    bundle: true,
    format: 'esm',
    minify: true,
    outfile: builtJsPath,
    platform: 'browser',
    target: ['es2020'],
    entryPoints: [tempBabelPath]
  });

  const builtHtml = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '    <meta charset="UTF-8">',
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    `    <title>${title}</title>`,
    `    <meta name="theme-color" content="${manifest.theme_color || '#06b6d4'}">`,
    '    <link rel="manifest" href="./manifest.json">',
    ...externalScripts.map((tag) => `    ${tag}`),
    ...linkTags.map((tag) => `    ${tag}`),
    '    <link rel="stylesheet" href="./assets/app.css">',
    '</head>',
    '<body>',
    '    <div id="root"></div>',
    '    <script>',
    themeInitSource,
    '    </script>',
    '    <script type="module" src="./assets/app.js"></script>',
    '</body>',
    '</html>',
    ''
  ].join('\n');

  await fs.writeFile(path.join(docsDir, 'index.html'), builtHtml, 'utf8');
  await fs.writeFile(path.join(docsDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  await fs.copyFile(serviceWorkerPath, path.join(docsDir, 'sw.js'));
  await fs.writeFile(path.join(docsDir, '.nojekyll'), '', 'utf8');

  console.log('Production build complete: docs/index.html');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
