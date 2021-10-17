import React from 'react';
import { MODE_OPTION } from './../constants';
import { renderModeIcon } from './../utils';
export default function Route({
  content,
  mode,
  transport,
  stopCode,
  from,
  to,
  order,
}) {
  const translateTransportationByMode = (mode, transport) => {
    switch (mode) {
      case MODE_OPTION.WALK:
        return '';

      case MODE_OPTION.SUBWAY:
      case MODE_OPTION.RAIL:
      case MODE_OPTION.TRAM:
      case MODE_OPTION.BUS:
        return `(${transport}) at ${to.stop.code}`;

      default:
        return null;
    }
  };
  return (
    <div className="route">
      {order}. {renderModeIcon(mode)}
      {translateTransportationByMode(mode, transport)}
      {content}
    </div>
  );
}
