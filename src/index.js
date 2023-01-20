import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginComponent from './component/login';
import RegisterComponent from './component/register';
import HomeComponent from './component/home';
import DetailProductComponent from './component/detailProduct';
import CartComponent from './component/cart';
import CheckoutComponent from './component/checkout';
import EditUserComponent from './component/editUser';

// import Test1Component from './component/Test1';
// import Test2Component from './component/Test2';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginComponent />
    // element: <Test1Component />
    // element: <Test2Component />
  },
  {
    path: "/register",
    element: <RegisterComponent />
  },
  {
    path: "/home",
    element: <HomeComponent />
  },
  {
    path: "/product/:id",
    element: <DetailProductComponent />
  },
  {
    path: "/cart",
    element: <CartComponent />
  },
  {
    path: "/checkout",
    element: <CheckoutComponent />
  },
  {
    path: "/editUser/:id",
    element: <EditUserComponent />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
