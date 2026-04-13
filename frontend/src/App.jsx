import React, { useState } from 'react';
import SignupStep1 from './pages/auth/SignupStep1';

function App() {
  const [step, setStep] = useState(1);
  const nextStep = () => setStep(prev => prev + 1);

  return (
    <div className="App">
      {step === 1 && <SignupStep1 nextStep={nextStep} />}
      {step === 2 && (
        <div className="min-h-screen bg-pilgrim-beige flex items-center justify-center font-serif">
          <h2 className="text-2xl text-pilgrim-navy">2단계: 고백 (순례자의 마음을 준비 중입니다...)</h2>
        </div>
      )}
    </div>
  );
}

export default App;
