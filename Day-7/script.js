const http = require("node:http");

server = http.createServer((req, res) => {
  res.end("Hello World !!!");
});

server.listen(8000, function () {
  console.log("Server is running on port 8000");
});





