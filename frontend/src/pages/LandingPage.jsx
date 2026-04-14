import React, { useState } from 'react';
import SignupStep1 from './auth/SignupStep1';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const LandingPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      login(res.data.user);
    } catch (err) {
      alert(err.response?.data?.error || '로그인에 실패했습니다.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F8F5', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#1A237E', margin: 0 }}>여정의 시작</h1>
      </div>

      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#ffffff', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', padding: '40px', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#333', marginBottom: '8px' }}>
            {isLoginView ? '재회' : '환대'}
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#999', margin: 0 }}>
            {isLoginView ? '평안을 빕니다.' : '여정의 시작을 함께합니다.'}
          </p>
        </div>

        {isLoginView ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input 
              type="email" placeholder="이메일" 
              style={{ width: '100%', padding: '16px', backgroundColor: '#F3F4F6', border: 'none', borderRadius: '16px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
              value={email} onChange={(e) => setEmail(e.target.value)} required
            />
            <input 
              type="password" placeholder="비밀번호" 
              style={{ width: '100%', padding: '16px', backgroundColor: '#F3F4F6', border: 'none', borderRadius: '16px', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
              value={password} onChange={(e) => setPassword(e.target.value)} required
            />
            <button type="submit" style={{ width: '100%', padding: '16px', backgroundColor: '#1A237E', color: '#fff', border: 'none', borderRadius: '16px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', marginTop: '10px' }}>
              성소로 들어가기 →
            </button>
            <button type="button" onClick={() => setIsLoginView(false)} style={{ background: 'none', border: 'none', color: '#C5A059', fontWeight: '700', fontSize: '0.9rem', marginTop: '20px', cursor: 'pointer' }}>
              새로운 여정 시작하기 (가입)
            </button>
          </form>
        ) : (
          <SignupStep1 onBack={() => setIsLoginView(true)} onSignupSuccess={(userData) => login(userData)} />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
