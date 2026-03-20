import React from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@300;400;500&display=swap');

  .footer {
    width: 100%;
    background: radial-gradient(ellipse at 50% 30%, #0d3d44 0%, #0a1f24 70%);
    color: #e0f7fa;
    padding: 50px 3% 20px;
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow: hidden;
    isolation: isolate;
  }

  /* Subtle animated background glow/particles */
  .footer::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 20% 80%, rgba(53, 208, 186, 0.08) 0%, transparent 40%),
                radial-gradient(circle at 80% 20%, rgba(29, 144, 255, 0.06) 0%, transparent 50%);
    opacity: 0.7;
    animation: breathe 14s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes breathe {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50%      { opacity: 0.9; transform: scale(1.05); }
  }

  .footer-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 36px;
    position: relative;
  }

  .globe {
    font-size: 42px;
    line-height: 1;
    color: #35d0ba;
    animation: floatGlow 6s ease-in-out infinite;
    filter: drop-shadow(0 0 12px rgba(53, 208, 186, 0.6));
  }

  .header-text h2 {
    font-family: 'Rajdhani', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #4da6ff;
    letter-spacing: 1.2px;
    margin: 0;
    background: linear-gradient(90deg, #4da6ff, #35d0ba, #4da6ff);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientFlow 5s linear infinite;
  }

  .header-text h4 {
    font-size: 14px;
    color: #89c8cc;
    font-weight: 400;
    letter-spacing: 0.8px;
    margin: 4px 0 0;
  }

  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  @keyframes floatGlow {
    0%, 100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-8px) scale(1.08); }
  }

  .footer-divider {
    border: none;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(53,208,186,0.25), transparent);
    margin: 0 auto 32px;
    max-width: 800px;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    max-width: 1400px;
    margin: 0 auto 40px;
  }

  .footer-col h3 {
    font-family: 'Rajdhani', sans-serif;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #35d0ba;
    letter-spacing: 1.2px;
    text-transform: uppercase;
  }

  .footer-col p {
    font-size: 13.5px;
    margin-bottom: 10px;
    color: #b2e4e2;
    cursor: pointer;
    position: relative;
    transition: color 0.3s ease;
    padding-left: 0;
  }

  .footer-col p::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1.5px;
    background: linear-gradient(90deg, #35d0ba, #4da6ff);
    transition: width 0.4s ease;
  }

  .footer-col p:hover {
    color: #ffffff;
  }

  .footer-col p:hover::before {
    width: 100%;
  }

  .footer-bottom {
    border-top: 1px solid rgba(53,208,186,0.12);
    padding-top: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    font-size: 12.5px;
    color: #89c8cc;
    max-width: 1400px;
    margin: 0 auto;
  }

  .footer-copy {
    font-weight: 400;
  }

  .footer-social {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .icons {
    display: flex;
    gap: 10px;
  }

  .icons a {
    color: white;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: linear-gradient(135deg, #35d0ba, #1e90ff);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.35s ease;
    box-shadow: 0 4px 15px rgba(53, 208, 186, 0.25);
  }

  .icons a:hover {
    transform: translateY(-4px) scale(1.14);
    box-shadow: 0 8px 25px rgba(53, 208, 186, 0.5);
    background: linear-gradient(135deg, #4da6ff, #35d0ba);
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .footer-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .footer {
      padding: 50px 5% 30px;
    }
    .footer-grid {
      grid-template-columns: 1fr;
      gap: 28px;
    }
    .footer-header {
      flex-direction: column;
      text-align: center;
      gap: 8px;
    }
    .footer-bottom {
      flex-direction: column;
      text-align: center;
      gap: 16px;
    }
    .globe {
      font-size: 36px;
    }
    .header-text h2 {
      font-size: 24px;
    }

    
  }
`;

const SocialIcon = ({ href, label, path }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d={path} />
    </svg>
  </a>
);

const Footer = () => {
  return (
    <>
      <style>{styles}</style>
      <footer className="footer">
        <hr className="footer-divider" />

        <div className="footer-grid">
          <div className="footer-col">
            <h3>Our Solutions</h3>
            <p>Aluminium Hangars & Domes</p>
            <p>Political & Government Events</p>
            <p>Corporate & Institutional Events</p>
            <p>Exhibitions & Summits</p>
            <p>Concerts & Grand Weddings</p>

  
  <h2>🌐 Grand Sameer Events Pvt. Ltd.</h2>
<span>Temporary Infrastructure & Event Execution</span>
  </div>


          <div className="footer-col">
            <h3>Products / Services</h3>
            <p>Temporary Event Infrastructure</p>
            <p>Large-Span Structure Rentals</p>
            <p>Climate-Controlled Spaces</p>
            <p>Rapid Deployment Projects</p>
          </div>

          <div className="footer-col">
            <h3>Our Expertise</h3>
            <p>Why Grand Sameer</p>
            <p>About Us</p>
            <p>Case Studies</p>
            <p>News & Awards</p>
          </div>

          <div className="footer-col">
            <h3>Contact</h3>
            <p>📍 Ujjain / Indore, MP, India</p>
            <p>📞 +91 9319373572</p>
            <p>eventsgrandsameer@gmail.com</p>

            <div className="icons">
              <SocialIcon
                href="https://facebook.com"
                label="Facebook"
                path="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
              />
              <SocialIcon
                href="https://instagram.com"
                label="Instagram"
                path="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z"
              />
              <SocialIcon
                href="https://linkedin.com/company"
                label="LinkedIn"
                path="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
              />
              <SocialIcon
                href="https://youtube.com"
                label="YouTube"
                path="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.95C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 0 0 1.94-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"
              />
              <SocialIcon
                href="https://wa.me/91XXXXXXXXXX"
                label="WhatsApp"
                path="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
