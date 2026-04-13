import React, { useState } from 'react';
import axios from 'axios';
import SignupStep1 from './pages/auth/SignupStep1';
import SignupStep2 from './pages/auth/SignupStep2';
import SignupStep3 from './pages/auth/SignupStep3';

function App() {
  const [step, setStep] = useState(1);
  const [totalData, setTotalData] = useState({});

  const nextStep = async (newData) => {
    const updatedData = { ...totalData, ...newData };
    setTotalData(updatedData);

    if (step === 3) {
      try {
        // 백엔드로 최종 데이터 전송
        await axios.post('http://localhost:5000/api/auth/signup', {
          email: updatedData.email,
          password: updatedData.password,
          nickname: updatedData.nickname,
          initiation_type: updatedData.status,
          first_confession: updatedData.confession,
          interests: updatedData.interests
        });
        alert('순례길의 동반자가 되신 것을 환영합니다!');
        setStep(4);
      } catch (err) {
        console.error(err);
        alert('저장 중 오류가 발생했습니다. 백엔드 서버를 확인해주세요.');
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
        <div className="min-h-screen bg-[#F8F8F5] flex flex-col items-center justify-center font-serif p-6">
          <div className="text-center animate-bounce mb-8">
            <span className="text-6xl">⛪</span>
          </div>
          <h2 className="text-5xl text-[#1A237E] font-bold mb-6">입성 완료</h2>
          <p className="text-xl text-gray-500 mb-10 text-center leading-relaxed">
            이제 WayPilgrim의 모든 성벽 안을 거닐 수 있습니다.<br/>
            당신의 순례가 평안하기를 빕니다.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-12 py-4 bg-[#556B2F] text-white rounded-full font-bold hover:bg-[#3E4F22] transition-all shadow-xl text-lg"
          >
            대성당 광장으로 가기
          </button>
        </div>
      )}
    </div>
  );
}

export default App; // 이 부분이 핵심입니다!
