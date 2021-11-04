const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const got = require('got');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Set cors options

const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));

// Define routes
app.use(express.static(__dirname)); //https://stackoverflow.com/questions/19620239/cant-get-index-html-to-show-with-express-in-nodejs

app.use(express.json());

app.post('/title-bot', async (req, res) => {
  const providedUrl = req.body.URL; //=input.value from main.js
  console.log(providedUrl);
  try {
    const response = await got(providedUrl);

    const dom = new JSDOM(response.body); //https://www.twilio.com/blog/web-scraping-and-parsing-html-in-node-js-with-jsdom
    const allTitles = [...dom.window.document.querySelectorAll('title')];

    let data = null;
    allTitles.forEach((title) => {
      //looping through title data
      if (!data && title.text) {
        data = title.text;
      }
    });
    console.log(data);

    res.json(data);
  } catch (err) {
    res.json('Invalid URL' + providedUrl);
  }
});

// Listen for requests
app.listen(4000, () => console.log('Server running on port 4000'));
