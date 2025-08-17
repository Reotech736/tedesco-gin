import Link from 'next/link';

export default function RoomPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-slate-900 text-white p-6">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">部屋コード: {params.id.toUpperCase()}</h1>
        <p className="text-center text-slate-300">
          ここに対戦UIが入ります（次のステップでリアルタイム通信を追加）。
        </p>
        <div className="rounded-xl bg-slate-800 p-4 text-sm space-y-2">
          <p>・このURLを共有すると同じ部屋に入れます</p>
          <p>・プレイヤー2人が入室したら対戦開始、を後で実装します</p>
        </div>
        <div className="text-center">
          <Link href="/" className="underline text-slate-300">トップに戻る</Link>
        </div>
      </div>
    </main>
  );
}
