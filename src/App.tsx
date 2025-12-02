import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// Halaman Utama
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import About from "./pages/about";
import Menu from "./pages/menu";
import ProductDetail from "./pages/products/[id]";

// profile
import Profile from "./pages/profile";
import Likes from "./pages/likes";
import Cart from "./pages/cart";
import Orders from "./pages/orders/orders";

// auth
import Login from "./pages/authPage/login";
import Register from "./pages/authPage/register";
import Checkout from "./payment/checkout";

import NotFound from "./pages/NotFound";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "sonner";

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#FEF1E1",
            border: "1px solid #3E1801",
            color: "#3E1801",
          },
          className: "font-inter",
          duration: 1000,
        }}
      />
      <Routes>
        {/* halaman utama dengan header & footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* profile */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/likes" element={<Likes />} />

          {/* checkout */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* route selain yang ada */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* per akun-an tanpa header & footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
