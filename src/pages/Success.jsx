// src/pages/Success.jsx
import { Link } from 'react-router-dom';

const BASE_PRICE_PER_PIZZA = 85.5;

const sizeLabelMap = {
  kucuk: 'S',
  orta: 'M',
  buyuk: 'L',
};

const doughLabelMap = {
  ince: 'İnce',
  normal: 'Normal',
  kalin: 'Kalın',
};

export default function Success({ orderData, apiResponse }) {
  if (!orderData) {
    return (
      <section className="success-page">
        <div className="success-inner">
          <h1 className="success-logo">Teknolojik Yemekler</h1>
          <p>Önce bir sipariş oluşturmalısın 🙂</p>
          <Link className="btn-primary" to="/order">
            Sipariş Oluştur
          </Link>
        </div>
      </section>
    );
  }

  const selectionsTotal =
    typeof orderData.secimlerTutari === 'number'
      ? orderData.secimlerTutari
      : Math.max(
          orderData.toplam -
            BASE_PRICE_PER_PIZZA * (orderData.adet || 1),
          0
        );

  const sizeLabel = sizeLabelMap[orderData.boyut] || orderData.boyut;
  const doughLabel = doughLabelMap[orderData.hamur] || orderData.hamur;

  return (
    <section className="success-page">
      <div className="success-inner">
        <header className="success-header">
          <h1 className="success-logo">Teknolojik Yemekler</h1>
          <p className="success-subtitle">lezzetin yolda</p>
          <h2 className="success-title">SİPARİŞ ALINDI</h2>
          <div className="success-divider" />
        </header>

        <div className="success-body">
          <div className="success-details">
            <h3 className="success-product">
              {orderData.isim || 'Position Absolute Acı Pizza'}
            </h3>

            <dl className="success-meta">
              <div className="success-meta-row">
                <dt>Boyut:</dt>
                <dd>{sizeLabel}</dd>
              </div>
              <div className="success-meta-row">
                <dt>Hamur:</dt>
                <dd>{doughLabel}</dd>
              </div>
              <div className="success-meta-row">
                <dt>Adet:</dt>
                <dd>{orderData.adet}</dd>
              </div>
              <div className="success-meta-row">
                <dt>Ek Malzemeler:</dt>
                <dd>
                  {orderData.malzemeler &&
                  orderData.malzemeler.length > 0
                    ? orderData.malzemeler.join(', ')
                    : 'Yok'}
                </dd>
              </div>
              {orderData.not && (
                <div className="success-meta-row">
                  <dt>Not:</dt>
                  <dd>{orderData.not}</dd>
                </div>
              )}
            </dl>
          </div>

          <aside className="success-summary-box">
            <h4>Sipariş Toplamı</h4>
            <div className="summary-line">
              <span>Seçimler</span>
              <span>{selectionsTotal.toFixed(2)}₺</span>
            </div>
            <div className="summary-line total">
              <span>Toplam</span>
              <span>{orderData.toplam.toFixed(2)}₺</span>
            </div>
            {apiResponse && apiResponse.id && (
              <p className="api-info">
                Sunucudan dönen örnek id: <b>{apiResponse.id}</b>
              </p>
            )}
          </aside>
        </div>

        <Link className="btn-primary success-home-link" to="/">
          Anasayfaya Dön
        </Link>
      </div>
    </section>
  );
}
