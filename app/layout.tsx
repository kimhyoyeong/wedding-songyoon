import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '윤환 & 송희 결혼식 모바일 청첩장',
  description: '2025년 8월 24일, 명동 라루체 웨딩홀에서 열리는 윤환 & 송희의 결혼식에 초대합니다.',
  openGraph: {
    title: '윤환 & 송희 결혼식 모바일 청첩장',
    description:
      '2025년 8월 24일, 명동 라루체 웨딩홀에서 열리는 윤환 & 송희의 결혼식에 초대합니다.',
    url: 'https://wedding-songyoon.vercel.app/',
    type: 'website',
    images: [
      {
        url: 'https://wedding-songyoon.vercel.app/images/KakaoTalk_20250516_200424715_01.jpg',
        width: 1200,
        height: 630,
        alt: '윤환 & 송희 결혼식 대표 이미지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '윤환 & 송희 결혼식 모바일 청첩장',
    description:
      '2025년 8월 24일, 명동 라루체 웨딩홀에서 열리는 윤환 & 송희의 결혼식에 초대합니다.',
    images: ['https://wedding-songyoon.vercel.app/images/KakaoTalk_20250516_200424715_01.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
