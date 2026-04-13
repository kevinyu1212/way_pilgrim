import React, { useState } from 'react';
import axios from 'axios';
import SignupStep1 from './pages/auth/SignupStep1';
import SignupStep2 from './pages/auth/SignupStep2';

function App() {
  const [step, setStep] = useState(1);
  const [totalData, setTotalData] = useState({});

  const nextStep = async (newData) => {
    const updatedData = { ...totalData, ...newData };
    setTotalData(updatedData);

    // 2단계가 끝났을 때 백엔드로 최종 전송
    if (step === 2) {
      try {
        await axios.post('http://localhost:5000/api/auth/signup', {
          email: updatedData.email,
          password: updatedData.password,
          nickname: updatedData.nickname,
          initiation_type: updatedData.status, // 'new', 'return' 등
          first_confession: updatedData.confession
        });
        alert('순례자로 등록되었습니다!');
        setStep(3);
      } catch (err) {
        alert('저장 중 오류가 발생했습니다.');
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
      {step === 3 && (
        <div className="min-h-screen bg-[#F8F8F5] flex flex-col items-center justify-center font-serif">
          <h2 className="text-4xl text-[#1A237E] font-bold mb-4">입성 완료</h2>
          <p className="text-gray-500">이제 WayPilgrim의 모든 공간을 이용하실 수 있습니다.</p>
        </div>
      )}
    </div>
  );
}

export default App;
