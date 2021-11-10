// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../components/RegisterForm';
// import { changeType } from '../redux/typeSlice';

const Login = () => {
  // const dispatch = useDispatch();
  // const access = 'Login';
  // const token = localStorage.setItem('token');

  // useEffect(() => {
  //   dispatch(changeType(access));
  // }, []);

  const { error } = useSelector((state) => state.user);

  return (
    <>
      { error
        ? (
          <div>
            <div className="login-error">{error}</div>
            <br />
            <LoginForm endpoint="authentications" />
          </div>
        )
        : (
          <LoginForm endpoint="authentications" />
        )}
    </>
  );
};

export default Login;
