import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// redux
import store from './store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home.component';
import Login from './components/login.component';
import Register from './components/register.component';
import Profile from './components/profile.component';
import ProductList from './components/productList.component';
import ProductOne from './components/productOne.component';
import ProductCreate from './components/productCreate.component';
import UserList from './components/userList.component';
import UserOne from './components/userOne.component';
import UserCreate from './components/userCreate.component';
import OrderList from './components/orderList.component';
import OrderOne from './components/orderOne.component';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="login" exact element={<Login />} />
            <Route path="register" exact element={<Register />} />
            <Route path="profile" exact element={<Profile />} />
            <Route path="products" exact element={<ProductList />} />
            <Route path="/products/:productId" exact element={<ProductOne />} />
            <Route path="/products/create" exact element={<ProductCreate/>} />
            <Route path="users" exact element={<UserList />} />
            <Route path="/users/:userId" exact element={<UserOne />} />
            <Route path="/users/create" exact element={<UserCreate />} />
            <Route path="orders" exact element={<OrderList />} />
            <Route path="/orders/:orderId" exact element={<OrderOne/>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
