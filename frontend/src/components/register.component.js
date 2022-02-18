import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserRegister } from '../store/slices/auth/actions';

const Register = ({ history }) => {
  const [user, setUser] = useState({ username: '', email: '', password: '', successful: false });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // const history = useHistory();
    setUser({ ...user, successful: true });
    dispatch(fetchUserRegister(user))
      .then(() => {
        console.log('dispatch Register ');
        history.push('profile');
        setUser({ ...user, successful: true });
      })
      .catch(() => {
        setUser({ ...user, successful: false });
      });
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <form onSubmit={handleSubmit}>
          {!user.successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  className="form-control"
                  name="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
