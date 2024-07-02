const express = require('express');
const http = require('http');
const fs = require('fs');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const httpServer = http.createServer(app);
const io = socketIo(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.use(express.static('public'));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["my-custom-header"],
  credentials: true
}));

io.on('connection', socket => {
  console.log('a user connected to the server', socket.id);
  socket.broadcast.emit('event', { type: 'join', from: socket.id, role: socket.handshake.query.role });

  socket.on('event', evt => {
    try {
      console.log('a signaling event was sent:', JSON.stringify(evt.type));
      io.sockets.sockets.get(evt.to).emit('event', evt);
    } catch (error) {
      console.error('Error processing event:', error);
    }
  });

  socket.on('disconnecting', _ => {
    console.log('a user is leaving', socket.id);
    socket.broadcast.emit('event', { type: 'bye', from: socket.id });
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

httpServer.listen(port, () => {
  console.log('listening on', port);
});
