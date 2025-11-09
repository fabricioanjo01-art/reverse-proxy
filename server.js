import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(
  "/",
  createProxyMiddleware({
    target: "http://34.198.204.124:9001",
    changeOrigin: true,
    xfwd: true,
    secure: false,
    onProxyReq: (proxyReq) => {
      // força host original para evitar redirecionamentos
      proxyReq.setHeader("Host", "34.198.204.124:9001");
    },
    onProxyRes: (proxyRes) => {
      // remove headers que causam redirect infinito
      delete proxyRes.headers["location"];
      delete proxyRes.headers["content-security-policy"];
    },
    pathRewrite: (path) => {
      // mantém rota SPA Vue/React Angular com hash "/#/"
      if (path === "/") return "/#/login";
      return path;
    }
  })
);

app.listen(10000, () => {
  console.log("✅ Proxy rodando na porta 10000");
});
