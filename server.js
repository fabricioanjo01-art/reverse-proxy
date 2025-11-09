const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Permite acesso externo
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Redireciona root para /#/login
app.get("/", (req, res) => {
  res.redirect("/#/login");
});

// Proxy para o servidor real
app.use(
  "/",
  createProxyMiddleware({
    target: "http://34.198.204.124:9001",
    changeOrigin: true,
    ws: true,
    timeout: 60000,
    proxyTimeout: 60000
  })
);

// Porta do Render
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Reverse proxy rodando na porta ${port}`));
