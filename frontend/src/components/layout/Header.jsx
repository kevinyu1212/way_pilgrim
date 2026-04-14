import React from 'react';

const Header = ({ onOpenSidebar }) => {
  return (
    <header style={{ 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
      padding: '20px 40px', backgroundColor: '#fff', borderBottom: '1px solid #eee', position: 'sticky', top: 0, zIndex: 100
    }}>
      <h2 style={{ color: '#1A237E', margin: 0, fontWeight: '900' }}>WayPilgrim</h2>
      <button onClick={onOpenSidebar} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '10px' }}>
        <div style={{ width: '25px', height: '3px', backgroundColor: '#1A237E', marginBottom: '5px' }}></div>
        <div style={{ width: '25px', height: '3px', backgroundColor: '#1A237E', marginBottom: '5px' }}></div>
        <div style={{ width: '25px', height: '3px', backgroundColor: '#1A237E' }}></div>
      </button>
    </header>
  );
};

export default Header;
