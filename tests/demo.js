(async () => {
  const puppeteer = require('puppeteer')
  const httpServer = require('http-server')
  const percySnapshot = require('@percy/puppeteer')

  const TEST_WIDTHS = [1280];

  // Start a local HTTP Server to host our TodoMVC app.
  const server = httpServer.createServer()
  const PORT = 8000
  server.listen(PORT)
  const URL = `http://localhost:${PORT}/assets`

  // Start a Puppeteer instance.
  const browser = await puppeteer.launch({
    args: [
      '--headless',
      // required to run puppeteer in docker
      '--no-sandbox'
    ]
  })
  const page = await browser.newPage();

  // Run tests
  await page.goto(`${URL}/signup`);

  await percySnapshot(page, 'Signup Page', {widths: TEST_WIDTHS});

  // Close up our Puppeteer browser.
  browser.close()

  // Shut down our HTTP server.
  server.close()
})()
