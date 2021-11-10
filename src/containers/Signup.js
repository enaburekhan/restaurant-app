// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import RegisterForm from '../components/RegisterForm';
// import { changeType } from '../redux/typeSlice';

const Signup = () => (
  <>
    <RegisterForm endpoint="users" />
  </>
);
export default Signup;
