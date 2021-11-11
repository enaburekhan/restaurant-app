/* eslint-disable camelcase */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { postCollections } from '../redux/collectionsSlice';

const NewCollection = () => {
  const [vegetarianFavorites, setVegetarianFavorites] = useState('');
  const [meatLovers, setMeatLovers] = useState('');
  const [userId, setUserId] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.restaurants);

  const onChangeVegatarianFavorites = (e) => {
    const vegetarianFavorites = e.target.value;
    setVegetarianFavorites(vegetarianFavorites);
  };

  const onChangeMeatLovers = (e) => {
    const meatLovers = e.target.value;
    setMeatLovers(meatLovers);
  };

  const onChangeUserId = (e) => {
    const userId = e.target.value;
    setUserId(userId);
  };

  const vegetarian_favorites = vegetarianFavorites;
  const meat_lovers = meatLovers;
  const user_id = userId;

  if (!userData) {
    return <Redirect to="/Login" />;
  }

  //   const { user_id } = userData;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);

    // eslint-disable-next-line no-underscore-dangle

    dispatch(postCollections({
      vegetarian_favorites, meat_lovers, user_id,
    }))
      .then(() => {
        setSuccessful(true);
        alert.show('Collection created', {
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
    data.map((collection) => (
      <option
        key={collection.id}
        value={collection.id}
      >
        {collection.name}
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
              <label htmlFor="vegetarianFavorites" className="control-label">
                Vegetarian Favorites
                <input
                  type="text"
                  className="form-control"
                  name="VegatarianFavorites"
                  id="vegetarianFavorites"
                  required
                  value={vegetarianFavorites}
                  onChange={onChangeVegatarianFavorites}
                />
              </label>
            </div>
            <div className="form-group create">
              <label htmlFor="meatLovers" className="control-label">
                Meat Lovers
                <input
                  type="text"
                  className="form-control"
                  name="meatLovers"
                  id="meatLovers"
                  required
                  value={meatLovers}
                  onChange={onChangeMeatLovers}
                />
              </label>
            </div>
            <div className="form-group create">
              <label htmlFor="userId">
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
                <span>Create</span>
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
