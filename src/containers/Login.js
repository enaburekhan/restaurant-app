import { useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm';

const Login = () => {
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
