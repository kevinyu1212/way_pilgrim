import React, { useState } from 'react';
import { Music, BookOpen, MessageCircle, Heart, Coffee, Leaf, Check } from 'lucide-react';

const interests = [
  { id: 'worship', label: '찬양과 예배', icon: Music, color: 'bg-orange-50 text-orange-600' },
  { id: 'bible', label: '말씀 깊이 읽기', icon: BookOpen, color: 'bg-blue-50 text-blue-600' },
  { id: 'prayer', label: '침묵과 기도', icon: Leaf, color: 'bg-green-50 text-green-600' },
  { id: 'fellowship', label: '공동체와 교제', icon: MessageCircle, color: 'bg-purple-50 text-purple-600' },
  { id: 'service', label: '봉사와 나눔', icon: Heart, color: 'bg-red-50 text-red-600' },
  { id: 'culture', label: '기독교 문화/예술', icon: Coffee, color: 'bg-yellow-50 text-yellow-600' },
];

const SignupStep3 = ({ nextStep, prevStep }) => {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleInterest = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F8F5] flex items-center justify-center p-6 font-serif">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.03)] w-full max-w-2xl border border-gray-50">
        
        <div className="text-center mb-10">
          <span className="text-[#556B2F] text-sm font-bold tracking-widest uppercase">Step 03. 선별</span>
          <h2 className="text-3xl font-bold text-[#1A237E] mt-2">어떤 길을 걷고 싶으신가요?</h2>
          <p className="text-gray-400 mt-2">관심 있는 분야를 모두 선택해 주세요 (다중 선택 가능).</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          {interests.map((item) => (
            <div 
              key={item.id}
              onClick={() => toggleInterest(item.id)}
              className={`relative p-6 rounded-2xl cursor-pointer transition-all border-2 flex flex-col items-center justify-center gap-3 ${
                selectedIds.includes(item.id) 
                ? 'border-[#556B2F] bg-[#F0F4E8]' 
                : 'border-gray-50 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {selectedIds.includes(item.id) && (
                <div className="absolute top-3 right-3 bg-[#556B2F] text-white rounded-full p-1">
                  <Check size={12} />
                </div>
              )}
              <div className={`p-4 rounded-full ${item.color}`}>
                <item.icon size={28} />
              </div>
              <span className="font-bold text-[#1A237E]">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button onClick={prevStep} className="flex-1 py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors">이전으로</button>
          <button 
            onClick={() => nextStep({ interests: selectedIds })}
            disabled={selectedIds.length === 0}
            className={`flex-[2] py-4 rounded-xl font-bold transition-all shadow-lg ${
              selectedIds.length > 0 ? 'bg-[#1A237E] text-white hover:bg-[#0D145A]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignupStep3;
