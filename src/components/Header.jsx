import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          Teknolojik Yemekler
        </Link>

        <nav className="header-nav">
          <Link to="/">Anasayfa</Link>
          <Link to="/order">Sipariş Oluştur</Link>
        </nav>
      </div>
    </header>
  );
}
