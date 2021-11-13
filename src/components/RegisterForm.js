import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userAuth } from '../redux/userSlice';
import Loading from './Loading';

const RegisterForm = ({ endpoint }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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
      username, email, password, endpoint,
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
          <label htmlFor="email" className="control-label">
            Email
            <input
              type="text"
              name="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Signup
          </button>
        </div>
      </form>

      <p className="text-center">
        Do you already have an account?
        {' '}
        <Link to="/Login">Login</Link>
      </p>
    </>
  );
};

export default RegisterForm;

RegisterForm.propTypes = {
  endpoint: PropTypes.string.isRequired,
};
