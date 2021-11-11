import restaurantsReducer, { getRestaurants } from '../redux/restaurantsSlice';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

test('returns initial state', () => {
  const actual = restaurantsReducer(undefined, {});
  expect(actual).toEqual(initialState);
});

test('getRestaurants.pending', () => {
  const nextState = restaurantsReducer(initialState, getRestaurants.pending);
  expect(nextState.data).toBe(initialState.data);
  expect(nextState.loading).toBe(true);
});

test('getRestaurants.fulfilled', () => {
  const mockAsyncPayload = { restaurants: { name: 'The Purple Pig', opening_date: 'Mon, Weds 11:45 am - 1:15 pm' } };
  const nextState = restaurantsReducer(initialState, getRestaurants.fulfilled(mockAsyncPayload));
  expect(nextState.data).toBe(mockAsyncPayload);
  expect(nextState.loading).toBe(false);
});

test('getRestaurants.rejected', () => {
  const mockAsyncPayloadError = 'error';
  const nextState = restaurantsReducer(
    initialState, getRestaurants.rejected(mockAsyncPayloadError),
  );
  expect(nextState.error).toBe(mockAsyncPayloadError);
  expect(nextState.loading).toBe(false);
});

