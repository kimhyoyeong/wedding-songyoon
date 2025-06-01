import React, { useState, useEffect } from 'react';

export default function PetalRain({ count = 18 }: { count?: number }) {
  const [petals, setPetals] = useState<
    {
      id: number;
      left: number;
      delay: number;
      duration: number;
      size: number;
      rotate: number;
    }[]
  >([]);

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
          <svg width={p.size} height={p.size} viewBox="0 0 32 32" fill="none">
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
