import { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../services/auth-header';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';

const API_URL = process.env.API_URL || 'http://localhost:4000/api';

const ProductList = () => {
  const [data, setData] = useState({
    currentUser: '',
    showAdminBoard: undefined
  });
  const [products, setProducts] = useState([]);
  const [select, setSelection] = useState([]);
  const [search, setSeach] = useState('');
  const { user } = useSelector((state) => state.moduleAuth);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      sortable: false,
      flex: 1
    },
    {
      field: 'barcode',
      headerName: 'Barcode',
      sortable: false,
      flex: 1
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      flex: 1,
      sortable: false
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      flex: 1,
      hide: !data.showAdminBoard,
      renderCell: (params) => {
        return (
          <>
            <Link className="btn btn-primary" to={`${params.id}`}>
              Editar
            </Link>
            <button className="btn btn-danger" onClick={() => deleteProduct(params.id)}>
              Delete
            </button>
          </>
        );
      }
    }
  ];

  useEffect(() => {
    getProducts();
    if (user) {
      setData({ currentUser: user, showAdminBoard: user.roles.some((e) => e.name === 'admin') });
    }
  }, [products.length > 0]);

  const getProducts = async () =>
    await axios
      .get(`${API_URL}/products`, { headers: header() })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));

  const deleteProduct = (id) => {
    axios
      .delete(`${API_URL}/products/${id}`, { headers: header() })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const searchBarcode = (e) => {
    e.preventDefault();
    axios
      .get(`${API_URL}/products?searchBarcode=${search}`, { headers: header() })
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };
  const TotalSelected = () => {
    const productSelected = [];
    select.map((e) => {
      return products.filter((p) => {
        if (p._id === e) {
          return productSelected.push(p);
        }
      });
    });
    const total = productSelected.map((i) => i.price).reduce((prev, curr) => prev + curr, 0);
    return <>{total}</>;
  };

  const createOrder = async () => {
    await axios
      .post(`${API_URL}/orders`, { products: select, user: user.id }, { headers: header() })
      .then((res) => {
        setSelection([]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mb-3">
      <h1>List Products</h1>
      {data.showAdminBoard && (
        <>
          <div className="mb-3 row align-items-center justify-content-between">
            <div className="col-auto">
              <Link className="btn btn-success my-3 " to={'/products/create'}>
                Create Product
              </Link>
            </div>
            <form className="col-auto row align-items-center" onSubmit={searchBarcode}>
              <div className="col-auto">
                <label type="text">Search by barcode:</label>
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={search}
                  onChange={(e) => setSeach(e.target.value)}
                />
              </div>
              <div className="col-auto">
                <input className="btn btn-primary" type="submit" value="Search" />
              </div>
            </form>
          </div>
        </>
      )}
      <div>
        <DataGrid
          className="mt-3"
          rows={products}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          autoHeight={true}
          getRowId={(row) => row._id}
          loading={products.length === 0}
          onSelectionModelChange={(selectModel) => {
            setSelection(selectModel);
          }}
          selectionModel={select}
        />
        <div className="mt-3 mx-auto">
          <div>
            <strong>Total sale: </strong>
            {TotalSelected()}
          </div>
          <div>
            <button className="btn btn-primary" onClick={() => createOrder()}>
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
