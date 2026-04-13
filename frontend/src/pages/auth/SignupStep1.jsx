import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Lock, User, CheckCircle2, LogIn } from 'lucide-react';

const SignupStep1 = ({ nextStep }) => {
  const [isLogin, setIsLogin] = useState(false); // 로그인/회원가입 모드 전환
  const [formData, setFormData] = useState({ email: '', password: '', nickname: '' });
  const [status, setStatus] = useState({ emailChecked: false, nicknameChecked: false });

  const checkDuplicate = async (type, value) => {
    if (!value) return alert(`${type === 'email' ? '이메일' : '닉네임'}을 입력해주세요.`);
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/check-${type}`, { [type]: value });
      if (res.data.isDuplicate) {
        alert(`이미 사용 중인 ${type === 'email' ? '이메일' : '닉네임'}입니다.`);
        setStatus(prev => ({ ...prev, [`${type}Checked`]: false }));
      } else {
        alert(`사용 가능한 ${type === 'email' ? '이메일' : '닉네임'}입니다.`);
        setStatus(prev => ({ ...prev, [`${type}Checked`]: true }));
      }
    } catch (err) {
      alert('백엔드 서버 연결을 확인해주세요.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // 로그인 로직
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password
        });
        alert(`${res.data.user.nickname}님, 환영합니다!`);
        window.location.reload(); // 성공 시 메인으로 (또는 대성당 페이지 이동)
      } catch (err) {
        alert(err.response?.data?.error || '로그인에 실패했습니다.');
      }
    } else {
      // 회원가입 단계 이동 로직
      if (!status.emailChecked || !status.nicknameChecked) {
        return alert('이메일과 닉네임 중복 확인을 먼저 해주세요.');
      }
      nextStep(formData);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F5] flex items-center justify-center p-6 font-serif">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl w-full max-w-lg">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#1A237E] mb-2">{isLogin ? '재회' : '환대'}</h2>
          <p className="text-gray-400">
            {isLogin ? '다시 오신 것을 환영합니다.' : '순례를 시작하기 위한 첫 걸음을 떼어주세요.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">이메일 주소</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  type="email" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1A237E]"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="example@gmail.com"
                  required
                />
              </div>
              {!isLogin && (
                <button type="button" onClick={() => checkDuplicate('email', formData.email)} className="px-4 py-2 text-sm font-bold text-[#556B2F] hover:bg-gray-100 rounded-xl transition-all">중복확인</button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              <input 
                type="password" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1A237E]"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">호칭(닉네임)</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#1A237E]"
                    value={formData.nickname}
                    onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                    placeholder="건우"
                  />
                </div>
                <button type="button" onClick={() => checkDuplicate('nickname', formData.nickname)} className="px-4 py-2 text-sm font-bold text-[#556B2F] hover:bg-gray-100 rounded-xl transition-all">중복확인</button>
              </div>
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-5 bg-[#1A237E] text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-[#0D145A] transition-all flex items-center justify-center gap-2"
          >
            {isLogin ? '성소로 들어가기' : '천천히 들어가기'} {isLogin ? <LogIn size={20} /> : <CheckCircle2 size={20} />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            {isLogin ? '아직 순례자가 아니신가요?' : '이미 계정이 있으신가요?'}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-[#556B2F] font-bold hover:underline"
            >
              {isLogin ? '회원가입하기' : '로그인하기'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignupStep1;
