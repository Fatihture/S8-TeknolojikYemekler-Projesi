import { Link } from 'react-router-dom';

export default function Success({ orderData, apiResponse }) {
  if (!orderData) {
    return (
      <section className="success-page">
        <div className="success-inner">
          <h1 className="home-logo-text">Teknolojik Yemekler</h1>
          <p>Önce bir sipariş oluşturmalısın 🙂</p>
          <Link className="btn-primary" to="/order">
            Sipariş Oluştur
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="success-page">
      <div className="success-inner">
        <h1 className="home-logo-text">Teknolojik Yemekler</h1>
        <h2 className="success-title">TEBRİKLER! SİPARİŞİNİZ ALINDI!</h2>

        <div className="order-recap">
          <p>
            <strong>İsim:</strong> {orderData.isim}
          </p>
          <p>
            <strong>Boyut:</strong> {orderData.boyut}
          </p>
          <p>
            <strong>Hamur:</strong> {orderData.hamur}
          </p>
          <p>
            <strong>Adet:</strong> {orderData.adet}
          </p>
          <p>
            <strong>Toplam:</strong> {orderData.toplam.toFixed(2)}₺
          </p>
          <p>
            <strong>Ek Malzemeler:</strong>{' '}
            {orderData.malzemeler.join(', ') || 'Yok'}
          </p>
          {orderData.not && (
            <p>
              <strong>Not:</strong> {orderData.not}
            </p>
          )}

          {apiResponse && apiResponse.id && (
            <p className="api-info">
              Sunucudan dönen örnek id: <b>{apiResponse.id}</b>
            </p>
          )}
        </div>

        <Link className="btn-primary" to="/">
          Anasayfaya Dön
        </Link>
      </div>
    </section>
  );
}
