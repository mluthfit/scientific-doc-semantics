const express = require('express');
const { trim_all: trimAll } = require('request_trimmer');
const indexRouter = require('./routers/index');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.use(trimAll);

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`);
});
