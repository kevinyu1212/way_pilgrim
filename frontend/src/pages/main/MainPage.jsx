import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Banner from '../../components/layout/Banner';
import Footer from '../../components/layout/Footer';

const MainPage = ({ onGoMyPage }) => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 카드 클릭 시 실행될 함수
  const handleCardClick = (title) => {
    alert(`${title} 기능을 준비 중입니다.`);
    // 나중에 각 페이지 이동 로직(예: setCurrentPage 등)을 여기에 추가하면 됩니다.
  };

  const cardData = [
    { title: 'Navigator', icon: '🧭', color: '#E3F2FD' },
    { title: 'Archive', icon: '📜', color: '#FFF3E0' },
    { title: 'Fellowship', icon: '🤝', color: '#F1F8E9' },
    { title: 'Meditation', icon: '🧘', color: '#F3E5F5' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8F8F5' }}>
      <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onGoMyPage={onGoMyPage}
      />

      <div style={{ flex: 1 }}>
        <Banner />

        {/* 카드 메뉴 섹션 */}
        <section style={{ 
          maxWidth: '1100px', margin: '0 auto', display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px', padding: '40px 20px' 
        }}>
          {cardData.map((item) => (
            <div 
              key={item.title} 
              onClick={() => handleCardClick(item.title)}
              style={{ 
                backgroundColor: '#fff', padding: '50px 20px', borderRadius: '32px', 
                textAlign: 'center', boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
                cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
                border: '1px solid #f0f0f0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.05)';
              }}
            >
              <div style={{ 
                fontSize: '2.5rem', marginBottom: '15px', width: '70px', height: '70px', 
                lineHeight: '70px', backgroundColor: item.color, borderRadius: '20px', margin: '0 auto 20px' 
              }}>
                {item.icon}
              </div>
              <h3 style={{ color: '#1A237E', margin: 0, fontWeight: '800', fontSize: '1.3rem' }}>{item.title}</h3>
              <p style={{ color: '#999', fontSize: '0.9rem', marginTop: '10px' }}>바로가기</p>
            </div>
          ))}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;
