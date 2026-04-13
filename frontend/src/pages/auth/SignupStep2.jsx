import React, { useState } from 'react';
import { Heart, Compass, Anchor, Sun, Shield, Send } from 'lucide-react';

const options = [
  { id: 'new', icon: Sun, title: '새신자', desc: '이제 막 신앙을 시작한 설렘', color: 'text-orange-400' },
  { id: 'return', icon: Compass, title: '회귀자', desc: '방황 끝에 다시 돌아온 아늑함', color: 'text-blue-400' },
  { id: 'healing', icon: Heart, title: '치유', desc: '상처받은 마음을 향한 위로', color: 'text-red-400' },
  { id: 'walking', icon: Anchor, title: '동행', desc: '주님과 더 깊이 걷고 싶은 소망', color: 'text-teal-400' },
  { id: 'training', icon: Shield, title: '훈련', desc: '말씀과 기도로 단련되는 결단', color: 'text-indigo-400' },
];

const SignupStep2 = ({ nextStep, prevStep }) => {
  const [selected, setSelected] = useState(null);
  const [confession, setConfession] = useState('');

  return (
    <div className="min-h-screen bg-[#F8F8F5] flex items-center justify-center p-6 font-serif">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.03)] w-full max-w-2xl border border-gray-50">
        
        <div className="text-center mb-10">
          <span className="text-[#556B2F] text-sm font-bold tracking-widest uppercase">Step 02. 고백</span>
          <h2 className="text-3xl font-bold text-[#1A237E] mt-2">지금 당신의 마음은 어디에 있나요?</h2>
          <p className="text-gray-400 mt-2">가장 가까운 영적 상태를 선택해 주세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-8">
          {options.map((opt) => (
            <div 
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`flex items-center p-5 rounded-2xl cursor-pointer transition-all border-2 ${
                selected === opt.id 
                ? 'border-[#556B2F] bg-[#F0F4E8]' 
                : 'border-gray-50 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className={`p-3 rounded-xl bg-white shadow-sm mr-5 ${opt.color}`}>
                <opt.icon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#1A237E]">{opt.title}</h3>
                <p className="text-sm text-gray-500">{opt.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-10">
          <label className="text-sm font-bold text-gray-400 ml-1 mb-2 block">하나님께 드리는 첫마디</label>
          <textarea 
            placeholder="마음속에 있는 고백을 짧게 적어보세요."
            className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-[#556B2F] outline-none h-24 resize-none text-gray-700"
            onChange={(e) => setConfession(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <button onClick={prevStep} className="flex-1 py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors">이전으로</button>
          <button 
            onClick={() => nextStep({ status: selected, confession })}
            disabled={!selected}
            className={`flex-[2] py-4 rounded-xl font-bold transition-all shadow-lg ${
              selected ? 'bg-[#1A237E] text-white hover:bg-[#0D145A]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            마음 전하기
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignupStep2;
