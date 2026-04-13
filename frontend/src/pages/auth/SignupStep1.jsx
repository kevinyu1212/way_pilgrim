import React, { useState } from 'react';
import { checkEmail, checkNickname } from '../../services/auth';
import { User, Mail, Lock, ChevronRight } from 'lucide-react';

const SignupStep1 = ({ nextStep }) => {
  const [formData, setFormData] = useState({ email: '', password: '', nickname: '' });

  const handleCheck = async (type, value) => {
    if(!value) return alert('내용을 입력해주세요.');
    try {
      const { data } = type === 'email' ? await checkEmail(value) : await checkNickname(value);
      alert(data.isDuplicate ? '이미 사용 중입니다.' : '사용 가능합니다!');
    } catch (err) { alert('연결 오류가 발생했습니다. 백엔드 서버를 확인해주세요.'); }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F5] flex items-center justify-center p-6">
      <div className="bg-white p-12 rounded-[2rem] shadow-[0_10px_50px_rgba(0,0,0,0.04)] w-full max-w-lg border border-[#EEE]">
        
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1A237E] mb-4 tracking-tight">환대</h2>
          <div className="h-1 w-12 bg-[#556B2F] mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-500 font-light leading-relaxed">
            WayPilgrim의 성벽 안으로 오신 것을 환영합니다.<br/>
            순례를 시작하기 위한 첫 걸음을 떼어주세요.
          </p>
        </div>

        {/* 입력 필드 섹션 */}
        <div className="space-y-10">
          {/* 이메일 */}
          <div className="group">
            <label className="text-sm font-semibold text-gray-400 ml-1 mb-2 block group-focus-within:text-[#556B2F] transition-colors">이메일 주소</label>
            <div className="relative border-b-2 border-gray-100 group-focus-within:border-[#556B2F] transition-all pb-2">
              <Mail className="absolute left-0 top-1 text-gray-300 w-5 h-5" />
              <input 
                type="email" 
                placeholder="example@mail.com" 
                className="w-full pl-8 pr-20 py-1 bg-transparent outline-none text-xl text-gray-700 placeholder:text-gray-200"
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
              />
              <button 
                onClick={() => handleCheck('email', formData.email)} 
                className="absolute right-0 top-1 text-sm font-bold text-[#556B2F] hover:bg-[#F0F4E8] px-3 py-1 rounded-full transition-colors"
              >
                중복확인
              </button>
            </div>
          </div>

          {/* 비밀번호 */}
          <div className="group">
            <label className="text-sm font-semibold text-gray-400 ml-1 mb-2 block group-focus-within:text-[#556B2F] transition-colors">비밀번호</label>
            <div className="relative border-b-2 border-gray-100 group-focus-within:border-[#556B2F] transition-all pb-2">
              <Lock className="absolute left-0 top-1 text-gray-300 w-5 h-5" />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full pl-8 py-1 bg-transparent outline-none text-xl text-gray-700 placeholder:text-gray-200"
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
              />
            </div>
          </div>

          {/* 호칭 */}
          <div className="group">
            <label className="text-sm font-semibold text-gray-400 ml-1 mb-2 block group-focus-within:text-[#556B2F] transition-colors">호칭(닉네임)</label>
            <div className="relative border-b-2 border-gray-100 group-focus-within:border-[#556B2F] transition-all pb-2">
              <User className="absolute left-0 top-1 text-gray-300 w-5 h-5" />
              <input 
                type="text" 
                placeholder="주님 안에서 불릴 이름" 
                className="w-full pl-8 pr-20 py-1 bg-transparent outline-none text-xl text-gray-700 placeholder:text-gray-200"
                onChange={(e) => setFormData({...formData, nickname: e.target.value})} 
              />
              <button 
                onClick={() => handleCheck('nickname', formData.nickname)} 
                className="absolute right-0 top-1 text-sm font-bold text-[#556B2F] hover:bg-[#F0F4E8] px-3 py-1 rounded-full transition-colors"
              >
                중복확인
              </button>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <button 
          onClick={nextStep} 
          className="w-full mt-16 bg-[#1A237E] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#0D145A] shadow-lg shadow-blue-100 flex items-center justify-center group transition-all"
        >
          <span>천천히 들어가기</span>
          <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
export default SignupStep1;
