import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserLogout } from '../store/slices/auth/actions';

const Navbar = () => {
  const [data, setData] = useState({
    currentUser: '',
    showAdminBoard: undefined
  });
  const { user } = useSelector((state) => state.moduleAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setData({ currentUser: user, showAdminBoard: user.roles.some((e) => e.name === 'admin') });
    }
  }, [user]);
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Sales App
        </Link>
        <div className="navbar-nav mr-auto">
          {data.showAdminBoard && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  Orders
                </Link>
              </li>
            </>
          )}
        </div>
        {data.currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={'/profile'} className="nav-link">
                {data.currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={() => dispatch(fetchUserLogout())}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={'/login'} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/register'} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
