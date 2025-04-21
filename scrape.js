const fs = require('fs');
const puppeteer = require('puppeteer');

const url = process.env.SCRAPE_URL;

(async () => {
  try {
    console.log(`Starting scrape for: ${url}`);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });

    const data = await page.evaluate(() => ({
      title: document.title,
      heading: document.querySelector('h1')?.innerText || 'No h1 found',
      links: [...document.querySelectorAll('a')].map(a => a.href),
      images: [...document.querySelectorAll('img')]
       .filter(img => {
       const alt = (img.alt || '').toLowerCase();
       const src = (img.src || '').toLowerCase();
       return alt.includes('devops') || src.includes('devops');
       })
      .map(img => img.src)
    }));

    console.log('Scraped Data:', data);
    fs.writeFileSync('scraped_data.json', JSON.stringify(data, null, 2));
    await browser.close();

    console.log('Scraping complete.');
  } catch (err) {
    console.error('Scraping failed:', err.message);
    process.exit(1);
  }
})();
