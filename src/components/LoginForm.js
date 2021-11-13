import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userAuth } from '../redux/userSlice';
import Loading from './Loading';

const LoginForm = ({ endpoint }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      history.push('/restaurants');
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userAuth({
      username, password, endpoint,
    }));
  };
  if (user.loading) {
    return <Loading />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group create">
          <label htmlFor="username" className="control-label">
            Username
            <input
              type="text"
              name="username"
              id="username"
              required
              minLength="3"
              maxLength="15"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group create">
          <label htmlFor="password" className="control-label">
            Password
            <input
              type="password"
              name="password"
              id="password"
              required
              minLength="5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <div className="form-group create">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
          >
            Login
          </button>
        </div>
      </form>
      <p className="text-center">
        Do you need to create an account?
        {' '}
        <Link to="/Signup">Signup</Link>
      </p>
    </>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  endpoint: PropTypes.string.isRequired,
};
