import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Club Tueste Norte',
    template: '%s · Club Tueste Norte',
  },
  description: 'Prototipo del área de socios del Club Tueste Norte',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}