const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Evita loops de redirecionamento
app.set("trust proxy", true);

// Proxy direto para o app
app.use(
  "/",
  createProxyMiddleware({
    target: "http://34.198.204.124:9001",
    changeOrigin: true,
    ws: true,
    followRedirects: true,
    onProxyReq: (proxyReq, req) => {
      // Remove HTTPS force headers do app
      proxyReq.removeHeader("x-forwarded-proto");
    }
  })
);

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`Reverse proxy ativo na porta ${port}`));
