import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1A237E', color: '#fff', padding: '60px 40px', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
        <div>
          <h3 style={{ margin: '0 0 20px 0' }}>WayPilgrim</h3>
          <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>당신의 발걸음과 함께하는 순례길 동반자</p>
        </div>
        <div style={{ display: 'flex', gap: '60px' }}>
          <div>
            <h4 style={{ marginBottom: '15px' }}>Menu</h4>
            <p style={{ opacity: 0.7, fontSize: '0.8rem', cursor: 'pointer' }}>Navigator</p>
            <p style={{ opacity: 0.7, fontSize: '0.8rem', cursor: 'pointer' }}>Archive</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '15px' }}>Contact</h4>
            <p style={{ opacity: 0.7, fontSize: '0.8rem' }}>support@waypilgrim.com</p>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '40px', opacity: 0.3, fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
        © 2026 WayPilgrim. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
