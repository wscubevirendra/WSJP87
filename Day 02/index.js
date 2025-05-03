const http = require("http");
const url = require("url");
const fs = require("fs");

// http://localhost:5000/home

const server = http.createServer((req, res) => {
 const urlparse = url.parse(req.url, true);
 let data = null;

 if (urlparse.pathname == "/") {
  data = fs.readFileSync('index.html', "utf-8");  // Corrected method name

 } else if (urlparse.pathname == "/about") {
  data = fs.readFileSync('about.html', "utf-8");  // Corrected method name

 }
 res.end(data);
});

server.listen(5000, () => {
 console.log("Server Started on http://localhost:5000");
});
