import { useHistory } from 'react-router-dom';

export default function Home() {
  const history = useHistory();

  const goToOrder = () => {
    history.push('/order');
  };

  return (
    <section className="home-hero">
      <div className="home-hero-overlay">
        <div className="home-hero-content">
          <h1 className="home-logo-text">Teknolojik Yemekler</h1>
          <h2 className="home-title">
            KOD AÇIKTIRIR<br />
            PİZZA, DOYURUR
          </h2>
          <button className="btn-primary hero-btn" onClick={goToOrder}>
            ACIKTIM
          </button>
        </div>
      </div>
    </section>
  );
}
