const net = require("net");

const server = net.createServer();

// an array of client sockets
const clients = [];

server.on("connection", (socket) => {
  console.log("A new connection to the server!");

  clientId = clients.length + 1;

  socket.write(`id-${clientId}`);

  socket.on("data", (data) => {
    const dataString = data.toString;
    const id = data.toString("utf-8").substring(0);
    const message = dataString.substring(dataString.indexOf("  :") + 3);

    clients.map((client) => {
      client.socket.write(`> User ${id}: ${message}`);
    });
  });

  clients.push({ id: clientId, socket });
});

server.listen(3008, "127.0.0.1", () => {
  console.log("Opened server on", server.address());
});
