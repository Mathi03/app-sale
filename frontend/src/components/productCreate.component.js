import { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../services/auth-header';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.API_URL || 'http://localhost:4000/api';

const ProductOne = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    barcode: '',
    imgURL: '',
    loading: false
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setProduct({ ...product, loading: true });
    axios
      .post(`${API_URL}/products`, product, { headers: header() })
      .then(() => {
        navigate('/products');
      })
      .catch(() => {
        setProduct({ ...product, loading: false });
      });
  };

  useEffect(() => {
  }, []);
  return (
    <div className="container">
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="barcode">Barcode</label>
          <input
            type="text"
            className="form-control"
            name="barcode"
            value={product.barcode}
            onChange={(e) => setProduct({ ...product, barcode: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imgURL">Image Url</label>
          <input
            type="text"
            className="form-control"
            name="imgURL"
            value={product.imgURL}
            onChange={(e) => setProduct({ ...product, imgURL: e.target.value })}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-block my-2" disabled={product.loading}>
            {product.loading && <span className="spinner-border spinner-border-sm"></span>}
            <span>Create</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductOne;
