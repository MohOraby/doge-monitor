const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', async (req, res) => {
  try {
    const redditRes = await axios.get('https://www.reddit.com/r/dogecoin/rising/.json?count=20');
    const redditData = redditRes.data;
    const posts = redditData.data.children;
    const redditPosts = posts.map(post => {
      return {
        title: post.data.title,
        thumbnail: post.data.thumbnail,
        url: `https://reddit.com${post.data.permalink}`
      };
    });

    const binRes = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=DOGEUSDT');
    const binData = binRes.data;

    return res.render('index', { redditPosts, binData });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));