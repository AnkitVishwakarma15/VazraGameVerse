import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="ff-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '600px', width: '100%', margin: '50px auto', background: 'rgba(15, 23, 42, 0.95)', padding: '40px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
          
          {/* Success Icon */}
          <div style={{ fontSize: '64px', color: '#10B981', marginBottom: '20px' }}>
              <i className="fa-solid fa-circle-check"></i>
          </div>

          <h1 style={{ color: '#ffffff', marginBottom: '10px', fontSize: '28px' }}>Registration Successful!</h1>
          <p style={{ color: '#94A3B8', fontSize: '16px', marginBottom: '30px' }}>
              Your slot has been successfully recorded. Stay connected with us for Room IDs, schedules, and tournament updates!
          </p>

          {/* Action Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
              {/* WhatsApp Community Button */}
              <a href="https://chat.whatsapp.com/JVfXa6quneN21Z0RMtNVfz" target="_blank" rel="noreferrer" style={{ backgroundColor: '#25D366', color: 'white', padding: '14px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'opacity 0.2s' }}>
                  <i className="fa-brands fa-whatsapp" style={{ fontSize: '22px' }}></i> Join WhatsApp Community
              </a>

              {/* Instagram Follow Button */}
              <a href="https://www.instagram.com/vazragameverse/" target="_blank" rel="noreferrer" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: 'white', padding: '14px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'opacity 0.2s' }}>
                  <i className="fa-brands fa-instagram" style={{ fontSize: '22px' }}></i> Follow Instagram Page
              </a>
          </div>

          {/* Back to Home */}
          <div>
              <Link to="/" style={{ color: '#60A5FA', textDecoration: 'none', fontSize: '14px' }}>
                  <i className="fa-solid fa-arrow-left"></i> Back to Home
              </Link>
          </div>

      </div>
    </div>
  );
};

export default Success;
