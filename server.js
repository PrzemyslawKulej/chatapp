const net = require("net");

const server = net.createServer();

// an array of client sockets
const clients = [];

server.on("connection", (socket) => {
  console.log("A new connection to the server!");

  clientId = clients.length + 1;
  socket.write(`id-${clientId}`);

  socket.on("data", (data) => {
    clients.map((client) => {
      client.socket.write(data);
    });
  });

  clients.push({ id: clientId, socket });
});

server.listen(3008, "127.0.0.1", () => {
  console.log("Opened server on", server.address());
});
