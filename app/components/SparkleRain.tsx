import React, { useState, useEffect } from 'react';

type Sparkle = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
};

export default function SparkleRain({ count = 24 }: { count?: number }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const arr: Sparkle[] = [];
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
