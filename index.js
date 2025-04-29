// index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow cross-origin requests

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins (you can restrict this in production)
        methods: ["GET", "POST"]
    }
});

// Handle socket connections
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);



    // Custom events
    socket.on("new_query", async (data) => {
        console.log("new query added " + data)
        io.emit("new_query_emit", data);
    });

    socket.on("new_hold_query", async (data) => {
        console.log("new answer added " + data)
        io.emit("new_hold_query_emit", data);
    });

    socket.on("query_status_updated", async (data) => {
        console.log("query_status_updated  " + data)
        io.emit("query_status_updated_emit", data);
    });

    socket.on("query_tags_updated", async (data) => {
        console.log("query_tags_updated  " + data)
        io.emit("query_tags_updated_emit", data);
    });

    socket.on("query_hold_updated", async (data) => {
        console.log("query_hold_updated  " + data)
        io.emit("query_hold_updated_emit", data);
    });

    socket.on("query_edited", async (data) => {
        console.log("query_edited  " + data.query_id)
        io.emit("query_edited_emit", data);
    });







    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Optional API route
app.get('/', (req, res) => {
    res.send('Socket server is running');
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
