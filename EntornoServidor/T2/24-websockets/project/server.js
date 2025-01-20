const express = require('express');
const { Server } = require('socket.io');
const http = require('http');

// Crear una aplicación de Express
const app = express();

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Crear el servidor HTTP
const server = http.createServer(app);

// Configuración de Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // Permitir conexiones desde cualquier origen
    methods: ['GET', 'POST']
  }
});

// Almacenar mensajes en memoria
const messages = {};

// Manejar eventos de conexión
io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  // Unirse a una sala
  socket.on('joinRoom', (room) => {
    socket.join(room);
    if (!messages[room]) {
      messages[room] = [];
    }
    // Enviar mensajes anteriores al cliente
    socket.emit('previousMessages', messages[room]);
    console.log(`Usuario ${socket.id} se unió a la sala ${room}`);
  });

  // Escuchar mensajes del cliente
  socket.on('message', (data) => {
    console.log(`Mensaje recibido en sala ${data.room}: ${data.message}`);
    // Almacenar el mensaje
    messages[data.room].push(data.message);
    // Enviar el mensaje a todos los clientes en la sala
    io.to(data.room).emit('message', { message: data.message });
  });

  // Manejar desconexiones
  socket.on('disconnect', () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });
});

// Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor activo en http://10.200.33.156:${PORT}`);
});
