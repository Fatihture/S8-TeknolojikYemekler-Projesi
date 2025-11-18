
import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Order from './pages/Order.jsx';
import Success from './pages/Success.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import './styles/Home.css';
import './styles/order.css';
import './styles/success.css';

// import './App.css';

function App() {
  const [orderData, setOrderData] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Switch>
          <Route exact path="/">
            <Home />
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
