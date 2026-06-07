import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nicolas Cossu — Portfolio',
  description: 'Nicolas Alejandro Cossu — Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-black">{children}</body>
    </html>
  );
}
