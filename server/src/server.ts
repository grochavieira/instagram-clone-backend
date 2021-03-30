import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import "dotenv/config";
import http from "http";
import socketio from "socket.io";
import routes from "./routes";

mongoose
  .connect(process.env.MONGO_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to database.");
    app.emit("ready...");
  })
  .catch((e) => console.log(e));

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  const { id } = socket.handshake.query;

  socket.on("message", (message, callback) => {
    console.log("mensagem recebida");
    console.log({ message });

    callback("");
  });

  // setInterval(() => {
  //   socket.emit("test", "hello there", () => {
  //     console.log("mensagem enviada");
  //   });
  // }, 1000);

  socket.on("disconnect", () => {
    console.log("usuário se desconectou", id);
  });
});

const port = process.env.PORT || 3333;

server.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
