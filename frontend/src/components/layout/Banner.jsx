import React, { useState, useEffect, useCallback, useRef } from 'react';

const Banner = () => {
  const slides = [
    { 
      title: "WayPilgrim", 
      sub: "당신과 함께 걷는 믿음의 여정",
      desc: "혼자 고민하지 마세요. 당신의 신앙이 다시 꽃피울 수 있도록 우리가 곁에서 함께 걷겠습니다.",
      img: "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=2071"
    },
    { 
      title: "Navigator", 
      sub: "다시 시작하는 이들을 위한 이정표",
      desc: "신앙의 첫걸음을 떼는 분도, 다시 돌아온 분도 길을 잃지 않도록 따스한 길잡이가 되어드립니다.",
      img: "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?q=80&w=2070"
    },
    { 
      title: "Archive", 
      sub: "마음의 조각을 모으는 공간",
      desc: "작고 서툰 고백이라도 괜찮습니다. 당신만의 신앙 일기로 영성을 조금씩 쌓아보세요.",
      img: "https://images.unsplash.com/photo-1506784919141-93554da2e02d?q=80&w=2070"
    },
    { 
      title: "Fellowship", 
      sub: "기다리고 있었습니다",
      desc: "서먹함은 잠시, 같은 고민을 나누는 동료들과 함께하며 공동체의 온기를 느껴보세요.",
      img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070"
    },
    { 
      title: "Meditation", 
      sub: "지친 영혼을 위한 쉼표",
      desc: "신앙심이 부족하다고 느껴질 때, 부담 없는 짧은 묵상으로 내면의 평안을 찾아보세요.",
      img: "https://images.unsplash.com/photo-1499209974431-9dac3adaf471?q=80&w=2070"
    }
  ];

  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // 7초 자동 재생 설정
  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 7000);
    return () => clearInterval(timerRef.current);
  }, [nextSlide]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '550px', overflow: 'hidden', backgroundColor: '#111' }}>
      
      {/* 슬라이드 트랙 */}
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>
        {slides.map((slide, index) => (
          <div key={index} style={{ 
            minWidth: '100%', 
            height: '100%', 
            position: 'absolute', 
            left: 0, 
            top: 0,
            backgroundImage: `url(${slide.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.2s ease',
            transform: `translateX(${(index - current) * 100}%)`,
            zIndex: current === index ? 2 : 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* 오버레이 */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.55)', zIndex: 1 }} />
            
            {/* 텍스트 콘텐츠 */}
            <div style={{ 
              position: 'relative', 
              zIndex: 3, 
              color: '#fff', 
              textAlign: 'center',
              padding: '0 40px',
              maxWidth: '900px',
              opacity: current === index ? 1 : 0,
              transform: current === index ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease 0.4s' 
            }}>
              <h2 style={{ color: '#C5A059', fontSize: '1.2rem', fontWeight: '700', marginBottom: '15px', letterSpacing: '4px' }}>
                {slide.title}
              </h2>
              <h1 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '25px', lineHeight: '1.3', textShadow: '0 4px 15px rgba(0,0,0,0.6)', wordBreak: 'keep-all' }}>
                {slide.sub}
              </h1>
              <p style={{ fontSize: '1.3rem', lineHeight: '1.8', opacity: 0.9, wordBreak: 'keep-all' }}>
                {slide.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 바 형태의 인디케이터 (클릭하면 해당 페이지로 이동 기능 유지) */}
      <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '15px', zIndex: 10 }}>
        {slides.map((_, index) => (
          <div 
            key={index} 
            onClick={() => setCurrent(index)}
            style={{ 
              width: current === index ? '60px' : '12px', 
              height: '5px', 
              borderRadius: '3px', 
              backgroundColor: current === index ? '#C5A059' : 'rgba(255,255,255,0.35)', 
              cursor: 'pointer',
              transition: 'all 0.6s ease'
            }} 
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
