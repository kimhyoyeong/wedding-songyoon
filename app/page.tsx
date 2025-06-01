/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaPhoneAlt, FaSubway, FaBus, FaMapMarkerAlt, FaParking } from 'react-icons/fa';
import AOS from 'aos';
import '@fontsource/great-vibes';
import '@fontsource/noto-serif-kr';
import type { Swiper as SwiperClass } from 'swiper';
import duration from 'dayjs/plugin/duration';
import Script from 'next/script';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

dayjs.extend(duration);

// window.naver 타입 에러 해결

declare global {
  interface Window {
    naver: unknown;
    kakao: unknown;
  }
}

const WEDDING_DATE = dayjs('2025-08-24T13:00:00');
const today = dayjs();
const dday = WEDDING_DATE.diff(today, 'day');

const galleryImages = [
  '/images/KakaoTalk_20250516_200424715_01.jpg',
  '/images/RSM_3610.jpg',
  '/images/KakaoTalk_20250516_200424715_02.jpg',
  '/images/RSM_3723.jpg',
  '/images/RSM_3750.jpg',
  '/images/RSM_3754.jpg',
  '/images/RSM_3887.jpg',
  '/images/RSM_3896.jpg',
  '/images/RSM_4453.jpg',
  '/images/RSM_4472.jpg',
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
    navigator.clipboard.writeText(`${acc.bank} ${acc.number} ${acc.name}`);
    alert('복사되었습니다.');
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between bg-[#faf8f7] px-4 py-3 text-[16px] font-medium text-[#524548]"
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
      <div
        className={`overflow-hidden bg-white transition-all duration-300 ease-in-out ${open ? 'max-h-[200px] translate-y-0 opacity-100' : 'max-h-0 -translate-y-2 opacity-0'} `}
        style={{ borderRadius: 0 }}
      >
        {accounts.map((acc, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between px-4 py-3 ${
              idx !== accounts.length - 1 ? 'border-b border-gray-100' : ''
            }`}
            style={{ borderRadius: 0 }}
          >
            <div className="text-left">
              <div className="text-[15px] text-[#524548]">
                {acc.bank} {acc.number}
              </div>
              <div className="text-[15px] text-gray-500">{acc.name}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleCopy(acc)}
                className="flex items-center gap-1 bg-gray-50 px-3 py-1 text-[14px] text-[#333] hover:bg-gray-100"
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
    </div>
  );
}

function BGMPlayer({ playTrigger }: { playTrigger?: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (playTrigger && !playing) {
      audioRef.current?.play();
      setPlaying(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playTrigger]);

  const handlePlay = () => {
    audioRef.current?.play();
    setPlaying(true);
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <audio ref={audioRef} src="/music/sample.mp3" loop style={{ display: 'none' }} />
      <button
        onClick={playing ? handlePause : handlePlay}
        aria-label={playing ? '음악 끄기' : '음악 켜기'}
        className={`flex items-center justify-center rounded-full transition-all duration-200 ease-in-out ${playing ? 'text-[#fff]' : 'text-[#fff]'} `}
      >
        {playing ? <FiVolume2 size={28} /> : <FiVolumeX size={28} />}
      </button>
    </div>
  );
}

function SparkleRain({ count = 24 }) {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100, // vw
        delay: Math.random() * 5, // s
        duration: 3 + Math.random() * 2, // s
        size: 8 + Math.random() * 10, // px
      });
    }
    setSparkles(arr);
  }, [count]);

  return (
    <>
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="sparkle"
          style={{
            left: `${s.left}vw`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            width: s.size,
            height: s.size,
            top: -20,
          }}
        >
          {/* SVG 별/글리터 */}
          <svg width={s.size} height={s.size} viewBox="0 0 20 20" fill="none">
            <g>
              <circle cx="10" cy="10" r="4" fill="#fffbe6" />
              <circle cx="10" cy="10" r="2" fill="#ffe082" />
            </g>
          </svg>
        </div>
      ))}
    </>
  );
}

function PetalRain({ count = 18 }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100, // vw
        delay: Math.random() * 6, // s
        duration: 7 + Math.random() * 4, // s
        size: 18 + Math.random() * 18, // px
        rotate: Math.random() * 360, // deg
      });
    }
    setPetals(arr);
  }, [count]);

  return (
    <>
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}vw`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: p.size,
            height: p.size,
            top: -30,
            transform: `rotate(${p.rotate}deg)`,
            opacity: 0.75,
          }}
        >
          {/* SVG 벚꽃잎 (또는 풀잎) */}
          <svg width={p.size} height={p.size} viewBox="0 0 32 32" fill="none">
            {/* 벚꽃잎 예시 */}
            <path
              d="M16 2 C18 8, 30 10, 16 30 C2 10, 14 8, 16 2 Z"
              fill="#f9c9d2"
              stroke="#e7a1b0"
              strokeWidth="1"
            />
          </svg>
        </div>
      ))}
    </>
  );
}

