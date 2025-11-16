// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* SOL BLOK */}
        <div className="footer-col">
          <h3 className="footer-logo">Teknolojik Yemekler</h3>

          <div className="footer-info">
            <p><img src="/images/iteration-2-images/footer/icons/icon-1.png" className="footer-icon" />  
              341 Londonderry Road, İstanbul / Türkiye
            </p>

            <p><img src="/images/iteration-2-images/footer/icons/icon-2.png" className="footer-icon" />  
              aciktim@teknolojikyemekler.com
            </p>

            <p><img src="/images/iteration-2-images/footer/icons/icon-3.png" className="footer-icon" />  
              +90 216 123 45 67
            </p>
          </div>
        </div>

        {/* MENÜ BLOĞU */}
        <div className="footer-col">
          <h4 className="footer-title">Sıcacık Menüler</h4>

          <ul className="footer-links">
            <li>Terminal Pizza</li>
            <li>5 Kişilik Hackathon Pizza</li>
            <li>useEffect Tavuklu Burger</li>
            <li>Beyaz Console Frosty</li>
            <li>Testler Geçti Mutlu Burger</li>
            <li>Position Absolute Acı Burger</li>
          </ul>
        </div>

        {/* INSTAGRAM BLOĞU */}
        <div className="footer-col">
          <h4 className="footer-title">Instagram</h4>

          <div className="insta-grid">
            <img src="/images/iteration-2-images/footer/insta/li-0.png" />
            <img src="/images/iteration-2-images/footer/insta/li-1.png" />
            <img src="/images/iteration-2-images/footer/insta/li-2.png" />
            <img src="/images/iteration-2-images/footer/insta/li-3.png" />
            <img src="/images/iteration-2-images/footer/insta/li-4.png" />
            <img src="/images/iteration-2-images/footer/insta/li-5.png" />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Teknolojik Yemekler</p>
      </div>
    </footer>
  );
}
