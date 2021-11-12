import collectionsReducer, { postCollections, getCollections } from '../redux/collectionsSlice';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

test('returns initial state', () => {
  const actual = collectionsReducer(undefined, {});
  expect(actual).toEqual(initialState);
});

test('postCollections.pending', () => {
  const nextState = collectionsReducer(initialState, postCollections.pending);
  expect(nextState.data).toBe(initialState.data);
  expect(nextState.loading).toBe(true);
});

test('postCollections.fulfilled', () => {
  const mockAsyncPayload = { collections: { restaurantType: 'The purple joint', userId: 1 } };
  const nextState = collectionsReducer(initialState, postCollections.fulfilled(mockAsyncPayload));
  expect(nextState.loading).toBe(false);
});

test('postCollections.rejected', () => {
  const mockAsyncPayloadError = 'error';
  const nextState = collectionsReducer(
    initialState, postCollections.rejected(mockAsyncPayloadError),
  );
  expect(nextState.error).toBe(mockAsyncPayloadError);
  expect(nextState.loading).toBe(false);
});

test('getCollections.pending', () => {
  const nextState = collectionsReducer(initialState, getCollections.pending());
  expect(nextState.data).toBe(initialState.data);
  expect(nextState.loading).toBe(true);
});

test('getCollections.fulfilled', () => {
  const mockAsyncPayload = { collections: { restaurantType: 'The purple joint', userId: 1 } };
  const nextState = collectionsReducer(initialState, getCollections.fulfilled(mockAsyncPayload));
  expect(nextState.data).toBe(mockAsyncPayload);
  expect(nextState.loading).toBe(false);
});

test('getCollections.rejected', () => {
  const mockAsyncPayloadError = 'error';
  const nextState = collectionsReducer(
    initialState, getCollections.rejected(mockAsyncPayloadError),
  );
  expect(nextState.error).toBe(mockAsyncPayloadError);
  expect(nextState.loading).toBe(false);
});
