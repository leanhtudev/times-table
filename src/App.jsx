import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { request, gql } from 'graphql-request';
import { locationActions, notificationActions } from './actions';
import { createPlanQuery } from './utils';
// components
import SearchBar from './components/SearchBar';
import Plan from './components/Plan';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from './components/Snackbar';

const App = () => {
  const dispatch = useDispatch();
  const origin = useSelector((state) => state.location.origin);
  const destination = useSelector((state) => state.location.destination);
  const [plans, setPlans] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (origin && destination) {
      getData(origin, destination);
    }
  }, [origin, destination]);

  const getData = async (origin, destination) => {
    const {
      geometry: {
        coordinates: [originLng, originLat],
      },
    } = origin;
    const {
      geometry: {
        coordinates: [destinationLng, destinationLat],
      },
    } = destination;

    try {
      setLoading(true);
      const query = gql`
        ${createPlanQuery(originLat, originLng, destinationLat, destinationLng)}
      `;
      let res = await request(
        'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
        query
      );
      if (res) {
        setPlans(res.plan.itineraries);
      }
    } catch (e) {
      dispatch(
        notificationActions.showNotification({
          message: 'Something went wrong when fetching plan',
        })
      );
    } finally {
      setLoading(false);
    }
  };
  const renderPlans = () => {
    if (loading) return <CircularProgress />;
    if (plans && plans.length) {
      return plans.map((item, key) => (
        <Plan plan={item.legs} order={key + 1} key={key} />
      ));
    }
    return <span>No plan found</span>;
  };
  const saveLocation = (name, location) => {
    dispatch(locationActions.saveLocation(name, location));
  };
  return (
    <div className="app">
      <h1 className="app-header">Time tables</h1>
      <div className="app-search">
        <SearchBar
          label="Origin"
          locationName="origin"
          onLocationClick={saveLocation}
        />
        <SearchBar
          label="Destination"
          locationName="destination"
          onLocationClick={saveLocation}
        />
      </div>
      {renderPlans()}
      <Snackbar />
    </div>
  );
};

export default App;
