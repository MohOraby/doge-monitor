const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  return res.redirect('/reddit');
});

app.get('/reddit', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.reddit.com/r/dogecoin/rising/.json?count=10');
    const posts = data.data.children;
    const reducedPosts = posts.map(post => {
      return {
        title: post.data.title,
        thumbnail: post.data.thumbnail,
        url: `https://reddit.com${post.data.permalink}`
      };
    });

    return res.render('reddit', { posts: reducedPosts });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});