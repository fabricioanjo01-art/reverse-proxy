const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.set("trust proxy", true);

// Redireciona a raiz para /#/login
app.get("/", (req, res) => {
  return res.redirect("/#/login");
});

app.use(
  "/",
  createProxyMiddleware({
    target: "http://34.198.204.124:9001",
    changeOrigin: true,
    ws: true,
    followRedirects: true,
    secure: false,
    onProxyReq: (proxyReq) => {
      proxyReq.removeHeader("x-forwarded-proto");
    },
    onError(err, req, res) {
      console.error("Proxy Error:", err);
      res.status(500).send("Erro ao acessar o sistema origem");
    }
  })
);

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`Reverse proxy ativo na porta ${port}`));
