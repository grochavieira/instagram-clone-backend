"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var routes_1 = __importDefault(require("./routes"));
mongoose_1.default
    .connect(process.env.MONGO_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(function () {
    console.log("Connected to database.");
    app.emit("ready...");
})
    .catch(function (e) { return console.log(e); });
var app = express_1.default();
var server = http_1.default.createServer(app);
var io = socket_io_1.default(server);
io.on("connection", function (socket) {
    var id = socket.handshake.query.id;
    // setInterval(() => {
    //   socket.emit("test", "hello there", () => {
    //     console.log("mensagem enviada");
    //   });
    // }, 1000);
    socket.on("disconnect", function () {
        console.log("usuário se desconectou", id);
    });
});
app.use(function (request, response, next) {
    // O io será usado para mandar e enviar mensagens
    request.io = io;
    // Manda para as rotas os usuários conectados
    // request.connectedUsers = connectedUsers;
    // Para continuar o fluxo da aplicação, se não tiver isso ele para aqui mesmo
    return next();
});
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(routes_1.default);
var port = process.env.PORT || 3333;
server.listen(port, function () {
    console.log("Listening to port " + port + "...");
});
