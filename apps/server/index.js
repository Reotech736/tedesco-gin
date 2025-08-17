import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/health', (_, res) => res.send('ok'));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
        'http://localhost:3000',
        'http://192.168.2.92:3000',
        /\.vercel\.app$/ // デプロイ後の許可（必要に応じて）
    ]
  }
});

// roomId -> Set<socketId>
const rooms = new Map();

function publish(roomId) {
  const count = rooms.get(roomId)?.size ?? 0;
  io.to(roomId).emit('room_update', { roomId, players: count });
}

io.on('connection', (socket) => {
  let joined = null;

  socket.on('join_room', ({ roomId }) => {
    if (joined) {
      socket.leave(joined);
      rooms.get(joined)?.delete(socket.id);
      publish(joined);
    }
    joined = roomId;
    if (!rooms.has(roomId)) rooms.set(roomId, new Set());
    rooms.get(roomId).add(socket.id);
    socket.join(roomId);
    publish(roomId);
  });

  socket.on('leave_room', () => {
    if (!joined) return;
    rooms.get(joined)?.delete(socket.id);
    socket.leave(joined);
    publish(joined);
    joined = null;
  });

  socket.on('disconnect', () => {
    if (!joined) return;
    rooms.get(joined)?.delete(socket.id);
    publish(joined);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, '0.0.0.0', () => {
  console.log('WS server listening on', PORT);
});
