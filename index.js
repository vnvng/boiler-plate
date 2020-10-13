/*
- express : node.js 웹프레임워크 / 웹어플리케이션, API 개발 등에 사용
- require() : Module Import 구문

*/

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { User } = require('./models/User');
const config = require('./config/key');

const port = 5000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.post('/register', (req, res) => {
  //회원 가입 할때 필요한 정보들을 client로 부터 받아 DB INSERT
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
app.get('/', (req, res) => res.send('Hello World !!'));
app.listen(port, () => console.log(`Example app listening on port ${port}`));
