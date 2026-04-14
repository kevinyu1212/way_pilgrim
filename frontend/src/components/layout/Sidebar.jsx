import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose, onGoMyPage }) => {
  const { user, logout } = useAuth();

  // 프로필 설정 클릭 시 처리
  const handleProfileClick = () => {
    if (typeof onGoMyPage === 'function') {
      onGoMyPage();
    }
    onClose();
  };

  // 백엔드 서버 주소 (이미지 풀 경로 생성을 위해 필요)
  const BACKEND_URL = 'http://localhost:5000';

  return (
    <>
      {/* 배경 오버레이 */}
      {isOpen && (
        <div 
          onClick={onClose}
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999 }}
        />
      )}
      {/* 사이드바 본체 */}
      <div style={{ 
        position: 'fixed', top: 0, right: isOpen ? 0 : '-350px', width: '350px', height: '100%', 
        backgroundColor: '#fff', zIndex: 1000, transition: '0.3s ease-in-out', 
        display: 'flex', flexDirection: 'column', boxShadow: '-5px 0 15px rgba(0,0,0,0.1)'
      }}>
        {/* 상단 닫기 버튼 */}
        <div style={{ padding: '20px', textAlign: 'right' }}>
          <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#666' }}>✕</button>
        </div>

        {/* 프로필 섹션 */}
        <div style={{ padding: '0 30px 30px 30px', borderBottom: '1px solid #F0F0F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            
            {/* [수정 영역] 프로필 사진 또는 기본 아이콘 */}
            <div style={{ 
              width: '65px', height: '65px', borderRadius: '50%', backgroundColor: '#F3F4F6', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem',
              overflow: 'hidden', border: '2px solid #EEE'
            }}>
              {user?.profile_img ? (
                <img 
                  src={`${BACKEND_URL}${user.profile_img}`} 
                  alt="프로필" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    // 이미지 불러오기 실패 시 기본 아이콘으로 대체하는 Fallback 로직
                    e.target.style.display = 'none'; 
                    e.target.parentNode.innerHTML = '👤'; 
                  }}
                />
              ) : (
                '👤' // 이미지가 없을 때
              )}
            </div>

            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1A237E' }}>{user?.nickname || '순례자'} 님</div>
              <div style={{ fontSize: '0.85rem', color: '#888' }}>{user?.email}</div>
            </div>
          </div>
          <button 
            onClick={handleProfileClick}
            style={{ 
              width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: '#F8F9FA', 
              border: '1px solid #EEE', color: '#555', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem'
            }}
          >
            프로필 설정 바로가기
          </button>
        </div>

        {/* 메뉴 리스트 */}
        <nav style={{ padding: '20px 10px', flex: 1 }}>
          <button onClick={handleProfileClick} style={menuItemStyle}>👤 프로필 설정</button>
          <button style={menuItemStyle}>📜 나의 여정 기록</button>
          <button style={menuItemStyle}>💬 커뮤니티</button>
          <button style={menuItemStyle}>⚙️ 환경 설정</button>
        </nav>

        {/* 하단 로그아웃 */}
        <div style={{ padding: '20px', borderTop: '1px solid #F0F0F0' }}>
          <button 
            onClick={() => { logout(); onClose(); }} 
            style={{ width: '100%', padding: '12px', color: '#FF5252', border: 'none', background: 'none', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}
          >
            🚪 로그아웃
          </button>
        </div>
      </div>
    </>
  );
};

const menuItemStyle = { 
  width: '100%', padding: '15px 20px', textAlign: 'left', border: 'none', 
  background: 'none', fontSize: '1.05rem', fontWeight: '600', cursor: 'pointer', color: '#333',
  display: 'flex', alignItems: 'center', gap: '10px'
};

export default Sidebar;
