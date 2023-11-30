import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ContextProvider from './ContextProvider';
import '../global_styles/index.css';
import { NotificationProvider } from './NotificationProiver';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ContextProvider>
          <NotificationProvider />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
