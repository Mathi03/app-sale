import { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../services/auth-header';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';

const API_URL = process.env.API_URL || 'http://localhost:4000/api';

const OrderList = () => {
  const [data, setData] = useState({
    currentUser: '',
    showAdminBoard: undefined
  });
  const [orders, setOrders] = useState([]);
  const [select, setSelection] = useState([]);
  const [search, setSeach] = useState('');
  const { user } = useSelector((state) => state.moduleAuth);

  const columns = [
    {
      field: 'username',
      headerName: 'Username',
      sortable: false,
      flex: 1,
      valueGetter: (params) => {
        return params.row.user.username;
      }
    },
    {
      field: 'name',
      headerName: 'Product',
      sortable: false,
      flex: 1,
      valueGetter: (params) => {
        let result = [];
        if (params.row.products) {
          params.row.products.map((e) => result.push(e.name));
        } else {
          result = ['Unknown'];
        }
        return result.join(', ');
      }
    },
    {
      field: 'total',
      headerName: 'Total Sale',
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
            <button className="btn btn-danger" onClick={() => deleteOrder(params.id)}>
              Delete
            </button>
          </>
        );
      }
    }
  ];

  useEffect(() => {
    getOrders();
    if (user) {
      setData({ currentUser: user, showAdminBoard: user.roles.some((e) => e.name === 'admin') });
    }
  }, [orders.length > 0]);

  const getOrders = async () =>
    await axios
      .get(`${API_URL}/orders`, { headers: header() })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));

  const deleteOrder = (id) => {
    axios
      .delete(`${API_URL}/orders/${id}`, { headers: header() })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const searchBarcode = (e) => {
    e.preventDefault();
    axios
      .get(`${API_URL}/orders?searchId=${search}`, { headers: header() })
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };
  const TotalSelected = () => {
    const productSelected = [];
    select.map((e) => {
      return orders.filter((p) => {
        if (p._id === e) {
          return productSelected.push(p);
        }
      });
    });
    const total = productSelected.map((i) => i.price).reduce((prev, curr) => prev + curr, 0);
    return <>{total}</>;
  };

  const createOrder = async () => {
    // await axios
    //   .post(`${API_URL}/orders`, { products: select, user: user.id }, { headers: header() })
    //   .then((res) => {
    //     setSelection([]);
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <div className="container">
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
          rows={orders}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          autoHeight={true}
          getRowId={(row) => row._id}
          loading={orders.length === 0}
          onSelectionModelChange={(selectModel) => {
            setSelection(selectModel);
          }}
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

export default OrderList;
