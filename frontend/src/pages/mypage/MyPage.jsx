import React, { useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { 
  User, Mail, Shield, Hash, ArrowLeft, 
  Edit3, Camera
} from 'lucide-react';

const MyPage = ({ onBack }) => {
  const { user, login } = useAuth();
  const profileInput = useRef(null);
  const coverInput = useRef(null);

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post(`http://localhost:5000/api/auth/upload/${type}/${user.id}`, formData);
      // 서버에서 받은 새 경로로 전역 유저 정보 업데이트
      const updatedUser = { ...user, [type === 'profiles' ? 'profile_img' : 'cover_img']: res.data.path };
      login(updatedUser);
      alert('이미지가 반영되었습니다.');
    } catch (err) {
      alert('업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F5] font-serif pb-20">
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={24}/></button>
          <h1 className="text-xl font-bold text-[#1A237E]">나의 순례 기록</h1>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 mt-8">
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden mb-8">
          {/* 배경 커버 영역 */}
          <div 
            className="relative h-48 bg-gray-200 bg-cover bg-center cursor-pointer group"
            style={{ backgroundImage: user?.cover_img ? `url(http://localhost:5000${user.cover_img})` : 'linear-gradient(to right, #1A237E, #556B2F)' }}
            onClick={() => coverInput.current.click()}
          >
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="text-white" size={32} />
            </div>
            <input type="file" ref={coverInput} hidden onChange={(e) => handleFileChange(e, 'covers')} />
          </div>

          <div className="px-10 pb-10 relative">
            {/* 프로필 이미지 영역 */}
            <div 
              className="absolute -top-12 left-10 w-24 h-24 bg-white rounded-3xl shadow-lg border-4 border-white overflow-hidden cursor-pointer group"
              onClick={() => profileInput.current.click()}
            >
              {user?.profile_img ? (
                <img src={`http://localhost:5000${user.profile_img}`} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-indigo-50 flex items-center justify-center text-[#1A237E]"><User size={40} /></div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="text-white" size={20} />
              </div>
              <input type="file" ref={profileInput} hidden onChange={(e) => handleFileChange(e, 'profiles')} />
            </div>
            
            <div className="pt-16 flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{user?.nickname}</h2>
                <p className="text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPage;
