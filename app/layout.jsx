import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ATP Records Hub - Open Era Tennis Statistics',
  description: 'Complete ATP Open Era tennis records, player profiles, GOAT rankings, and advanced statistics with modern UI',
  keywords: 'ATP, tennis, records, statistics, GOAT, rankings, open era',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-primary text-white`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
