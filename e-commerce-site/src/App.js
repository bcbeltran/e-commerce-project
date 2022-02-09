import './App.css';
import HomePage from './pages/homepage/Homepage';
import { Route, Routes, Link } from 'react-router-dom';
import HatsPage from './pages/hats/HatsPage';
import JacketsPage from './pages/jackets/JacketsPage';
import SneakersPage from './pages/sneakers/SneakersPage';
import MensPage from './pages/mens/MensPage';
import WomensPage from './pages/womens/WomensPage';
import ShopPage from './pages/shop/ShopPage';
import Header from './components/header/Header';

function App() {
  return (
    <div>
    <Header />
    <Routes>
      <Route exact path='/' element={<HomePage />} />
      <Route path='/shop' element={<ShopPage />} />
      <Route path='/shop/hats' element={<HatsPage />} />
      <Route path='/shop/jackets' element={<JacketsPage />} />
      <Route path='/shop/sneakers' element={<SneakersPage />} />
      <Route path='/shop/mens' element={<MensPage />} />
      <Route path='/shop/womens' element={<WomensPage />} />
    </Routes>
    </div>
  );
}

export default App;
