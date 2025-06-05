// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');

  socket.on('new user', (username) => {
    socket.username = username;
    io.emit('chat message', `📢 ${socket.username} se ha unido al chat`);
  });

  socket.on('disconnect', () => {
    io.emit('chat message', `📢 ${socket.username || 'Alguien'} ha salido del chat`);
    console.log('Usuario desconectado');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', `${socket.username}: ${msg}`);
  });
});

http.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});