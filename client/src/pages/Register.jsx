import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const { gameType } = useParams();
  const navigate = useNavigate();

  const gameSlug = gameType.toLowerCase();

  let key, gameTitle, bgClass;
  if (gameSlug === 'freefire' || gameSlug === 'free-fire') {
    key = 'freefire';
    gameTitle = "Free Fire MAX (1v1)";
    bgClass = "ff-bg";
  } else if (gameSlug === 'bgmi') {
    key = 'bgmi';
    gameTitle = "BGMI (Battlegrounds Mobile India)";
    bgClass = "bgmi-bg";
  } else {
    navigate('/');
  }

  const [formData, setFormData] = useState({
    name: '',
    admission_no: '',
    in_game_username: '',
    in_game_id: '',
    section: '',
    contact: '',
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
      const response = await fetch(
        'https://api.imgbb.com/1/upload?key=a1a51eeaf89df2ead2050b8e98ca55df',
        {
          method: 'POST',
          body: data,
        }
      );

      const result = await response.json();

      console.log("HTTP Status:", response.status);
      console.log("ImgBB response:", result);

      if (response.ok && result.success) {
        setScreenshotUrl(result.data.url);
        setUploadStatus('✓ Screenshot uploaded successfully!');
      } else {
        console.error("ImgBB error:", result.error);
        setUploadStatus(
          result.error?.message || 'Failed to upload image. Please try again.'
        );
        setScreenshotUrl('');
      }
    } catch (err) {
      console.error("Upload error:", err);
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
      await axios.post('https://vazragameverse-1.onrender.com/api/register', {
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
          <h1 className="form-title">CHAMPION SERIES [1V1]</h1>
          <p className="form-subtitle">Complete registration to receive Room ID and entry slot.</p>
          <div className="ff-hazard-stripe" style={{ marginBottom: '2rem' }}></div>

          <form onSubmit={handleSubmit} id="registrationForm">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">PLAYER NAME (FULL NAME) *</label>
                <input type="text" id="name" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="admission_no">ADMISSION NUMBER *</label>
                <input type="text" id="admission_no" name="admission_no" placeholder="e.g. 2025B0101000" required value={formData.admission_no} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="in_game_username">IN-GAME USERNAME *</label>
                <input type="text" id="in_game_username" name="in_game_username" placeholder="IGN / Username" required value={formData.in_game_username} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="in_game_id">FREE FIRE UID *</label>
                <input type="text" id="in_game_id" name="in_game_id" placeholder="In-game Numeric UID" required value={formData.in_game_id} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="section">SECTION / BRANCH *</label>
                <input type="text" id="section" name="section" placeholder="e.g. CSE-13" required value={formData.section} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="contact">WHATSAPP CONTACT *</label>
                <input type="tel" id="contact" name="contact" placeholder="10-digit number" pattern="[0-9]{10}" required value={formData.contact} onChange={handleChange} />
              </div>
            </div>

            <div className="payment-box">
              <h4>PAYMENT VERIFICATION (ENTRY FEE: 25/Player)</h4>
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
                <label htmlFor="utr_id">UPI TRANSACTION ID (UTR)*</label>
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

export default Register;
