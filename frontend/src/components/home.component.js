import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {useSelector } from 'react-redux';
const Home = () => {
  const [data, setData] = useState({
    currentUser: '',
    showAdminBoard: undefined
  });
  const { user } = useSelector((state) => state.moduleAuth);
  useEffect(() => {
    if (user) {
      setData({ currentUser: user, showAdminBoard: user.roles.some((e) => e.name === 'admin') });
    }
  }, [user]);
  return (
    <div className="container py-4">
      <h1>Welcome</h1>
      <h4>You can access our panels in the following links:</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to={'/products'} className="nav-link">
            Products
          </Link>
        </li>
        {data.showAdminBoard && (
          <>
            <li className="list-group-item">
              <Link to={'/users'} className="nav-link">
                Users
              </Link>
            </li>
            <sli className="list-group-item">
              <Link to={'/orders'} className="nav-link">
                Orders
              </Link>
            </sli>
          </>
        )}
      </ul>
    </div>
  );
};
export default Home;
