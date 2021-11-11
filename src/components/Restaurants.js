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
      <div className="card" key={restaurant.id}>
        <div className="card-body col-3 listRestaurants">
          <p>{restaurant.name}</p>
          <p>{restaurant.opening_date}</p>

        </div>
      </div>
    ));

  return (
    <div className="">
      <h2 className="restaurants">Restaurants</h2>
      {loading && <span className="spinner-border spinner-border-lg" />}
      <div>
        <label htmlFor="search" className="restaurants">
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
