const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Habilita CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Proxy para o servidor alvo
app.use("/", createProxyMiddleware({
  target: "http://34.198.204.124:9001",
  changeOrigin: true,
  ws: true,
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader("X-Forwarded-Proto", "http");
  }
}));

// Render define a porta automaticamente — não use porta fixa!
const port = process.env.PORT;

app.listen(port, "0.0.0.0", () => console.log(`✅ Proxy ativo na porta ${port}`));

