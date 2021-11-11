import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getCollections } from '../redux/collectionsSlice';

const Collections = () => {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);

  const collections = useSelector((state) => state.collections);

  const { data, loading } = collections;
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (user) {
      dispatch(getCollections(token));
    }
  }, [dispatch]);

  if (!user) {
    return <Redirect to="/Login" />;
  }

  return (
    <div className="card text-center">
      <h3>Collections</h3>
      {loading && <span className="spinner-border spinner-border-lg" />}
      <div className="card-body d-flex flex-wrap">
        {(!loading && data.length === 0)
        && (
        <h4 className="create-appointment">
          You do not have any collection. Create one
          <Link to="/collections/new">
            here
          </Link>
        </h4>
        )}
      </div>
      {
      data && data.map((collection) => (

        <div className="card m-4" key={collection.id}>
          <div className="card-body d-flex justify-content-center align-items-center">
            <p>
              Vegetarian-favorites:
              {collection.vegetarian_favorites}
            </p>
          </div>
          <div className="card-body">
            <p className="">
              Meat-lovers:
              {collection.meat_lovers}
            </p>
          </div>
        </div>

      ))
  }
    </div>

  );
};

export default Collections;
