import { MODE_OPTION } from './constants';
const checkLocationPermission = async (
  success,
  errors,
  options,
  showLoading,
  hideLoading
) => {
  if (navigator.geolocation) {
    showLoading();
    navigator.permissions
      .query({ name: 'geolocation' })
      .then(function (result) {
        hideLoading();
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition(success);
          //If granted then you can directly call your function here
        } else if (result.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(success, errors, options);
        } else if (result.state === 'denied') {
          //If denied then you have to show instructions to enable location
        }
        result.onchange = function () {};
      });
  } else {
    alert('Sorry Not available!');
  }
};
const createPlanQuery = (
  originLat,
  originLng,
  destinationLat,
  destinationLng
) => `
{
  plan(
    from: { lat: ${originLat}, lon: ${originLng}}
    to: { lat: ${destinationLat}, lon: ${destinationLng}}
    numItineraries: 3
  ) {
    itineraries {
      legs {
        mode
        startTime
        endTime
        route {
          gtfsId
          shortName
          longName
          mode
        }
        from {
          lat
          lon
          name
          stop {
            code
            name
            gtfsId
            name
            lat
            lon
            zoneId
          }
        },
        to {
          lat
          lon
          name
          stop {
            code
            name
            gtfsId
            name
            lat
            lon
            zoneId
          }
        },
        agency {
          gtfsId
          name
        },
        distance
        legGeometry {
          length
          points
        }
      }
    }
  }
}
`;
const renderModeIcon = (mode) => {
  let icon = '';
  switch (mode) {
    case MODE_OPTION.WALK:
      icon = 'directions_walk';
      break;
    case MODE_OPTION.TRAM:
      icon = 'tram';
      break;
    case MODE_OPTION.RAIL:
      icon = 'train';
      break;
    case MODE_OPTION.BUS:
      icon = 'directions_bus_filled';
      break;
    case MODE_OPTION.SUBWAY:
      icon = 'subway';
      break;
    default:
      return null;
  }
  return <span class="material-icons">{icon}</span>;
};
export { checkLocationPermission, createPlanQuery, renderModeIcon };
