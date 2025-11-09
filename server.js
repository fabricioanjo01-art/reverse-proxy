const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
  '/',
  createProxyMiddleware({
    target: 'http://34.198.204.124:9001',
    changeOrigin: true,
    ws: true
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Reverse proxy rodando na porta ' + port);
});
