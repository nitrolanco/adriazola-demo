/* global document, window, DOMParser, console */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

process.env.PLAYWRIGHT_BROWSERS_PATH = '0';
const { chromium } = await import('@playwright/test');
const url = process.argv[2] || 'http://127.0.0.1:4323/';
const output = resolve(process.argv[3] || 'playwright-report/review');
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('response', (response) => {
  if (response.status() >= 400)
    errors.push(`${response.status()} ${response.url()}`);
});
try {
  const response = await page.goto(url, { waitUntil: 'networkidle' });
  if (response.status() !== 200) throw new Error(`HTTP ${response.status()}`);
  const results = [];
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(async () => {
      for (const img of document.querySelectorAll('img[loading="lazy"]'))
        img.setAttribute('loading', 'eager');
      await Promise.all(
        [...document.images].map((img) => img.decode().catch(() => {})),
      );
    });
    const report = await page.evaluate(() => ({
      width: window.innerWidth,
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      missingImages: [...document.querySelectorAll('figure img, .brand img')]
        .filter((img) => !img.naturalWidth)
        .map((img) => img.getAttribute('src')),
      brokenAnchors: [...document.querySelectorAll('a[href^="#"]')]
        .filter(
          (a) => !document.getElementById(a.getAttribute('href').slice(1)),
        )
        .map((a) => a.getAttribute('href')),
    }));
    await page.screenshot({
      path: resolve(output, `${width}-full.png`),
      fullPage: true,
    });
    await page.screenshot({ path: resolve(output, `${width}-portada.png`) });
    results.push(report);
  }
  await page
    .locator('#servicios')
    .screenshot({ path: resolve(output, 'servicios.png') });
  await page
    .locator('.projects-section')
    .screenshot({ path: resolve(output, 'trabajos.png') });
  await page
    .locator('#contacto')
    .screenshot({ path: resolve(output, 'contacto.png') });
  const baseline = await readFile(
    resolve('playwright-report/baseline/index.html'),
    'utf8',
  );
  const current = await response.text();
  const content = await page.evaluate(
    ({ baseline, current }) => {
      const extract = (html) =>
        [
          ...new DOMParser()
            .parseFromString(html, 'text/html')
            .querySelectorAll('h1,h2,h3,p,label,summary'),
        ]
          .map((node) => node.textContent.replace(/\s+/g, ' ').trim())
          .sort();
      const before = extract(baseline);
      const after = extract(current);
      return {
        identical: JSON.stringify(before) === JSON.stringify(after),
        count: before.length,
        missing: before.filter((text) => !after.includes(text)),
        added: after.filter((text) => !before.includes(text)),
      };
    },
    { baseline, current },
  );
  await page.keyboard.press('Control+Home');
  await page.keyboard.press('Tab');
  const keyboard = await page.evaluate(() =>
    document.activeElement?.textContent?.trim(),
  );
  await page.evaluate(() => {
    document.documentElement.style.zoom = '2';
  });
  const zoomOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  await page.screenshot({
    path: resolve(output, 'zoom-200.png'),
    fullPage: true,
  });
  const report = {
    url,
    results,
    content,
    firstKeyboardTarget: keyboard,
    zoomOverflow,
    errors,
  };
  await writeFile(
    resolve(output, 'results.json'),
    JSON.stringify(report, null, 2) + '\n',
  );
  console.log(JSON.stringify(report, null, 2));
  if (
    errors.length ||
    results.some(
      (result) =>
        result.overflow ||
        result.missingImages.length ||
        result.brokenAnchors.length,
    ) ||
    !content.identical ||
    zoomOverflow
  )
    process.exitCode = 1;
} finally {
  await browser.close();
}
