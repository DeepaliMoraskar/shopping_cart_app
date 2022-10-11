import React from "react";
import HomePage from "./routes/HomePage/HomePage";
import RegisterAuthentication from "./routes/RegisterAuthentication/RegisterAuthentication";
import LoginAuthentication from "./routes/LoginAuthentication/LoginAuthentication";
import { Routes, Route } from "react-router-dom";
import ProductListPage from "./routes/ProductPage/ProductListPage";
import Navbar from "./components/NavBar/Navbar";
import './App.scss'

function App() {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="register" element={<RegisterAuthentication />} />
        <Route path="login" element={<LoginAuthentication />} />
      </Routes>
      <footer className='copyright'>
        <div className='copyright-container'>
          <p>Copyright © 2011-2018 Sabka Bazar Grocery Supplies Pvt Ltd</p>
        </div>
      </footer>
    </main>
  );
}

export default App;
