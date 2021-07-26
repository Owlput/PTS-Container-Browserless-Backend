const net = require("net");
const readline = require("readline");
const confighandler = require("./config/configRegister.js");

let globalConfig = confighandler.blbeGetConfig()

/*----------------------------------------*/
/* Start Browserless Backend(BLBE) server */
/*----------------------------------------*/
let blbe = net.createServer();
blbe.listen(globalConfig.port, () => console.log(`Listening on port ${globalConfig.port}`));// Listening connections
blbe.on("connection", (socket) => {
  inputListener(socket)//Process incoming requests
    .then(() => socket.end)
    .catch((err) => {
      console.error(err);//Error handler
      socket.end();
    });
});
