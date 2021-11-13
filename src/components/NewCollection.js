/* eslint-disable camelcase */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { postCollections } from '../redux/collectionsSlice';

const NewCollection = () => {
  const [restaurantType, setRestaurantType] = useState('');
  const [userId, setUserId] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.restaurants);

  const onChangeUserId = (e) => {
    const userId = e.target.value;
    setUserId(userId);
  };

  const onChangeRestaurantType = (e) => {
    const restaurantType = e.target.value;
    setRestaurantType(restaurantType);
  };

  const user_id = userId;
  const restaurant_type = restaurantType;

  if (!userData) {
    return <Redirect to="/Login" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);

    // eslint-disable-next-line no-underscore-dangle

    dispatch(postCollections({
      user_id, restaurant_type,
    }))
      .then(() => {
        setSuccessful(true);
        alert.show('Restaurant created', {
          type: 'success',
          timeout: 2000,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setSuccessful(false);
      });
  };

  const options = data && (
    data.map((restaurant) => (
      <option
        key={restaurant.id}
        value={restaurant.id}
      >
        {restaurant.name}
      </option>
    ))
  );

  if (successful) {
    return <Redirect to="/collections" />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <form onSubmit={handleSubmit}>
          { !successful && (
          <div>
            <div className="form-group create">
              <label htmlFor="restaurantType" className="control-label">
                Restaurant Type
                <input
                  type="text"
                  className="form-control"
                  name="restaurantType"
                  id="restaurantType"
                  required
                  value={restaurantType}
                  onChange={onChangeRestaurantType}
                />
              </label>
            </div>
            <div className="form-group create">
              <label htmlFor="restaurantId">
                Select from list:
                <select
                  value={userId}
                  onChange={onChangeUserId}
                >

                  {loading ? <option>Loading..</option> : options }
                </select>
              </label>
            </div>
            <div className="form-group create">
              <button className="btn btn-primary btn-block" disabled={loading} type="submit">
                {loading && (
                <span className="spinner-border spinner-border-sm" />
                )}
                <span>Add</span>
              </button>
            </div>
          </div>
          )}
          {error && (
          <div className="form-group">
            <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
              {error}
            </div>
          </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default NewCollection;
