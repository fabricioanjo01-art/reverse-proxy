const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/", createProxyMiddleware({
  target: "http://34.198.204.124:9001",
  changeOrigin: true,
  ws: true,
  pathRewrite: { "^/": "/" },
}));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Proxy rodando na porta ${port}`));
