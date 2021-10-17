import React from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
// utils
import { notificationActions } from './../actions';
import { useDispatch, useSelector } from 'react-redux';
import { checkLocationPermission } from './../utils';
const SearchInput = ({ label = 'Input', onLocationClick, locationName }) => {
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [search, setSearch] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const onChange = (e) => {
    const { value } = e.target;
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    if (onTimeoutAction && typeof onTimeoutAction === 'function') {
      setSearchTimeout(setTimeout(() => onTimeoutAction(value), 1000));
    }
    setSearch(value);
  };
  const onTimeoutAction = async (value) => {
    try {
      setLoading(true);
      const res = await axios({
        method: 'GET',
        url: `https://api.digitransit.fi/geocoding/v1/autocomplete?text=${value}`,
      });
      if (res) {
        const { features } = res.data;
        if (!features || !features.length) {
          dispatch(
            notificationActions.showNotification({
              message: 'No result matched',
            })
          );
        }
        setData(res.data.features);
      }
    } catch (e) {
      dispatch(
        notificationActions.showNotification({
          message: 'Something went wrong when fetching location by search',
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const _onLocationClick = (location) => {
    setSearch(location.properties.name);
    setData([]);
    if (onLocationClick && typeof onLocationClick === 'function') {
      return onLocationClick(locationName, location);
    }
  };

  const renderData = () => {
    if (!data || !data.length) return null;
    return data.map((location) => (
      <span className="location" onClick={() => _onLocationClick(location)}>
        {location.properties.name}
      </span>
    ));
  };
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const success = async (pos) => {
    var crd = pos.coords;
    try {
      setLoading(true);

      const res = await axios({
        method: 'GET',
        url: `https://api.digitransit.fi/geocoding/v1/reverse?point.lat=${crd.latitude}&point.lon=${crd.longitude}&size=1`,
      });

      if (res && onLocationClick && typeof onLocationClick === 'function') {
        setSearch(res.data.features[0].properties.name);
        onLocationClick(locationName, res.data.features[0]);
      }
    } catch (e) {
      dispatch(
        notificationActions.showNotification({
          message: 'Something went wrong when getting current location',
        })
      );
    } finally {
      setLoading(false);
    }
  };
  const errors = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };
  const onCurrentLocationCheck = () => {
    checkLocationPermission(
      success,
      errors,
      options,
      () => {
        setLoading(true);
      },
      () => setLoading(false)
    );
  };
  return (
    <div className="search-bar" data-testid="searchbar">
      <div className="search-bar__input">
        <TextField
          value={search}
          label={label}
          variant="outlined"
          onChange={onChange}
        />
        <div className="loading">{loading ? <CircularProgress /> : null}</div>
        <span
          className="material-icons current-location"
          onClick={onCurrentLocationCheck}
        >
          my_location
        </span>
      </div>

      {data && data.length ? (
        <div className="search-bar__data">{renderData()}</div>
      ) : null}
    </div>
  );
};
export default SearchInput;
