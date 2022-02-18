import { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../services/auth-header';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = process.env.API_URL || 'http://localhost:4000/api';

const OrderOne = () => {
  const [order, setOrder] = useState({
    user: {},
    products: [],
    total: '',
    loading: false
  });
  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrder({ ...order, loading: true });
    axios
      .put(`${API_URL}/orders/${params.orderId}`, order, { headers: header() })
      .then(() => {
        navigate('/orders');
      })
      .catch(() => {
        setOrder({ ...order, loading: false });
      });
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/orders/${params.orderId}`, { headers: header() })
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => console.log(err));
  }, [params.orderId]);
  return (
    <div className="container">
      <h1>Edit Order</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Order Sale By: {order.user.username}</label>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            className="form-control"
            name="price"
            value={order.price}
            onChange={(e) => setOrder({ ...order, price: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imgURL">Image Url</label>
          <input
            type="text"
            className="form-control"
            name="imgURL"
            value={order.imgURL}
            onChange={(e) => setOrder({ ...order, imgURL: e.target.value })}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block" disabled={order.loading}>
            {order.loading && <span className="spinner-border spinner-border-sm"></span>}
            <span>Actualizar</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderOne;
