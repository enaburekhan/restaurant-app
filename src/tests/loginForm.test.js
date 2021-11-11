import { create } from 'react-test-renderer';
import * as reactRedux from 'react-redux';
import LoginForm from '../components/LoginForm';

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
jest.spyOn(reactRedux, 'useDispatch');

test('renders correctly', () => {
  useSelectorMock.mockReturnValue({ loading: true });
  const tree = create(<LoginForm endpoint="authentications" />).toJSON();
  expect(tree).toMatchSnapshot();
});