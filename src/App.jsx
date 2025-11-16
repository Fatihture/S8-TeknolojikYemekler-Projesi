import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Order from './pages/Order.jsx';
import Success from './pages/Success.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

function App() {
  const [orderData, setOrderData] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  // IT2: Ana sayfa için dinamik kategori ve ürün verileri
  const categories = [
    { id: 1, label: 'Ramen', icon: '/images/iteration-2-images/icons/1.svg' },
    { id: 2, label: 'Pizza', icon: '/images/iteration-2-images/icons/2.svg' },
    { id: 3, label: 'Burger', icon: '/images/iteration-2-images/icons/3.svg' },
    { id: 4, label: 'Kızartmalar', icon: '/images/iteration-2-images/icons/4.svg' },
    { id: 5, label: 'Fast Food', icon: '/images/iteration-2-images/icons/5.svg' },
    { id: 6, label: 'Soft Drink', icon: '/images/iteration-2-images/icons/6.svg' },
  ];

  const popularFoods = [
    {
      id: 1,
      title: 'Terminal Pizza',
      price: '60₺',
      image: '/images/iteration-2-images/pictures/food-1.png',
      category: 'Pizza',
    },
    {
      id: 2,
      title: 'Position Absolute Acı Pizza',
      price: '85.50₺',
      image: '/images/iteration-2-images/pictures/food-2.png',
      category: 'Pizza',
    },
    {
      id: 3,
      title: 'useEffect Tavuklu Burger',
      price: '70₺',
      image: '/images/iteration-2-images/pictures/food-3.png',
      category: 'Burger',
    },
  ];

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Switch>
          <Route exact path="/">
            <Home categories={categories} popularFoods={popularFoods} />
          </Route>

          <Route path="/order">
            <Order
              setOrderData={setOrderData}
              setApiResponse={setApiResponse}
            />
          </Route>

          <Route path="/success">
            <Success orderData={orderData} apiResponse={apiResponse} />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
