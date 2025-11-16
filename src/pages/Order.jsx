import { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ToppingCheckbox from '../components/ToppingCheckbox.jsx';

const BASE_PRICE = 85.5;
const TOPPING_PRICE = 5;
const MAX_TOPPINGS = 10;
const MIN_TOPPINGS = 4;

const TOPPINGS = [
  'Pepperoni', 'Sosis', 'Kanada Jambonu', 'Tavuk Izgara', 'Soğan',
  'Domates', 'Mısır', 'Sucuk', 'Jalapeno', 'Sarımsak', 'Biber',
  'Sucuk (extra)', 'Ananas', 'Kabak'
];

export default function Order({ setOrderData, setApiResponse }) {
  const history = useHistory();

  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [dough, setDough] = useState('');
  const [note, setNote] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [toppings, setToppings] = useState([]);

  const [formError, setFormError] = useState('');
  const [networkError, setNetworkError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleTopping = (item) => {
    setFormError('');
    if (toppings.includes(item)) {
      setToppings(toppings.filter(t => t !== item));
    } else {
      if (toppings.length >= MAX_TOPPINGS) {
        setFormError(`En fazla ${MAX_TOPPINGS} malzeme seçebilirsin.`);
        return;
      }
      setToppings([...toppings, item]);
    }
  };

  const isNameValid = name.trim().length >= 3;
  const isSizeValid = !!size;
  const isDoughValid = !!dough;
  const isToppingsValid = toppings.length >= MIN_TOPPINGS;

  const formValid = isNameValid && isSizeValid && isDoughValid && isToppingsValid;

  const toppingsTotal = useMemo(() => toppings.length * TOPPING_PRICE, [toppings]);
  const subtotal = useMemo(() => (BASE_PRICE + toppingsTotal) * quantity, [toppingsTotal, quantity]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValid) {
      setFormError('Lütfen formdaki zorunlu alanları doldur.');
      return;
    }

    const payload = {
      isim: name,
      boyut: size,
      hamur: dough,
      malzemeler: toppings,
      not: note,
      adet: quantity,
      secimlerTutari: toppingsTotal,
      toplam: subtotal,
    };

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        "https://reqres.in/api/pizza",
        payload,
        {
          headers: {
            "x-api-key": "reqres-free-v1",
            "Content-Type": "application/json"
          }
        }
      );

      setOrderData(payload);
      setApiResponse(response.data);
      history.push('/success');

    } catch {
      setNetworkError("Sipariş gönderilirken hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="order-page">

      {/* ÜST BAR */}
      <div className="order-top-bar">
  <div className="order-top-inner">
    <img
  src="/images/iteration-1-images/logo.svg"
  alt="Teknolojik Yemekler Logo"
  className="order-logo"
/>

  </div>
</div>


      {/* BÜYÜK PİZZA FOTOĞRAFI */}
      <div className="order-banner-big">
        <img
          src="/images/iteration-2-images/pictures/form-banner.png"
          alt="Pizza"
        />
      </div>

      {/* FORM CARD */}
      <div className="order-container">
        <form className="order-form" onSubmit={handleSubmit}>

          <p className="order-description">
            Anasayfa - Seçenekler - Sipariş Oluştur
          </p>

          <header className="order-header-section">
  <h2>Position Absolute Acı Pizza</h2>
  
  <p className="order-price">{BASE_PRICE.toFixed(2)}₺</p>
  <div className="order-header-meta">
    <span className="order-score">4.9</span>
    <span className="order-reviews">(200)</span>
  </div>
  <p className="order-description">
    Frontend dev olarak hala position-absolute kullanıyorsan bu çok acı
    pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
    diğer malzemelerle kaplanmış, taş fırında genellikle odun ateşinde
    pişirilen, yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan
    oluşan İtalyan kökenli lezzetli bir yemektir.. Küçük bir pizzaya bazen pizzetta denir.
  </p>
</header>


          

          

          {/* BOYUT + HAMUR */}
          <div className="form-row">
            <div className="form-group half">
              <label>Boyut Seç *</label>
              <div className="radio-group">
                {['kucuk', 'orta', 'buyuk'].map((val, i) => (
                  <label key={val}>
                    <input
                      type="radio"
                      name="size"
                      value={val}
                      checked={size === val}
                      onChange={(e) => setSize(e.target.value)}
                    />
                    {['S', 'M', 'L'][i]}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group half">
              <label>Hamur Seç *</label>
              <select value={dough} onChange={(e) => setDough(e.target.value)}>
                <option value="">Hamur Kalınlığı</option>
                <option value="ince">İnce</option>
                <option value="normal">Normal</option>
                <option value="kalin">Kalın</option>
              </select>
            </div>
          </div>

          {/* EK MALZEMELER */}
          <div className="form-group">
            <label>Ek Malzemeler</label>
            <p className="hint">En fazla 10 malzeme seçebilirsin. 5₺</p>

            <div className="toppings-grid">
              {TOPPINGS.map((t) => (
                <ToppingCheckbox
                  key={t}
                  label={t}
                  checked={toppings.includes(t)}
                  onChange={() => toggleTopping(t)}
                />
              ))}
            </div>

            {!isToppingsValid && (
              <span className="error-msg">En az 4 malzeme seçmelisin.</span>
            )}
          </div>

          {/* NOT */}
          <div className="form-group">
            <label>Sipariş Notu</label>
            <textarea
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* ADET + ÖZET */}
          <div className="order-bottom-row">
            <div className="quantity-box">
              <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <div className="summary-box">
              <h3>Sipariş Toplamı</h3>

              <div className="summary-line">
                <span>Seçimler</span>
                <span>{toppingsTotal.toFixed(2)}₺</span>
              </div>

              <div className="summary-line total">
                <span>Toplam</span>
                <span>{subtotal.toFixed(2)}₺</span>
              </div>

              <button
                type="submit"
                className="btn-primary full"
                disabled={!formValid || isSubmitting}
              >
                {isSubmitting ? 'Gönderiliyor...' : 'SİPARİŞ VER'}
              </button>
            </div>
          </div>

          {formError && <p className="error-msg global">{formError}</p>}
          {networkError && <p className="error-msg global">{networkError}</p>}
        </form>
      </div>
    </section>
  );
}
