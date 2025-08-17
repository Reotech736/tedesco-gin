import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tedesco Gin',
  description: 'Play Tedesco Gin online',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