export default function Home() {
  const [galleryIdx, setGalleryIdx] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);
  const [showPopup, setShowPopup] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [playBGM, setPlayBGM] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out' });
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // 지도 생성은 Script onLoad에서 처리
  }, []);

  const handleClose = () => {
    setFadeOut(true);
    setTimeout(() => setShowPopup(false), 500); // 0.5초 후 완전 제거
  };

  return (
    <div className="font-noto-serif flex min-h-screen w-full flex-col items-center bg-[#fafafa]">
      {/* 팝업 */}
      {showPopup && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="w-full max-w-xs rounded-2xl border border-[#e8dfdf] bg-white/90 px-8 py-10 text-center shadow-2xl">
            {/* 상단 꽃 아이콘 */}
            <div className="mb-4 flex justify-center">
              <Image src="/images/flower.svg" width={100} height={100} alt="flower" />
            </div>
            <div className="mb-5 text-xl font-bold tracking-tight" style={{ color: '#89757a' }}>
              소중한 당신을 초대합니다.
            </div>
            <div className="mb-6 text-sm" style={{ color: '#c2b2b2' }}>
              아래 버튼을 누르면 음악과 함께 초대장이 열립니다.
            </div>
            <button
              className="mt-2 w-full rounded-xl bg-[#89757a] px-4 py-3 text-base font-bold shadow-lg transition-transform duration-200 hover:scale-105"
              style={{
                color: '#fff',
                boxShadow: '0 2px 8px 0 #e8dfdf',
              }}
              onClick={() => {
                handleClose();
                setPlayBGM(true);
              }}
            >
              초대장 열기
            </button>
          </div>
        </div>
      )}
      {/* 대표 이미지 */}
      <div
        className="relative mx-auto flex w-full max-w-md flex-col items-center overflow-hidden"
        data-aos="fade-up"
      >
        <BGMPlayer playTrigger={playBGM} />
        <SparkleRain count={18} />
        <PetalRain count={18} />
        <div className="relative flex h-[100svh] w-full items-center justify-center bg-white">
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
              style={{
                fontFamily: 'Great Vibes, cursive',
                textShadow: '0 0 6px #fff8, 0 0 12px #89757a88',
              }}
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
      <div className="font-noto-serif mx-auto mt-0 flex w-full max-w-md flex-col gap-8 bg-white px-0 pb-10 text-black">
        {/* 날짜/장소 */}
        <section
          className="flex flex-col items-center gap-1 px-8 py-6 text-center"
          data-aos="fade-up"
        >
          <div className="mb-3 text-[20px] font-semibold text-[#333]">
            김윤환&nbsp;&nbsp;|&nbsp;&nbsp;김송희
          </div>
          <div className="text-[17px] text-[#333]">2025년 8월 24일 일요일 오후 1시</div>
          <div className="text-[17px] text-[#333]">라루체 웨딩홀 </div>
        </section>

        {/* 인사말(시) 및 초대 문구 */}
        <section
          className="flex flex-col items-center gap-6 px-8 py-6 text-center"
          data-aos="fade-up"
        >
          {/* 꽃 아이콘 */}
          <div>
            {/* 원하는 꽃 SVG 아이콘을 직접 넣거나, 아래처럼 이모지로 대체 가능 */}
            {/* 우아한 꽃 SVG 아이콘 */}
            <Image src="/images/flower.svg" width={100} height={100} alt="flower" />
          </div>
          {/* 시 */}
          <div className="text-[16px] leading-relaxed whitespace-pre-line text-[#524548]">
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
          <div className="mt-8" data-aos="fade-up">
            <div className="mb-2 text-xs tracking-widest text-[#89757a]">INVITATION</div>
            <div className="mb-2 text-[17px] font-semibold text-[#333]">
              소중한 분들을 초대합니다
            </div>
            <div className="text-[15px] leading-relaxed whitespace-pre-line text-[#524548]">
              새 인생을 시작하는 이 자리에 오셔서
              <br />
              <strong className="font-semibold text-[#89757a]">축복</strong>해 주시면
              감사하겠습니다.
            </div>
          </div>
        </section>
        {/* 신랑신부 사진 + 연락하기 버튼 */}
        <section
          className="flex flex-col items-center gap-6 px-8 py-6 text-center"
          data-aos="fade-up"
        >
          {/* 신랑신부 사진 */}
          <div className="flex w-full justify-center">
            <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden bg-gray-100">
              <Image
                src={galleryImages[2]}
                alt="신랑 신부 사진"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
          <div className="mt-6 mb-2 flex w-full max-w-md justify-between text-[18px] leading-relaxed text-[#524548]">
            {/* 신랑 */}
            <div className="flex flex-1 flex-col items-center">
              <strong className="ml-1 font-semibold text-[#333]">김윤환</strong>
              <div className="mt-2">
                <a
                  href="tel:01012345678"
                  className="mt-4 flex items-center justify-center gap-2 rounded-3xl border border-[#e8dfdf] px-4 py-2 text-[14px] text-[#89757a] transition hover:bg-gray-100"
                  style={{ width: 'fit-content', margin: '0 auto' }}
                >
                  <FaPhoneAlt />
                  연락하기
                </a>
              </div>
            </div>
            {/* 신부 */}
            <div className="flex flex-1 flex-col items-center">
              <strong className="ml-1 font-semibold text-[#333]">김송희</strong>
              <div className="mt-2">
                <a
                  href="tel:01050512473"
                  className="mt-4 flex items-center justify-center gap-2 rounded-3xl border border-[#e8dfdf] px-4 py-2 text-[14px] text-[#89757a] transition hover:bg-gray-100"
                  style={{ width: 'fit-content', margin: '0 auto' }}
                >
                  <FaPhoneAlt />
                  연락하기
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* 캘린더 & D-day 타이머 */}
        <section
          className="flex flex-col items-center gap-4 bg-[#faf8f7] px-8 py-10 text-center"
          data-aos="fade-up"
        >
          {/* 날짜 및 시간 */}
          <div className="text-center">
            <div className="mb-1 text-[24px] font-semibold tracking-widest text-[#333]">
              2025.8.24
            </div>
            <div className="text-[16px] text-[#333]">일요일 오후 1시</div>
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
                <td className="h-8 w-8 align-middle text-[#333]"></td>
                <td className="h-8 w-8 align-middle text-[#333]"></td>
                <td className="h-8 w-8 align-middle text-[#333]"></td>
                <td className="h-8 w-8 align-middle text-[#333]"></td>
                <td className="h-8 w-8 align-middle text-[#333]"></td>
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
                  <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#89757a] font-bold text-white">
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
                <td className="h-8 w-8 align-middle text-[#333]"></td>
                <td className="h-8 w-8 align-middle text-[#333]"></td>
                <td className="h-8 w-8 align-middle text-[#333]"></td>
                <td className="h-8 w-8 align-middle text-[#333]"></td>
                <td className="h-8 w-8 align-middle text-[#333]"></td>
                <td className="h-8 w-8 align-middle text-[#333]"></td>
              </tr>
            </tbody>
          </table>

          <div className="mb-4 w-full border-t border-gray-200" />

          {/* 남은 날짜 안내 */}
          <div className="text-center text-[15px]">
            <strong className="font-semibold text-[#524548]">윤환</strong>
            <span className="mx-1 text-[#e57373]">♥</span>
            <strong className="font-semibold text-[#524548]">송희의 결혼식이</strong>
            <span className="mx-1 font-semibold text-[#e57373]">{dday}일</span>
            <strong className="font-semibold text-[#524548]">남았습니다.</strong>
          </div>
        </section>
        {/* 갤러리(슬라이드) */}
        <section className="px-8 py-6" data-aos="fade-up">
          <div className="mb-6 flex flex-col items-center gap-1">
            <p className="text-xs tracking-widest text-[#89757a]">GALLERY</p>
            <p className="text-[20px] font-semibold text-[#89757a]">갤러리</p>
          </div>
          <Swiper
            spaceBetween={8}
            slidesPerView={1}
            onSlideChange={(swiper) => setGalleryIdx(swiper.activeIndex)}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {galleryImages.map((src, i) => (
              <SwiperSlide key={src}>
                <div className="relative h-120 w-full">
                  <Image src={src} alt={`갤러리${i + 1}`} fill className="object-contain" />
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
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs tracking-widest text-[#89757a]">LOCATION</p>
            <p className="text-[20px] font-semibold text-[#89757a]">오시는 길</p>
          </div>
          <div className="text-[16px] text-[#333]">
            <div className="flex items-center justify-center gap-2 font-semibold">
              <FaMapMarkerAlt /> 명동 라루체 웨딩홀
            </div>
            <p className="mt-1 text-center">서울특별시 중구 퇴계로 18길 46</p>
          </div>

          {/* 카카오맵 지도 */}
          <div
            id="kakao-map"
            style={{ width: '100%', height: 230, borderRadius: 8, overflow: 'hidden' }}
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
                    center: new kakao.maps.LatLng(37.559185, 126.984395), // 서울 중구 퇴계로18길 46
                    level: 4,
                  };
                  const map = new kakao.maps.Map(container, options);
                  new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(37.559185, 126.984395),
                    map,
                    title: '라루체웨딩홀 (명동)',
                  });
                });
              }
            }}
          />
          <div className="flex flex-col gap-6 rounded-xl border border-[#e8dfdf] bg-white/90 p-6">
            {/* 지하철 */}
            <div className="flex items-start gap-4">
              <FaSubway className="text-[#cec3c3]" size={28} />
              <div className="flex-1">
                <div className="mb-1 font-bold text-[#524548]">지하철</div>
                <div className="text-[15px] leading-relaxed text-[#544f4f]">
                  <span className="font-semibold">4호선 명동역 3번출구</span> (퍼시픽 호텔 우측길로
                  60M)
                </div>
              </div>
            </div>
            <hr className="border-t border-[#e8dfdf]" />
            {/* 버스 */}
            <div className="flex items-start gap-4">
              <FaBus className="text-[#cec3c3]" size={28} />
              <div className="flex-1">
                <div className="mb-1 font-bold text-[#524548]">버스</div>
                <div className="text-[15px] leading-relaxed text-[#544f4f]">
                  <span className="font-semibold">퇴계로2가.명동역</span> <br />
                  104, 105, 421, 463, 507, 604, N16, 7011 <br />
                  <br />
                  <span className="font-semibold">명동입구</span> <br />
                  104, 421, 463, 507, 604, N16, 7011, 05
                </div>
              </div>
            </div>
            <hr className="border-t border-[#e8dfdf]" />
            {/* 자가용 */}
            <div className="flex items-start gap-4">
              <FaParking className="text-[#cec3c3]" size={28} />
              <div className="flex-1">
                <div className="mb-1 font-bold text-[#524548]">자가용</div>
                <div className="text-[15px] leading-relaxed text-[#544f4f]">
                  <span className="font-semibold">강남에서 오실때</span>
                  <br />
                  반포대교 &gt; 남산3호터널 &gt; 통과 후, 쌍용 플레티넘 아파트 옆에서 우회전 &gt;
                  아파트 끼고 좌회전 후 라루체 진입
                  <br />
                  <br />
                  <span className="font-semibold">서울역에서 오실때</span>
                  <br />
                  서울역에서 퇴계로 방면으로 진입 &gt; 회현역 &gt; 회현사거리에서 직진 &gt;
                  스테이트타워와 뉴오리엔탈호텔 사이로 우회전 &gt; 왼쪽 첫번째 골목 라루체
                  <br />
                  <br />
                  <span className="font-semibold">왕십리방향에서 오실때</span>
                  <br />
                  왕십리역 &gt; 퇴계로에서 남대문 방향으로 직진 &gt; 퇴계로2가 지하차도 &gt;
                  회현사거리 신세계백화점 앞에서 유턴 후 직진 &gt; 스테이트타워와 뉴오리엔탈호텔
                  사이로 우회전 &gt; 왼쪽 첫번째 골목 라루체
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 계좌번호(드롭다운) */}
        <section
          className="flex flex-col items-center gap-4 px-8 py-6 text-center"
          data-aos="fade-up"
        >
          <div>
            {/* 꽃 SVG */}
            <Image src="/images/flower.svg" width={100} height={100} alt="flower" />
          </div>
          <div className="mb-4 text-[20px] font-semibold text-[#89757a]">마음 전하실 곳</div>
          <AccountDropdown
            label="신랑측 계좌번호"
            accounts={[
              { bank: '신한은행', number: '110-104-176731', name: '김 철' },
              { bank: '신한은행', number: '553-11-004483', name: '권조희' },
              { bank: '신한은행', number: '851-12-545579', name: '김윤환' },
            ]}
          />
          <AccountDropdown
            label="신부측 계좌번호"
            accounts={[
              { bank: '카카오뱅크', number: '1111111-111111', name: '백주선' },
              { bank: '카카오뱅크', number: '1111111-111111', name: '송영미' },
              { bank: '카카오뱅크', number: '1111111-111111', name: '김송희' },
            ]}
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
