import { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ToppingCheckbox from '../components/ToppingCheckbox.jsx';
import { Link } from "react-router-dom";


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

  const [customerName, setCustomerName] = useState("");


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
      return;
    }

    if (toppings.length >= MAX_TOPPINGS) {
      setFormError(`En fazla ${MAX_TOPPINGS} malzeme seçebilirsin.`);
      return;
    }

    setToppings([...toppings, item]);
  };

  const isNameValid = customerName.trim().length >= 3;


  const isSizeValid = !!size;
  const isDoughValid = !!dough;
  const isToppingsValid = toppings.length >= MIN_TOPPINGS;

  const formValid = isSizeValid && isDoughValid && isToppingsValid && isNameValid;

  const toppingsTotal = useMemo(() => toppings.length * TOPPING_PRICE, [toppings]);
  const subtotal = useMemo(
    () => (BASE_PRICE + toppingsTotal) * quantity,
    [toppingsTotal, quantity]
  );

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formValid) {
    setFormError('Lütfen zorunlu alanları doldurun.');
    return;
  }

  const payload = {
    isim: customerName,
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
      "https://reqres.in/api/success",   
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

  } catch (err) {
    console.log("HATA:", err.response?.data || err);
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

      {/* PİZZA FOTO */}
      <div className="order-banner-big">
        <img
          src="/images/iteration-2-images/pictures/form-banner.png"
          alt="Pizza"
        />
      </div>

      <div className="order-info-box">
        <p className="order-breadcrumb">
       <Link to="/">Anasayfa</Link>
       <span> - </span>
       <Link to="/">Seçenekler</Link>
       <span> - </span>
       <span>Sipariş Oluştur</span>
        </p>


        <h2 className="order-title">Position Absolute Acı Pizza</h2>

        <p className="order-price">{BASE_PRICE.toFixed(2)}₺</p>

        <div className="order-header-meta">
          <span>4.9</span> <span>(200)</span>
        </div>

        <p className="order-description">
          Frontend dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve çeşitli diğer malzemelerle kaplanmış, daha sonra  geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirlen, genellikle yuvarlak , düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir.. Küçük bir pizzaya bazen pizzetta denir.
        </p>
      </div>

      <div className="order-form-wrapper">
        <div className="order-form">
          <form onSubmit={handleSubmit}>

            {/* BOYUT + HAMUR */}
            <div className="form-row">
              <div className="form-group half">
                <label>Boyut Seç *</label>
                <div className="size-options">
                  {['S', 'M', 'L'].map((label, idx) => {
                    const values = ['kucuk', 'orta', 'buyuk'];
                    const val = values[idx];

                    return (
                      <label key={val} className={`size-pill ${size === val ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="size"
                          value={val}
                          checked={size === val}
                          onChange={(e) => setSize(e.target.value)}
                        />
                        {label}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="form-group half">
                <label>Hamur Seç *</label>
                <div className="dough-select-wrapper">
                  <select value={dough} onChange={(e) => setDough(e.target.value)}>
                    <option value="">—Hamur Kalınlığı Seç—</option>
                    <option value="ince">İnce</option>
                    <option value="normal">Normal</option>
                    <option value="kalin">Kalın</option>
                  </select>
                </div>
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
  dataTestId={`topping-${t
    .toLowerCase()
    .replaceAll(" ", "")
    .replaceAll("ı", "i")
    .replaceAll("ö", "o")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ç", "c")
    .replaceAll("ğ", "g")
  }`}
/>



                ))}
              </div>

              {!isToppingsValid && (
                <span className="error-msg">En az 4 malzeme seçmelisin.</span>
              )}
            </div>

            {/* İSİM */}
<div className="form-group">
  <label>İsim *</label>
  <input
    type="text"
    placeholder="Adınızı giriniz"
    value={customerName}
    onChange={(e) => setCustomerName(e.target.value)}
    data-testid="name-input"
  />
  {!isNameValid && customerName.length > 0 && (
    <span className="error-msg">İsim en az 3 karakter olmalıdır.</span>
  )}
</div>


            {/* NOT */}
            <div className="form-group">
              <label>Sipariş Notu</label>
              <textarea
  placeholder="Siparişine eklemek istediğin bir not var mı?"
  value={note}
  onChange={(e) => setNote(e.target.value)}
  data-testid="note-input"
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
  data-testid="submit-btn"
>
  {isSubmitting ? 'Gönderiliyor...' : 'SİPARİŞ VER'}
</button>

              </div>
            </div>

            {formError && <p className="error-msg global">{formError}</p>}
            {networkError && <p className="error-msg global">{networkError}</p>}
          </form>
        </div>
      </div>

    </section>
  );
}
