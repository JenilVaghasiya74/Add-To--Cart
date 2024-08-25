import './App.css';
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Categories from './Components/Categories';
import { Route, Routes } from 'react-router-dom';
import Data from './Components/Data';
import { useEffect, useState } from 'react';
import Cart from './Components/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  // const [Alldata, setAlldata] = useState('');


  // useEffect(() => {
  //   fetch('https://dummyjson.com/products/')
  //     .then(response => response.json())
  //     .then(data => setAlldata(data.products));
  // }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Categories  />} />
        <Route path='/data/:id' element={<Data />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
