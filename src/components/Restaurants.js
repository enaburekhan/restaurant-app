/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getRestaurants, selectAllRestaurants } from '../redux/restaurantsSlice';

const Restaurants = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState('');
  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  const restaurants = useSelector(selectAllRestaurants);

  const { loading } = restaurants;

  const renderedRestaurants = restaurants.data && restaurants.data.filter(
    (val) => val.name.toLowerCase().includes(searchData.toLowerCase())
             || val.opening_date.toLowerCase().includes(searchData.toLowerCase()),
  )
    .map((restaurant) => (
      <div className="card style=width: 18rem " key={restaurant.id}>
        <div className="card-body col-3 listDoctors">
          <p className="doctor-name">{restaurant.name}</p>
          <p className="doctor-specialization">{restaurant.opening_date}</p>

        </div>
      </div>
    ));

  return (
    <div className="">
      <h2>Restaurants</h2>
      {loading && <span className="spinner-border spinner-border-lg" />}
      <div style={{ margin: '0 auto', marginTop: '10%' }}>
        <label htmlFor="search" className="control-label">
          Search:
          <input
            type="text"
            onChange={(event) => { setSearchData(event.target.value); }}
          />
        </label>
        <h2>{renderedRestaurants}</h2>
      </div>
    </div>

  );
};

export default Restaurants;
