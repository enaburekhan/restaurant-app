/* eslint-disable no-unused-vars */
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getRestaurants, selectAllRestaurants } from '../redux/restaurantsSlice';

const Restaurants = () => {
  const dispatch = useDispatch();
  // const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch]);

  const restaurants = useSelector(selectAllRestaurants);
  const { loading } = restaurants;

  const renderedRestaurants = restaurants.data && restaurants.data.map((restaurant) => (
    <div className="card style=width: 18rem " key={restaurant.id}>
      <div className="card-body col-3 listDoctors">
        <p className="doctor-name">{restaurant.name}</p>
        <p className="doctor-specialization">{restaurant.opening_date}</p>
        {/* <Link to={`/doctors/${doctor.id}`} className="btn btn-info ">
          View Doctor
        </Link> */}
      </div>
    </div>
  ));

  return (
    <div className="">
      <h2>Restaurants</h2>
      {loading && <span className="spinner-border spinner-border-lg" />}
      <h2>{renderedRestaurants}</h2>
    </div>

  );
};

export default Restaurants;
