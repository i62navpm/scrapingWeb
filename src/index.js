const puppeteer = require('puppeteer')
const { URL } = require('../config/config.json')

class Scrape {
  constructor (URL) {
    this.url = URL
    this.browser = null
    this.page = null
  }

  async initBrowser () {
    this.browser = await puppeteer.launch({ headless: false })
  }

  async initPage () {
    this.page = await this.browser.newPage()
  }

  async goToURL () {
    await this.page.goto(this.url)
  }

  async startScraping () {
    return require('../config/scraping.fn.js')(this.page)
  }

  async closeBrowser () {
    await this.browser.close()
  }
}

async function main (scrape) {
  await scrape.initBrowser()
  await scrape.initPage()
  await scrape.goToURL()
  const result = await scrape.startScraping()
  await scrape.closeBrowser()
  return result
}

main(new Scrape(URL)).then(result => console.log(result))
