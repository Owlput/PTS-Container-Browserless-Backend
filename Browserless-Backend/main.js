const net = require("net");
const readline = require("readline");
































/*----------------------------------------*/
/* Start Browserless Backend(BLBE) server */
/*----------------------------------------*/
let blbe = net.createServer();
blbe.listen(50000, () => console.log("Listening on port 50000"));// Listening connections
blbe.on("connection", (socket) => {
  inputListener(socket)//Process incoming requests
    .then(() => socket.end)
    .catch((err) => {
      console.error(err);//Error handler
      socket.end();
    });
});
