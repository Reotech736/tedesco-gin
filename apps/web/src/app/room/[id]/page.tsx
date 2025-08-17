'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type RoomUpdate = { roomId: string; players: number };

export default function RoomPage({ params }: { params: { id: string } }) {
  const [players, setPlayers] = useState<number>(1);

  useEffect(() => {
    const URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
    const socket: Socket = io(URL, { transports: ['websocket'] });

    socket.on('connect', () => {
      socket.emit('join_room', { roomId: params.id });
    });

    socket.on('room_update', (msg: RoomUpdate) => {
      if (msg.roomId === params.id) setPlayers(msg.players);
    });

    return () => {
      socket.emit('leave_room');
      socket.disconnect();
    };
  }, [params.id]);

  return (
    <main className="min-h-dvh flex items-center justify-center bg-slate-900 text-white p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">部屋コード: {params.id.toUpperCase()}</h1>

        <div className="text-center text-slate-300">
          <p>現在の入室人数：<span className="font-semibold">{players}</span> / 2</p>
          <p className="mt-2">もう1つのブラウザやスマホで同じURLを開いて人数が増えるか試してください。</p>
        </div>

        <div className="rounded-xl bg-slate-800 p-4 text-sm space-y-2">
          <p>・このURLを共有すると同じ部屋に入れます</p>
          <p>・2人になったら対戦開始（次のステップで実装）</p>
        </div>
        <div className="text-center">
          <Link href="/" className="underline text-slate-300">トップに戻る</Link>
        </div>
      </div>
    </main>
  );
}
