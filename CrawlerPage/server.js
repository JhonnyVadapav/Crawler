// server.js
const express = require('express');
const path = require('path');
const { crawlPage } = require('./crawler.js');
const { printReport } = require('./report.js');
const {sortPages}=require('./report.js');

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

app.post('/crawl', async (req, res) => {
  try {
    const baseUrl = req.body.baseUrl;

    if (!baseUrl) {
      return res.status(400).json({ error: 'No website provided' });
    }

    console.log(`Starting crawl of ${baseUrl}`);
    const pages = await crawlPage(baseUrl, baseUrl, {});
    const sortedPages = sortPages(pages);

    res.json(sortedPages);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
