import React, { useState } from 'react';
import axios from 'axios';

const SignupStep1 = ({ onBack, onSignupSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const checkEmail = async () => {
    if (!email) return alert('이메일을 입력해주세요.');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/check-email', { email });
      if (res.data.available) {
        alert('사용 가능한 이메일입니다.');
        setIsEmailChecked(true);
      } else {
        alert('이미 사용 중인 이메일입니다.');
      }
    } catch (err) { alert('서버 연결 확인 필요'); }
  };

  const checkNickname = async () => {
    if (!nickname) return alert('닉네임을 입력해주세요.');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/check-nickname', { nickname });
      if (res.data.available) {
        alert('사용 가능한 닉네임입니다.');
        setIsNicknameChecked(true);
      } else {
        alert('이미 사용 중인 닉네임입니다.');
      }
    } catch (err) { alert('서버 연결 확인 필요'); }
  };

  const handleSignup = async () => {
    if (!isEmailChecked || !isNicknameChecked) return alert('중복 확인을 완료해주세요.');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { email, password, nickname });
      alert('환영합니다! 순례의 길에 들어서셨습니다.');
      onSignupSuccess(res.data.user); // 성공 시 부모의 login 함수 실행 -> 홈으로 이동
    } catch (err) {
      alert(err.response?.data?.error || '회원가입 중 오류가 발생했습니다.');
    }
  };

  const inputStyle = { flex: 1, padding: '16px', backgroundColor: '#F3F4F6', border: 'none', borderRadius: '16px', outline: 'none' };
  const btnStyle = { padding: '0 15px', color: '#1A237E', fontWeight: '700', cursor: 'pointer', border: 'none', background: 'none' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input type="email" placeholder="이메일" style={inputStyle} value={email} onChange={(e) => { setEmail(e.target.value); setIsEmailChecked(false); }} />
        <button onClick={checkEmail} style={btnStyle}>확인</button>
      </div>
      <input type="password" placeholder="비밀번호" style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }} value={password} onChange={(e) => setPassword(e.target.value)} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input type="text" placeholder="닉네임" style={inputStyle} value={nickname} onChange={(e) => { setNickname(e.target.value); setIsNicknameChecked(false); }} />
        <button onClick={checkNickname} style={btnStyle}>확인</button>
      </div>
      <button onClick={handleSignup} style={{ width: '100%', padding: '16px', backgroundColor: (isEmailChecked && isNicknameChecked) ? '#1A237E' : '#999', color: '#fff', border: 'none', borderRadius: '16px', fontWeight: '700', cursor: 'pointer', marginTop: '10px' }}>
        천천히 들어가기 🧭
      </button>
      <button type="button" onClick={onBack} style={{ background: 'none', border: 'none', color: '#999', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer' }}>
        이미 순례자이신가요? (로그인)
      </button>
    </div>
  );
};

export default SignupStep1;
