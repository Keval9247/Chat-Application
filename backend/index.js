// index.js
const express = require("express");
const app = express();
require("dotenv").config();
const indexController = require("./indexController");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

app.use(cors());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        // methods: ["GET", "POST"],
    }
});

// io.on("connection", (socket) => {
//     console.log("socket connected and id:", socket.id);

//     socket.on("message", ({ message, room }) => {
//         // console.log(data);
//         io.to(room).emit("receive-message", message);
//         // socket.broadcast.emit("receive-message 2",abc);

//     })

//     socket.on("disconnect", () => {
//         console.log("uesr diconnected : ", socket.id);
//     })

//     socket.broadcast.emit("wel", `welocme user1 : ${socket.id}`)
// })

const indexcontroller = indexController(io);

app.post("/authenticate", indexcontroller.authentication);
app.get("/", indexcontroller.getauth);

server.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
});
io.on("connection", (socket) => {
    console.log("socket connected and id:", socket.id);

    socket.on("message", ({ message, room }) => {
        // console.log(data);
        io.to(room).emit("receive-message", message);
        // socket.broadcast.emit("receive-message 2",abc);

    })

    socket.on("disconnect", () => {
        console.log("uesr diconnected : ", socket.id);
    })

    socket.broadcast.emit("wel", `welocme user1 : ${socket.id}`)
})

module.exports = io;
