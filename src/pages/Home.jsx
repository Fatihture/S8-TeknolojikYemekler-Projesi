// src/pages/Home.jsx
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const CATEGORY_TABS = [
  {
    id: 'kore',
    label: 'Yeni Kore',
    icon: '/images/iteration-2-images/icons/1.svg'
  },
  {
    id: 'pizza',
    label: 'Pizza',
    icon: '/images/iteration-2-images/icons/2.svg'
  },
  {
    id: 'burger',
    label: 'Burger',
    icon: '/images/iteration-2-images/icons/3.svg'
  },
  {
    id: 'fries',
    label: 'Kızartmalar',
    icon: '/images/iteration-2-images/icons/4.svg'
  },
  {
    id: 'fastfood',
    label: 'Fast food',
    icon: '/images/iteration-2-images/icons/5.svg'
  },
  {
    id: 'drink',
    label: 'Gazlı içecek',
    icon: '/images/iteration-2-images/icons/6.svg'
  },
];

const FEATURED_ITEMS = [
  {
    id: 1,
    category: 'pizza',
    name: 'Terminal Pizza',
    description: 'Bol malzemeli, tam kod odaklı pizza.',
    price: 60,
    rating: 4.8,
    reviews: 184,
    img: '/images/iteration-2-images/pictures/food-1.png'
  },
  {
    id: 2,
    category: 'pizza',
    name: 'Position Absolute Acı Pizza',
    description: 'Acı sever frontendciler için özel.',
    price: 85.5,
    rating: 4.9,
    reviews: 200,
    img: '/images/iteration-2-images/pictures/food-2.png'
  },
  {
    id: 3,
    category: 'burger',
    name: 'useEffect Tavuklu Burger',
    description: 'Her ısırıkta yeni bir render.',
    price: 75,
    rating: 4.7,
    reviews: 132,
    img: '/images/iteration-2-images/pictures/food-3.png'
  },
];


export default function Home() {
  const history = useHistory();
  const [activeCategory, setActiveCategory] = useState('pizza');

  const goToOrder = () => {
    history.push('/order');
  };

  const visibleItems = FEATURED_ITEMS; // filtre yok


  return (
    <main className="home-page">
      {/* HERO */}
     {/* HERO */}
<section className="home-hero">
  <div className="home-hero-overlay">
    <div className="home-hero-content">

      {/* LOGO */}
      <img 
        src="/images/iteration-1-images/logo.svg" 
        alt="Teknolojik Yemekler Logo" 
        className="hero-logo"
      />

      {/* Fırsatı kaçırma yazısı */}
      <p className="hero-subtext">fırsatı kaçırma</p>

      {/* Ana Başlık */}
      <h2 className="home-title">
        KOD ACIKTIRIR
        <br />
        PİZZA, DOYURUR
      </h2>

      <button className="btn-primary hero-btn" onClick={goToOrder}>
        ACIKTIM
      </button>
    </div>
  </div>
</section>


      {/* KATEGORI */}
      <section className="home-category-strip" aria-label="Menü kategorileri">
        <ul className="category-list">
          {CATEGORY_TABS.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                className={
                  'category-pill' + (activeCategory === cat.id ? ' active' : '')
                }
                onClick={() => setActiveCategory(cat.id)}
              >
                <img src={cat.icon} alt={cat.label} className="category-icon" />
                <span className="category-pill-label">{cat.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* KAMPANYALAR (Görselli) */}
      <section className="home-special-section">

        {/* SOL BÜYÜK KART */}
        <article className="special-main-card kart-1">
          <div>
            <p className="eyebrow text-light">Özel Lezzetus</p>
            <h3 className="special-main-title">Position Absolute Acı Pizza</h3>
            <p className="special-main-text">
              Position buglarını unutturacak kadar acı, kod gibi net lezzet.
            </p>
          </div>
          <button
            type="button"
            className="btn-primary special-main-btn"
            onClick={goToOrder}
          >
            SİPARİŞ VER
          </button>
        </article>

        {/* SAG IKI KART */}
        <div className="special-side-cards">

          <article className="special-side-card kart-2">
            <h4>Hackathon Burger Menü</h4>
            <p>Gece kodlayan yazılımcılara ekstra enerji.</p>
            <button className="btn-primary small-btn" onClick={goToOrder}>
              SİPARİŞ VER
            </button>
          </article>

          <article className="special-side-card kart-3">
            <h4>Cooook hızlı npm gibi kurye</h4>
            <p>Deploy hızında kurye, 30 dakikada kapında.</p>
            <button className="btn-primary small-btn" onClick={goToOrder}>
              SİPARİŞ VER
            </button>
          </article>

        </div>
      </section>

      {/* POPÜLER MENÜLER */}
      <section className="home-most-popular">
        <header className="home-most-popular-header">
          <p className="eyebrow">en çok paketlenen menüler</p>
          <h2 className="section-title">
            Acıktıran Kodlara Doyuran Lezzetler
          </h2>
        </header>

        <nav className="home-product-tabs" aria-label="Menü filtreleri">
  {CATEGORY_TABS.map((cat) => (
    <button
      key={cat.id}
      type="button"
      className={
        'product-tab' + (activeCategory === cat.id ? ' active' : '')
      }
      onClick={() => setActiveCategory(cat.id)}
    >
      <img src={cat.icon} alt={cat.label} className="product-tab-icon" />
      <span>{cat.label}</span>
    </button>
  ))}
</nav>


        <div className="home-product-grid">
  {visibleItems.map((item) => (
    <article key={item.id} className="menu-card">
      
      <img src={item.img} alt={item.name} className="menu-card-img" />

      <div className="menu-card-body">
        <h3 className="menu-card-title">{item.name}</h3>
        <p className="menu-card-desc">{item.description}</p>

        <div className="menu-card-meta">
          <span className="menu-card-rating">
            {item.rating.toFixed(1)} ★
          </span>
          <span className="menu-card-reviews">
            ({item.reviews})
          </span>
        </div>

        <div className="menu-card-footer">
          <span className="menu-card-price">
            {item.price.toFixed(2)}₺
          </span>
          
        </div>
      </div>
    </article>
  ))}
</div>

      </section>
    </main>
  );
}
