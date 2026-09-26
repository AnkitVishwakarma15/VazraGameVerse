import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [regStatus, setRegStatus] = useState({ freefire: false, bgmi: false });
  const [trueStatus, setTrueStatus] = useState(true);
  useEffect(() => {
    // Fetch dynamic status from the backend
    const fetchStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/status');
        setRegStatus(response.data);
      } catch (error) {
        console.error('Error fetching status', error);
      }
    };
    fetchStatus();
  }, []);

  return (
    <>
      {/* Tech Geometric Background Overlay */}
      <div className="bg-overlay"></div>

      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <img src="/vazra-logo.png" alt="VaZra Logo" className="nav-logo-img" />
          VaZra
        </div>
        <nav>
          <a href="#bgmi-section">BGMI</a>
          <a href="#freefire-section">FREE FIRE</a>
          <a href="#rulebook">RULEBOOK</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-live-badge"><span className="pulse-dot"></span> REGISTRATIONS OPEN</div>
        <h1>VAZRA GAMEVERSE</h1>

        <div className="hero-perk-note">
          <div className="hero-perk-header">
            <span className="perk-lightning">⚡</span>
            <h4>CHAMPION PRIVILEGE</h4>
          </div>
          <p>Winners get <strong>free entry into the next tournament</strong> to defend their crown and claim back-to-back glory!</p>
        </div>

        <p style={{ color: "white" }}>Select your battlefield, lock in your squad roster, and fight for collegiate glory.</p>
        <div className="ff-hazard-stripe"></div>
      </section>

      {/* Arena Container with Game Showcase Cards */}
      <div className="arena-container">

        {/* 1. FIRST GAME: Free Fire Showcase Card (Left Position) */}
        <section id="freefire-section" className={`game-showcase-card ${regStatus.freefire ? 'is-open' : 'is-locked'}`}>
          <div className="card-media-wrap">
            <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80" alt="Free Fire Tournament" className="card-poster" />
            {trueStatus ? (
              <div className="poster-overlay-tag open-overlay">🔥 SLOTS OPEN</div>
            ) : (
              <div className="poster-overlay-tag locked-overlay">SEATS FULL</div>
            )}
          </div>

          <div className="card-body">
            <div className="card-top-bar">
              <span className="badge-tag">FREE FIRE</span>
              {trueStatus ? (
                <span className="status-pill open-live-pill"><span className="live-dot"></span> REGISTRATION OPEN</span>
              ) : (
                <span className="status-pill coming-soon-pill" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.4)' }}>🚫 REGISTRATION CLOSED</span>
              )}
            </div>
            <h1>FREE FIRE MAX</h1>
            <h2>TOURNAMENT : CHAMPION SERIES</h2>
            <p className="showcase-desc">
              {trueStatus
                ? "Official Bermuda clash squad and survival showdown. Fast reflexes and precise Aim."
                : "All custom room slots for this fixture have been claimed! Room details will be posted in the official WhatsApp group."}
            </p>

            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">FORMAT</span>
                <span className="spec-value">Clash Squad [1v1]</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">MAP</span>
                <span className="spec-value">All Map</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">STATUS</span>
                <span className="spec-value" style={{ color: trueStatus ? '#00aa44' : '#EF4444' }}>
                  {trueStatus ? "● Live Now" : "● Locked"}
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-label">ENTRY FEE</span>
                <span className="spec-value">₹50 Per Player</span>
              </div>
            </div>

            {trueStatus ? (
              <Link to="/register/freefire" className="btn-ff-action">
                REGISTER FOR CHAMPION SERIES »
              </Link>
            ) : (
              <button type="button" className="btn-ff-action btn-disabled" disabled>
                🔒 REGISTRATION FULL
              </button>
            )}
          </div>
        </section>

        {/* 2. SECOND GAME: Free Fire Showcase Card */}
        <section id="freefire-section" className={`game-showcase-card ${regStatus.freefire ? 'is-open' : 'is-locked'}`}>
          <div className="card-media-wrap">
            <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80" alt="Free Fire Tournament" className="card-poster" />
            {regStatus.freefire ? (
              <div className="poster-overlay-tag open-overlay">🔥 SLOTS OPEN</div>
            ) : (
              <div className="poster-overlay-tag locked-overlay">Currently Closed</div>
            )}
          </div>

          <div className="card-body">
            <div className="card-top-bar">
              <span className="badge-tag">Free Fire</span>
              {regStatus.freefire ? (
                <span className="status-pill open-live-pill"><span className="live-dot"></span> REGISTRATION OPEN</span>
              ) : (
                <span className="status-pill coming-soon-pill" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.4)' }}>🚫 REGISTRATION CLOSED</span>
              )}
            </div>
            <h1>FREE FIRE MAX</h1>
            <h2>TOURNAMENT : BATTLE SERIES</h2>
            <p className="showcase-desc">
              {regStatus.freefire
                ? "Official Bermuda survival showdown. Fast reflexes and precise Aim."
                : "Currently closed!"}
            </p>

            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">FORMAT</span>
                <span className="spec-value">BATTLE ROYALE SQUAD</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">MAP</span>
                <span className="spec-value">BERMUDA</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">STATUS</span>
                <span className="spec-value" style={{ color: regStatus.freefire ? '#00aa44' : '#EF4444' }}>
                  {regStatus.freefire ? "● Live Now" : "● Locked"}
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-label">ENTRY FEE</span>
                <span className="spec-value">₹200 Per Team</span>
              </div>
            </div>

            {regStatus.freefire ? (
              <Link to="/register/battleseries" className="btn-ff-action">
                REGISTER FOR BATTLE SERIES »
              </Link>
            ) : (
              <button type="button" className="btn-ff-action btn-disabled" disabled>
                🔒 REGISTRATION CLOSED
              </button>
            )}
          </div>
        </section>

        {/* 3. SECOND GAME: BGMI Showcase Card (Right Position) */}
        <section id="bgmi-section" className={`game-showcase-card ${regStatus.bgmi ? 'is-open' : 'is-locked'}`}>
          <div className="card-media-wrap">
            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80" alt="BGMI Tournament" className="card-poster" />
            {regStatus.bgmi ? (
              <div className="poster-overlay-tag open-overlay">🔥 SLOTS OPEN</div>
            ) : (
              <div className="poster-overlay-tag locked-overlay">LAUNCHING SOON</div>
            )}
          </div>

          <div className="card-body">
            <div className="card-top-bar">
              <span className="badge-tag">BATTLE ROYALE</span>
              {regStatus.bgmi ? (
                <span className="status-pill open-live-pill"><span className="live-dot"></span> REGISTRATION OPEN</span>
              ) : (
                <span className="status-pill coming-soon-pill">⏳ STARTS SOON</span>
              )}
            </div>
            <h2>BATTLEGROUNDS MOBILE INDIA</h2>
            <p className="showcase-desc">
              {regStatus.bgmi
                ? "Official Erangel squad showdown. Lock in your team roster and prepare for the drop!"
                : "Lobby configuration and slot allocation are currently being finalized. Registrations will unlock shortly—stay tuned to the club group!"}
            </p>

            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">FORMAT</span>
                <span className="spec-value">Squad (TPP)</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">MAP</span>
                <span className="spec-value">Erangel</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">STATUS</span>
                <span className="spec-value" style={{ color: regStatus.bgmi ? '#00aa44' : '#ff5500' }}>
                  {regStatus.bgmi ? "● Live Now" : "Locked"}
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-label">PLATFORM</span>
                <span className="spec-value">Mobile Only</span>
              </div>
            </div>

            {regStatus.bgmi ? (
              <Link to="/register/bgmi" className="btn-ff-action">
                REGISTER FOR BGMI »
              </Link>
            ) : (
              <button type="button" className="btn-ff-action btn-disabled" disabled>
                🔒 REGISTRATION OPENS SOON
              </button>
            )}
          </div>
        </section>

      </div>

      {/* Official Rulebook & Scoring Section */}
      <section id="rulebook" className="rulebook-section">
        <div className="section-heading-wrap">
          <h2>OFFICIAL RULES & SCORING</h2>
          <div className="ff-hazard-stripe"></div>
        </div>

        <div className="rules-grid">
          <div className="rule-card">
            <h3>📌 MATCH DIRECTIVES</h3>
            <ul className="rules-list">
              <li><strong>No Emulators:</strong> iPads, tablets, and PC emulators are strictly prohibited. Standard smartphones only.</li>
              <li><strong>Room Access:</strong> Custom Room ID & Password will be distributed on the official WhatsApp group 15 minutes prior to match launch.</li>
              <li><strong>Zero Tolerance:</strong> Third-party configs, scripts, or unfair teaming up results in an immediate permanent ban.</li>
            </ul>
          </div>

          <div className="rule-card">
            <h3>🏆 SCORING SYSTEM</h3>
            <table className="scoring-table">
              <thead>
                <tr>
                  <th>PLACEMENT</th>
                  <th>PRIZES</th>
                  <th>PER KILL PRIZES</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#1 Winner (Booyah / WWCD)</td>
                  <td style={{ color: '#ffaa00', fontWeight: 'bold' }}>200 Rupees</td>
                  <td style={{ color: '#ffaa00', fontWeight: 'bold' }}>10 Rupees / Kill</td>
                </tr>
                <tr>
                  <td>#2 Runner-Up</td>
                  <td>100 Rupees</td>
                  <td>10 Rupees / Kill</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <div className="card-about-section">
        <h1>ABOUT VAZRA GAMEVERSE</h1>
        <p>
          <strong>VaZra GameVerse</strong> is a growing esports and gaming community built to bring gamers together to connect, compete, and grow.
          We organize regular tournaments across popular games like <span className="highlight-game">Free Fire MAX</span>, <span className="highlight-game">BGMI</span>, <span className="highlight-game">Valorant</span>, and more, giving players a platform to showcase their skills, compete for exciting rewards, and become part of a competitive gaming community.
        </p>
        <p className="community-tagline">PLAY. COMPETE. BELONG.</p>
      </div>

      <footer>
        <p>© VaZra GameVerse <br /> A community built for gamers who want to <strong>CONNECT • COMPETE • CONQUER</strong></p>
      </footer>
    </>
  );
};

export default Home;
