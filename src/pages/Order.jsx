import { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ToppingCheckbox from '../components/ToppingCheckbox.jsx';

const BASE_PRICE = 85.5;
const TOPPING_PRICE = 5;
const MAX_TOPPINGS = 10;
const MIN_TOPPINGS = 4;

const TOPPINGS = [
  'Pepperoni',
  'Sosis',
  'Kanada Jambonu',
  'Tavuk Izgara',
  'Soğan',
  'Domates',
  'Mısır',
  'Sucuk',
  'Jalapeno',
  'Sarımsak',
  'Biber',
  'Sucuk (extra)',
  'Ananas',
  'Kabak',
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
      setToppings(toppings.filter((t) => t !== item));
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
  const isToppingsValid =
    toppings.length >= MIN_TOPPINGS && toppings.length <= MAX_TOPPINGS;

  const formValid = isNameValid && isSizeValid && isDoughValid && isToppingsValid;

  const toppingsTotal = useMemo(
    () => toppings.length * TOPPING_PRICE,
    [toppings]
  );

  const subtotal = useMemo(
    () => (BASE_PRICE + toppingsTotal) * quantity,
    [toppingsTotal, quantity]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setNetworkError('');

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
      toplam: subtotal,
    };

    try {
      setIsSubmitting(true);

      const response = await axios.post('https://reqres.in/api/pizza', payload);

      setOrderData(payload);
      setApiResponse(response.data);

      console.log('Sipariş Özeti:', payload);
      console.log('API Yanıtı:', response.data);

      history.push('/success');
    } catch (err) {
      console.error(err);
      setNetworkError(
        'Sipariş gönderilirken bir hata oluştu. İnternet bağlantını kontrol et.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="order-page">
      <div className="order-top-bar">
        <div className="order-top-inner">
          <h1 className="order-logo-text">Teknolojik Yemekler</h1>
          <span className="order-breadcrumb">Anasayfa / Sipariş Oluştur</span>
        </div>
      </div>

      <div className="order-container">
        <div className="order-banner">
        </div>

        <form className="order-form" onSubmit={handleSubmit}>
          <header className="order-header-section">
            <h2>Position Absolute Acı Pizza</h2>
            <div className="order-header-meta">
              <span className="order-score">4.9</span>
              <span className="order-reviews">(200)</span>
            </div>
            <p className="order-price">{BASE_PRICE.toFixed(2)}₺</p>
            <p className="order-description">
              Frontend dev olarak hala position-absolute kullanıyorsan bu çok acı
              pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
              diğer malzemelerle kaplanmış, taş fırında genellikle odun ateşinde
              pişirilen, yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan
              oluşan İtalyan kökenli lezzetli bir yemektir.
            </p>
          </header>

          {/* İsim */}
          <div className="form-group">
            <label htmlFor="name">
              İsim <span className="required">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="İsmini gir"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {!isNameValid && name.length > 0 && (
              <span className="error-msg">İsim en az 3 karakter olmalı.</span>
            )}
          </div>

          {/* Boyut & Hamur */}
          <div className="form-row">
            <div className="form-group half">
              <p>
                Boyut Seç <span className="required">*</span>
              </p>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="size"
                    value="kucuk"
                    checked={size === 'kucuk'}
                    onChange={(e) => setSize(e.target.value)}
                  />
                  Küçük
                </label>
                <label>
                  <input
                    type="radio"
                    name="size"
                    value="orta"
                    checked={size === 'orta'}
                    onChange={(e) => setSize(e.target.value)}
                  />
                  Orta
                </label>
                <label>
                  <input
                    type="radio"
                    name="size"
                    value="buyuk"
                    checked={size === 'buyuk'}
                    onChange={(e) => setSize(e.target.value)}
                  />
                  Büyük
                </label>
              </div>
              {!isSizeValid && (
                <span className="error-msg">
                  Bir pizza boyutu seçmelisin.
                </span>
              )}
            </div>

            <div className="form-group half">
              <label htmlFor="dough">
                Hamur Seç <span className="required">*</span>
              </label>
              <select
                id="dough"
                value={dough}
                onChange={(e) => setDough(e.target.value)}
              >
                <option value="">Hamur Kalınlığı</option>
                <option value="ince">İnce</option>
                <option value="normal">Normal</option>
                <option value="kalin">Kalın</option>
              </select>
              {!isDoughValid && (
                <span className="error-msg">Hamur seçmelisin.</span>
              )}
            </div>
          </div>

          {/* Ek Malzemeler */}
          <div className="form-group">
            <p>Ek Malzemeler</p>
            <p className="hint">
              En fazla {MAX_TOPPINGS} malzeme seçebilirsiniz. 5₺
            </p>
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
              <span className="error-msg">
                En az {MIN_TOPPINGS} malzeme seçmelisin.
              </span>
            )}
          </div>

          {/* Not */}
          <div className="form-group">
            <label htmlFor="note">Sipariş Notu</label>
            <textarea
              id="note"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* Adet + Özet */}
          <div className="order-bottom-row">
            <div className="quantity-box">
              <button
                type="button"
                onClick={() =>
                  setQuantity((q) => (q > 1 ? q - 1 : 1))
                }
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
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
          {networkError && (
            <p className="error-msg global">{networkError}</p>
          )}
        </form>
      </div>
    </section>
  );
}
