import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/main/MainPage";
import MyPage from "./pages/mypage/MyPage";

const Navigation = () => {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState("home");

  if (loading) return null;
  if (!user) return <LandingPage />;

  // MyPage로 이동
  if (currentPage === "mypage") {
    return <MyPage onBack={() => setCurrentPage("home")} />;
  }

  // 홈 화면 (MainPage)
  return (
    <MainPage 
      onGoMyPage={() => setCurrentPage("mypage")} 
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

export default App;
