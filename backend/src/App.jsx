import React, { useState } from 'react';
import axios from 'axios';
import SignupStep1 from './pages/auth/SignupStep1';
import SignupStep2 from './pages/auth/SignupStep2';
import SignupStep3 from './pages/auth/SignupStep3';

function App() {
  const [step, setStep] = useState(1);
  const [totalData, setTotalData] = useState({});

  const nextStep = async (newData) => {
    // 이벤트 객체가 들어오는 것을 방지하고 순수 데이터만 병합
    if (newData && newData.nativeEvent) return; 

    const updatedData = { ...totalData, ...newData };
    setTotalData(updatedData);

    if (step === 3) {
      try {
        // 백엔드 형식이 요구하는 필드만 명확히 추출해서 전송
        const finalPayload = {
          email: updatedData.email,
          password: updatedData.password,
          nickname: updatedData.nickname,
          initiation_type: updatedData.status,
          first_confession: updatedData.confession,
          interests: updatedData.interests
        };

        console.log("🚀 최종 전송 데이터:", finalPayload);
        const response = await axios.post('http://localhost:5000/api/auth/signup', finalPayload);
        
        if (response.status === 201) {
          setStep(4);
        }
      } catch (err) {
        console.error("❌ 가입 에러:", err.response?.data || err.message);
        alert(`가입 실패: ${err.response?.data?.error || '서버 연결 확인 필요'}`);
      }
    } else {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="App">
      {step === 1 && <SignupStep1 nextStep={nextStep} />}
      {step === 2 && <SignupStep2 nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <SignupStep3 nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && (
        <div className="min-h-screen bg-[#F8F8F5] flex flex-col items-center justify-center font-serif text-center p-6">
          <div className="animate-bounce text-6xl mb-6">⛪</div>
          <h2 className="text-4xl font-bold text-[#1A237E] mb-4">순례 입성 완료</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            이제 WayPilgrim의 모든 길을 거닐 수 있습니다.<br/>
            당신의 여정에 평안이 가득하기를 빕니다.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-10 py-4 bg-[#556B2F] text-white rounded-full font-bold shadow-xl hover:bg-[#3E4F22] transition-all"
          >
            대성당 광장으로 가기
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
