import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterBattleSeries = () => {
  const navigate = useNavigate();

  const gameSlug = 'battleseries';
  const gameTitle = "Free Fire MAX (Battle Series)";
  const bgClass = "ff-bg";

  const [formData, setFormData] = useState({
    // Team Leader / Captain
    team_name: '',
    leader_name: '',
    leader_uid: '',
    leader_username: '',
    leader_admission_no: '',
    leader_section: '',
    leader_phone: '',
    leader_whatsapp: '',
    // Member 2
    member2_name: '',
    member2_uid: '',
    member2_username: '',
    // Member 3
    member3_name: '',
    member3_uid: '',
    member3_username: '',
    // Member 4
    member4_name: '',
    member4_uid: '',
    member4_username: '',
    // Payment
    utr_id: ''
  });

  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewSrc, setPreviewSrc] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const previewReceipt = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setPreviewSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewSrc('');
    }

    setUploadStatus('Uploading payment screenshot...');
    setIsSubmitting(true);

    const data = new FormData();
    data.append('image', file);

    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=60952399b196ee3750f4ee2c50a9ad4f', {
        method: 'POST',
        body: data
      });
      const result = await response.json();

      if (result.success) {
        setScreenshotUrl(result.data.url);
        setUploadStatus('✓ Screenshot uploaded successfully!');
      } else {
        setUploadStatus('Failed to upload image. Please try again.');
        setScreenshotUrl('');
      }
    } catch (err) {
      setUploadStatus('Network error during image upload.');
      setScreenshotUrl('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await axios.post('http://localhost:5000/api/register-battleseries', {
        ...formData,
        game_slug: gameSlug,
        game: gameTitle,
        screenshot_url: screenshotUrl
      });
      navigate('/success');
    } catch (error) {
      setErrorMsg(error.response?.data?.error || 'Registration failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={`bg-overlay ${bgClass}`}></div>

      <header className="navbar">
        <div className="logo">VAZRA ESPORTS ARENA</div>
        <nav>
          <Link to="/">⬅ Back to Arenas</Link>
        </nav>
      </header>

      {errorMsg && (
        <div className="flash-container">
          <div className="flash-box">{errorMsg}</div>
        </div>
      )}

      <section className="register-section">
        <div className="form-wrapper">
          <h1 className="form-title">BATTLE SERIES [SQUAD]</h1>
          <p className="form-subtitle">Complete registration to receive Room ID and entry slot.</p>
          <div className="ff-hazard-stripe" style={{ marginBottom: '2rem' }}></div>

          <form onSubmit={handleSubmit} id="registrationForm">

            {/* ───────── TEAM INFO ───────── */}
            <div className="form-group">
              <label htmlFor="team_name">TEAM NAME *</label>
              <input type="text" id="team_name" name="team_name" placeholder="Enter Team Name" required value={formData.team_name} onChange={handleChange} />
            </div>

            {/* ───────── SECTION: TEAM LEADER / CAPTAIN ───────── */}
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.1rem', color: 'var(--ff-dark)', marginTop: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid var(--ff-yellow)', paddingBottom: '0.5rem' }}>
              👑 TEAM LEADER / CAPTAIN
            </h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="leader_name">LEADER NAME (FULL NAME) *</label>
                <input type="text" id="leader_name" name="leader_name" placeholder="Full Name" required value={formData.leader_name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="leader_uid">LEADER FREE FIRE UID *</label>
                <input type="text" id="leader_uid" name="leader_uid" placeholder="In-game Numeric UID" required value={formData.leader_uid} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="leader_username">LEADER IN-GAME USERNAME / IGN *</label>
                <input type="text" id="leader_username" name="leader_username" placeholder="IGN / Username" required value={formData.leader_username} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="leader_admission_no">LEADER ADMISSION NUMBER *</label>
                <input type="text" id="leader_admission_no" name="leader_admission_no" placeholder="e.g. 2025B0101000" required value={formData.leader_admission_no} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="leader_section">SECTION / BRANCH *</label>
                <input type="text" id="leader_section" name="leader_section" placeholder="e.g. CSE-13" required value={formData.leader_section} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="leader_whatsapp">LEADER WHATSAPP NUMBER *</label>
                <input type="tel" id="leader_whatsapp" name="leader_whatsapp" placeholder="10-digit WhatsApp number" pattern="[0-9]{10}" required value={formData.leader_whatsapp} onChange={handleChange} />
              </div>
            </div>

            {/* ───────── SECTION: TEAM MEMBERS ───────── */}
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.1rem', color: 'var(--ff-dark)', marginTop: '2rem', marginBottom: '1rem', borderBottom: '2px solid var(--ff-yellow)', paddingBottom: '0.5rem' }}>
              👥 TEAM MEMBERS
            </h2>

            {/* Member 2 */}
            <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', fontWeight: 700, color: 'var(--ff-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>MEMBER 2</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="member2_name">NAME *</label>
                <input type="text" id="member2_name" name="member2_name" placeholder="Member 2 Full Name" required value={formData.member2_name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="member2_uid">FREE FIRE UID *</label>
                <input type="text" id="member2_uid" name="member2_uid" placeholder="In-game Numeric UID" required value={formData.member2_uid} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="member2_username">IN-GAME USERNAME / IGN *</label>
              <input type="text" id="member2_username" name="member2_username" placeholder="IGN / Username" required value={formData.member2_username} onChange={handleChange} />
            </div>

            {/* Member 3 */}
            <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', fontWeight: 700, color: 'var(--ff-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>MEMBER 3</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="member3_name">NAME *</label>
                <input type="text" id="member3_name" name="member3_name" placeholder="Member 3 Full Name" required value={formData.member3_name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="member3_uid">FREE FIRE UID *</label>
                <input type="text" id="member3_uid" name="member3_uid" placeholder="In-game Numeric UID" required value={formData.member3_uid} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="member3_username">IN-GAME USERNAME / IGN *</label>
              <input type="text" id="member3_username" name="member3_username" placeholder="IGN / Username" required value={formData.member3_username} onChange={handleChange} />
            </div>

            {/* Member 4 */}
            <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', fontWeight: 700, color: 'var(--ff-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>MEMBER 4</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="member4_name">NAME *</label>
                <input type="text" id="member4_name" name="member4_name" placeholder="Member 4 Full Name" required value={formData.member4_name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="member4_uid">FREE FIRE UID *</label>
                <input type="text" id="member4_uid" name="member4_uid" placeholder="In-game Numeric UID" required value={formData.member4_uid} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="member4_username">IN-GAME USERNAME / IGN *</label>
              <input type="text" id="member4_username" name="member4_username" placeholder="IGN / Username" required value={formData.member4_username} onChange={handleChange} />
            </div>

            {/* ───────── REGISTRATION RULE NOTE ───────── */}
            <div style={{ background: 'rgba(17, 19, 23, 0.85)', border: '1px solid rgba(255, 183, 0, 0.4)', padding: '0.8rem 1.2rem', borderRadius: '8px', margin: '1.5rem 0', backdropFilter: 'blur(6px)' }}>
              <p style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
                ⚠️ <strong style={{ color: 'var(--ff-yellow)' }}>Registration Rule:</strong> Only registered accounts may participate. Any change of player must be approved by the organizer before the relevant match.
              </p>
            </div>

            {/* ───────── PAYMENT SECTION ───────── */}
            <div className="payment-box">
              <h4>PAYMENT VERIFICATION (ENTRY FEE: ₹200/Team)</h4>
              <p>Scan the official QR code or make a direct transfer to the UPI ID, then upload the receipt screenshot.</p>

              <div className="qr-container">
                <img src="/my-payment-qr.jpg" alt="Payment QR Code" className="qr-img" />
                <div className="upi-details">
                  <div className="upi-text">
                    <span>UPI ID:</span> <strong>yr667721@oksbi</strong>
                  </div>
                  <p style={{ color: 'var(--ff-text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Screenshot must show the complete 12-digit UTR/Ref number.</p>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="utr_id">UPI TRANSACTION ID (UTR) *</label>
                <input type="text" id="utr_id" name="utr_id" placeholder="12-digit UTR" maxLength="16" required value={formData.utr_id} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="payment_screenshot">UPLOAD PAYMENT RECEIPT SCREENSHOT *</label>
                <input type="file" id="payment_screenshot" accept="image/*,.pdf" required onChange={previewReceipt} />
                <small id="upload-status" style={{ display: 'block', marginTop: '6px', fontWeight: 600, color: uploadStatus.includes('✓') ? '#16a34a' : '#0284c7' }}>
                  {uploadStatus}
                </small>

                {previewSrc && (
                  <div id="receiptPreviewContainer" className="preview-container">
                    <img id="receiptPreview" src={previewSrc} alt="Receipt Preview" />
                  </div>
                )}
              </div>
            </div>

            <button type="submit" id="submitBtn" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Submit Registration »'}
            </button>
          </form>
        </div>
      </section>

      <footer>
        <p>© 2026 VaZra Esports Arena. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default RegisterBattleSeries;
