export default function Success({ orderData, apiResponse }) {
  return (
    <section className="success-page">

      <div className="success-inner">

        {/* Logo */}
        <img
          src="/images/iteration-1-images/logo.svg"
          alt="Teknolojik Yemekler"
          className="success-logo-img"
        />

        <p className="success-subtext">lezzetin yolda</p>

        <h2 className="success-title">SİPARİŞ ALINDI</h2>

        <div className="success-divider"></div>

        {/* Ürün başlığı */}
        <h3 className="success-product-title">Position Absolute Acı Pizza</h3>

        <div className="success-details">
          <p><strong>Boyut:</strong> {orderData.boyut}</p>
          <p><strong>Hamur:</strong> {orderData.hamur}</p>
          <p><strong>Adet:</strong> {orderData.adet}</p>

          <p><strong>Ek Malzemeler:</strong> {orderData.malzemeler.join(', ')}</p>



          {orderData.not && (
            <p><strong>Not:</strong> {orderData.not}</p>
          )}
        </div>

        {/* Sipariş Özeti Kutusu */}
        <div className="success-summary-box">
          <h4>Sipariş Toplamı</h4>

          <div className="summary-line">
            <span>Seçimler</span>
            <span>{orderData.secimlerTutari.toFixed(2)}₺</span>
          </div>

          <div className="summary-line total">
            <span>Toplam</span>
            <span>{orderData.toplam.toFixed(2)}₺</span>
          </div>

          
        </div>

       

      </div>

    </section>
  );
}
