import {
    Link, Redirect, useHistory, useParams,
  } from 'react-router-dom';
  import { useDispatch, useSelector } from 'react-redux';
  import API from '../api/api';
  import { getCollections } from '../redux/collectionsSlice';

  const Collection = () => {
    const { data: user } = useSelector((state) => state.user);
    const doctor = useSelector((state) => state.doctor);
    const dispatch = useDispatch();
    const history = useHistory();
  
    if (!user) {
      return <Redirect to="/Login" />;
    }
  
    const { id } = useParams();
  
    const handleDelete = (id) => {
      const token = localStorage.getItem('token');
      fetch(
        `${API}/collections/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ).then(() => {
        dispatch(getCollections(token));
        history.push('/collections');
      });
    };
  
    const { error, loading } = doctor;
  
    return (
      <div className="container">
        <header className="jumbotron">
          {loading && <span className="spinner-border spinner-border-lg" />}
          {
            collection && (
            <div className="card w-50">
              <div className="card-body">
                <p className="card-text">
                  Collection Id: &nbsp;
                  {id}
                </p>
                <p>
                  With &nbsp;
                  <Link to={`/collections/${collection.id}`}>
                    {collection.data.name}
                  </Link>
                </p>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => { handleDelete(id); }}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
            )
          }
          {
            error && <p>{error}</p>
          }
        </header>
      </div>
    );
  };
  
  export default Collection;
  