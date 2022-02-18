import { useState, useEffect } from 'react';
import axios from 'axios';
import header from '../services/auth-header';
import { Link } from 'react-router-dom';

const API_URL = process.env.API_URL || 'http://localhost:4000/api';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/users`, { headers: header() })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`${API_URL}/users/${id}`, { headers: header() })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
    <h1 className='mt-3'>List Users</h1>
      <Link className="btn btn-success my-3 " to={'/users/create'}>
        Create User
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Roles</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((p) => (
            <tr key={p._id}>
              <th scope="row">{p.username}</th>
              <td>{p.email}</td>
              <td>
                <ul>
                  {p.roles.forEach((role) => (
                    <li>{role.name}</li>
                  ))}
                </ul>
              </td>
              <td>
                <Link className="btn btn-primary" to={`/users/${p._id}`} key={p._id}>
                  Editar
                </Link>
                <button className="btn btn-danger" onClick={() => deleteUser(p._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
