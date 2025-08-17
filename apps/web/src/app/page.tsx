'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

function genRoomCode(len = 6) {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export default function Home() {
  const router = useRouter();
  const [code, setCode] = useState('');

  const createRoom = () => {
    const room = genRoomCode();
    router.push(`/room/${room}`);
  };

  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    router.push(`/room/${code.toUpperCase()}`);
  };

  return (
    <main className="min-h-dvh flex items-center justify-center bg-slate-900 text-white p-6">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center">Tedesco Gin</h1>

        <button
          onClick={createRoom}
          className="w-full rounded-xl py-3 font-semibold bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700"
        >
          部屋を作成（合言葉を自動生成）
        </button>

        <form onSubmit={joinRoom} className="space-y-3">
          <label className="block text-sm text-slate-300">合言葉で参加</label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^0-9a-z]/gi, ''))}
            placeholder="例: 7K3FQJ"
            className="w-full rounded-xl px-4 py-3 text-slate-900"
            inputMode="latin-prose"
            maxLength={8}
          />
          <button
            type="submit"
            className="w-full rounded-xl py-3 font-semibold border border-slate-500 hover:bg-slate-800"
          >
            参加
          </button>
        </form>
      </div>
    </main>
  );
}
