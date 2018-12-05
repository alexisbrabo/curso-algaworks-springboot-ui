import express from 'express';
const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req, res) {
  res.sendfile(__dirname + '/dist/index.html');
})

app.listen(process.env.PORT || 4200);

