/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaPhoneAlt, FaSubway, FaBus, FaMapMarkerAlt } from 'react-icons/fa';
import AOS from 'aos';
import '@fontsource/great-vibes';
import '@fontsource/noto-serif-kr';
import type { Swiper as SwiperClass } from 'swiper';
import duration from 'dayjs/plugin/duration';
import Script from 'next/script';

dayjs.extend(duration);

// window.naver 타입 에러 해결

declare global {
  interface Window {
    naver: unknown;
    kakao: any;
  }
}

const WEDDING_DATE = dayjs('2025-08-24T13:00:00');
const today = dayjs();
const dday = WEDDING_DATE.diff(today, 'day');

const galleryImages = [
  '/images/KakaoTalk_20250516_200424715_01.jpg',
  '/images/KakaoTalk_20250516_200424715_02.jpg',
  '/images/KakaoTalk_20250516_200424715.jpg',
];

function AccountDropdown({
  label,
  accounts,
}: {
  label: string;
  accounts: { bank: string; number: string; name: string; pay?: boolean }[];
}) {
  const [open, setOpen] = useState(false);

  const handleCopy = (acc: { bank: string; number: string; name: string }) => {
    navigator.clipboard.writeText(`${acc.bank} ${acc.number} (${acc.name})`);
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between bg-[#fbfbfb] px-4 py-3 text-[17px] font-medium text-gray-700"
        style={{ borderRadius: 0 }}
      >
        {label}
        <svg
          className={`ml-2 h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="bg-white" style={{ borderRadius: 0 }}>
          {accounts.map((acc, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between px-4 py-3 ${
                idx !== accounts.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              style={{ borderRadius: 0 }}
            >
              <div className="text-left">
                <div className="text-[15px] text-gray-700">
                  {acc.bank} {acc.number}
                </div>
                <div className="text-[14px] text-gray-500">{acc.name}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(acc)}
                  className="flex items-center gap-1 border border-gray-300 bg-gray-50 px-3 py-1 text-[14px] text-gray-600 hover:bg-gray-100"
                  style={{ borderRadius: 0 }}
                >
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <rect x="3" y="3" width="13" height="13" rx="2" />
                  </svg>
                  복사
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [galleryIdx, setGalleryIdx] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out' });
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // 지도 생성은 Script onLoad에서 처리
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[#fafafa]">
      {/* 대표 이미지 */}
      <div
        className="relative mx-auto flex w-full max-w-md flex-col items-center"
        data-aos="fade-up"
      >
        <div className="relative flex h-[100vh] w-full items-center justify-center bg-white">
          <Image
            src={galleryImages[0]}
            alt="대표 이미지"
            fill
            className="object-cover object-center"
            priority
          />
          {/* 상단 그라데이션 오버레이 */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-1/2 w-full"
            style={{
              background:
                'linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)',
            }}
          />
          {/* 타이틀 - 필기체, our wedding day, 상단 중앙 */}
          <div className="pointer-events-none absolute bottom-20 left-1/2 -translate-x-1/2 select-none">
            <h1
              className="font-great-vibes animate-elegant-fade shine-clip-text text-center text-[60px] leading-[1.1] text-white sm:text-[70px]"
              style={{ fontFamily: 'Great Vibes, cursive' }}
            >
              Our
              <br />
              Wedding
              <br />
              Day
            </h1>
          </div>
        </div>
      </div>
      {/* 본문 카드 */}
      <div
        className="font-noto-serif mx-auto mt-0 flex w-full max-w-md flex-col gap-8 bg-white px-0 pb-10 text-black shadow-lg"
        data-aos="fade-up"
      >
        {/* 날짜/장소 */}
        <section className="flex flex-col items-center gap-1 px-8 py-6 text-center">
          <div className="mb-3 text-[18px] font-semibold text-black">
            김윤환&nbsp;&nbsp;|&nbsp;&nbsp;김송희
          </div>
          <div className="text-[15px] text-gray-600">2025년 8월 24일 일요일 오후 1시</div>
          <div className="text-[15px] text-gray-600">라루체 웨딩홀 </div>
        </section>

        {/* 인사말(시) 및 초대 문구 */}
        <section className="flex flex-col items-center gap-6 px-8 py-6 text-center">
          {/* 꽃 아이콘 */}
          <div>
            {/* 원하는 꽃 SVG 아이콘을 직접 넣거나, 아래처럼 이모지로 대체 가능 */}
            {/* 우아한 꽃 SVG 아이콘 */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#b08a60]"
              style={{ display: 'inline-block' }}
            >
              <g>
                <ellipse cx="24" cy="24" rx="6" ry="6" fill="#b08a60" fillOpacity="0.7" />
                <path
                  d="M24 10c2.5-7 13-7 13 2.5 0 5-6 7-6 7s7-2 10 3c3 5-4 11-10 7 0 0 6 5 2 10-4 5-12 1-10-6 0 0-2 7-8 6-6-1-7-10 1-12 0 0-8-1-8-8 0-7 10-8 13-2.5z"
                  fill="#fff5e6"
                  stroke="#b08a60"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="24" cy="24" r="3" fill="#fff" />
              </g>
            </svg>
          </div>
          {/* 시 */}
          <div className="text-[16px] leading-relaxed whitespace-pre-line text-gray-700">
            햇살처럼 따듯하게 안아주고
            <br />
            곁에서 서로를 웃게 해주는
            <br />
            소중한 사람을 만났습니다.
            <br />
            포근한 여름빛이 머무는 8월,
            <br />
            오롯이 서로를 향한 마음으로
            <br />
            조심스레 첫걸음을 내딛습니다.
            <br />
            그 소중한 순간을
            <br />
            함께해 주시면 감사하겠습니다.
          </div>
          {/* 초대장 타이틀 */}
          <div className="mt-8">
            <div className="mb-2 text-xs tracking-widest text-[#b08a60]">INVITATION</div>
            <div className="mb-2 text-[17px] font-semibold text-gray-800">
              소중한 분들을 초대합니다
            </div>
            <div className="text-[15px] leading-relaxed whitespace-pre-line text-gray-700">
              새 인생을 시작하는 이 자리에 오셔서
              <br />
              <span className="font-semibold text-[#b08a60]">축복</span>해 주시면 감사하겠습니다.
            </div>
          </div>
        </section>
        {/* 신랑신부 사진 + 연락하기 버튼 */}
        <section className="flex flex-col items-center gap-6 px-8 py-6 text-center">
          {/* 신랑신부 사진 */}
          <div className="flex w-full justify-center">
            <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden bg-gray-100">
              <Image
                src={galleryImages[1]}
                alt="신랑 신부 사진"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
          <div className="mt-6 mb-2 flex w-full max-w-md justify-between text-[18px] leading-relaxed text-gray-700">
            {/* 신랑 */}
            <div className="flex flex-1 flex-col items-center">
              <span className="ml-1 font-semibold text-gray-800">김윤환</span>
              <div className="mt-2">
                <a
                  href="tel:01012345678"
                  className="mt-4 flex items-center justify-center gap-2 rounded-3xl border border-gray-300 px-4 py-2 text-[16px] text-gray-500 transition hover:bg-gray-100"
                  style={{ width: 'fit-content', margin: '0 auto' }}
                >
                  <FaPhoneAlt className="text-gray-400" />
                  연락하기
                </a>
              </div>
            </div>
            {/* 신부 */}
            <div className="flex flex-1 flex-col items-center">
              <span className="ml-1 font-semibold text-gray-800">김송희</span>
              <div className="mt-2">
                <a
                  href="tel:01087654321"
                  className="mt-4 flex items-center justify-center gap-2 rounded-3xl border border-gray-300 px-4 py-2 text-[16px] text-gray-500 transition hover:bg-gray-100"
                  style={{ width: 'fit-content', margin: '0 auto' }}
                >
                  <FaPhoneAlt className="text-gray-400" />
                  연락하기
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* 캘린더 & D-day 타이머 */}
        <section className="flex flex-col items-center gap-4 bg-[#fbfbfb] px-8 py-10 text-center">
          {/* 날짜 및 시간 */}
          <div className="text-center">
            <div className="mb-1 text-[24px] font-semibold tracking-widest text-gray-700">
              2025.8.24
            </div>
            <div className="text-[16px] text-gray-600">일요일 오후 1시</div>
          </div>
          <div className="mb-4 w-full border-t border-gray-200" />
          {/* 달력 */}
          <table className="mx-auto mb-6 w-full max-w-xs text-center text-[15px]">
            <thead>
              <tr>
                <th className="h-8 w-8 align-middle text-red-400">일</th>
                <th className="h-8 w-8 align-middle">월</th>
                <th className="h-8 w-8 align-middle">화</th>
                <th className="h-8 w-8 align-middle">수</th>
                <th className="h-8 w-8 align-middle">목</th>
                <th className="h-8 w-8 align-middle">금</th>
                <th className="h-8 w-8 align-middle">토</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="h-8 w-8 align-middle text-gray-300"></td>
                <td className="h-8 w-8 align-middle text-gray-300"></td>
                <td className="h-8 w-8 align-middle text-gray-300"></td>
                <td className="h-8 w-8 align-middle text-gray-300"></td>
                <td className="h-8 w-8 align-middle text-gray-300"></td>
                <td className="h-8 w-8 align-middle">1</td>
                <td className="h-8 w-8 align-middle">2</td>
              </tr>
              <tr>
                <td className="h-8 w-8 align-middle text-red-400">3</td>
                <td className="h-8 w-8 align-middle">4</td>
                <td className="h-8 w-8 align-middle">5</td>
                <td className="h-8 w-8 align-middle">6</td>
                <td className="h-8 w-8 align-middle">7</td>
                <td className="h-8 w-8 align-middle">8</td>
                <td className="h-8 w-8 align-middle">9</td>
              </tr>
              <tr>
                <td className="h-8 w-8 align-middle text-red-400">10</td>
                <td className="h-8 w-8 align-middle">11</td>
                <td className="h-8 w-8 align-middle">12</td>
                <td className="h-8 w-8 align-middle">13</td>
                <td className="h-8 w-8 align-middle">14</td>
                <td className="h-8 w-8 align-middle">15</td>
                <td className="h-8 w-8 align-middle">16</td>
              </tr>
              <tr>
                <td className="h-8 w-8 align-middle text-red-400">17</td>
                <td className="h-8 w-8 align-middle">18</td>
                <td className="h-8 w-8 align-middle">19</td>
                <td className="h-8 w-8 align-middle">20</td>
                <td className="h-8 w-8 align-middle">21</td>
                <td className="h-8 w-8 align-middle">22</td>
                <td className="h-8 w-8 align-middle">23</td>
              </tr>
              <tr>
                <td className="h-8 w-8 align-middle text-red-400">
                  <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#b08a60] font-bold text-white">
                    24
                  </span>
                </td>
                <td className="h-8 w-8 align-middle">25</td>
                <td className="h-8 w-8 align-middle">26</td>
                <td className="h-8 w-8 align-middle">27</td>
                <td className="h-8 w-8 align-middle">28</td>
                <td className="h-8 w-8 align-middle">29</td>
                <td className="h-8 w-8 align-middle">30</td>
              </tr>
              <tr>
                <td className="h-8 w-8 align-middle text-red-400">31</td>
                <td className="h-8 w-8 align-middle text-gray-300"></td>
                <td className="h-8 w-8 align-middle text-gray-300"></td>
                <td className="h-8 w-8 align-middle text-gray-300"></td>
                <td className="h-8 w-8 align-middle text-gray-300"></td>
                <td className="h-8 w-8 align-middle text-gray-300"></td>
                <td className="h-8 w-8 align-middle text-gray-300"></td>
              </tr>
            </tbody>
          </table>

          <div className="mb-4 w-full border-t border-gray-200" />

          {/* 남은 날짜 안내 */}
          <div className="text-center text-[15px]">
            <span className="font-semibold text-gray-700">윤환</span>
            <span className="mx-1 text-[#e57373]">♥</span>
            <span className="font-semibold text-gray-700">송희의 결혼식이</span>
            <span className="mx-1 font-semibold text-[#e57373]">{dday}일</span>
            <span className="font-semibold text-gray-700">남았습니다.</span>
          </div>
        </section>
        {/* 갤러리(슬라이드) */}
        <section className="py-6" data-aos="fade-up">
          <div className="mb-6 text-center font-semibold text-[#b08a60]">갤러리</div>
          <Swiper
            spaceBetween={8}
            slidesPerView={1}
            onSlideChange={(swiper) => setGalleryIdx(swiper.activeIndex)}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="rounded-lg"
          >
            {galleryImages.map((src, i) => (
              <SwiperSlide key={src}>
                <div className="relative h-120 w-full">
                  <Image
                    src={src}
                    alt={`갤러리${i + 1}`}
                    fill
                    className="rounded-lg object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* 썸네일 */}
          <div className="mt-3 flex justify-center gap-2">
            {galleryImages.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => {
                  setGalleryIdx(i);
                  if (swiperRef.current) {
                    swiperRef.current.slideTo(i);
                  }
                }}
                className={`relative h-12 w-16 overflow-hidden transition-all ${galleryIdx === i ? 'brightness-100' : 'brightness-50'}`}
                style={{ outline: 'none' }}
              >
                <Image src={src} alt={`썸네일${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </section>
        {/* 오시는 길 (지도) */}
        <section className="flex flex-col gap-6 px-8 py-6" data-aos="fade-up">
          <div className="text-center font-semibold text-[#b08a60]">오시는 길</div>
          <div>
            <div className="flex items-center justify-center gap-2 text-sm text-black">
              <FaMapMarkerAlt /> 명동 라루체 웨딩홀
            </div>
            <p className="mt-1 text-center text-xs">서울특별시 중구 퇴계로 18길 46</p>
          </div>

          {/* 카카오맵 지도 */}
          <div
            id="kakao-map"
            style={{ width: '100%', height: 192, borderRadius: 8, overflow: 'hidden' }}
          />
          <Script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=7e60cb452f34a8e29d0a9f5eaba7f790&autoload=false`}
            strategy="afterInteractive"
            onLoad={() => {
              const kakao = window.kakao as any;
              if (kakao && kakao.maps) {
                kakao.maps.load(() => {
                  const container = document.getElementById('kakao-map');
                  const options = {
                    center: new kakao.maps.LatLng(37.5607058, 126.9861774), // 서울 중구 퇴계로18길 46
                    level: 3,
                  };
                  const map = new kakao.maps.Map(container, options);
                  new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(37.5607058, 126.9861774),
                    map,
                    title: '라루체웨딩홀 (명동)',
                  });
                });
              }
            }}
          />
          <div className="flex flex-col gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <FaSubway className="text-green-600" size={16} />
              <span>
                <b>명동역</b> 4번 출구 <span className="text-gray-400">(도보 5분)</span>
              </span>
            </div>
            <div className="flex items-start gap-2">
              <FaBus className="text-blue-600" size={16} />
              <div>
                <div>
                  <b>명동역</b> : 104, 105, 421, 463, 507, 604, N16, 7011
                </div>
                <div>
                  <b>명동입구</b> : 104, 421, 463, 507, 604, N16, 7011, 05
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 계좌번호(드롭다운) */}
        <section
          className="flex flex-col items-center gap-6 px-8 py-6 text-center"
          data-aos="fade-up"
        >
          <div>
            {/* 꽃 SVG */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 48 48"
              fill="none"
              className="mx-auto mb-2 text-[#b08a60]"
            >
              <g>
                <ellipse cx="24" cy="24" rx="6" ry="6" fill="#b08a60" fillOpacity="0.7" />
                <path
                  d="M24 10c2.5-7 13-7 13 2.5 0 5-6 7-6 7s7-2 10 3c3 5-4 11-10 7 0 0 6 5 2 10-4 5-12 1-10-6 0 0-2 7-8 6-6-1-7-10 1-12 0 0-8-1-8-8 0-7 10-8 13-2.5z"
                  fill="#fff5e6"
                  stroke="#b08a60"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="24" cy="24" r="3" fill="#fff" />
              </g>
            </svg>
          </div>
          <div className="mb-2 text-[20px] font-semibold text-[#a07a50]">마음 전하실 곳</div>
          <AccountDropdown
            label="신랑측 계좌번호"
            accounts={[{ bank: '신한', number: '110-123-456789', name: '김윤환' }]}
          />
          <AccountDropdown
            label="신부측 계좌번호"
            accounts={[{ bank: '국민', number: '200123-45-678900', name: '김송희' }]}
          />
        </section>
        {/* 푸터 */}
        <footer className="mt-8 mb-2 text-center text-xs text-gray-400">
          © 2025 윤환 & 송희 결혼식 모바일 청첩장
        </footer>
      </div>
    </div>
  );
}
