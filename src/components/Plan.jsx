import React from 'react';
import moment from 'moment';
// component
import Route from './Route';
import {renderModeIcon} from './../utils'

export default function Plan({ plan, order }) {
  if (!plan || !plan.length) return <span>No plan</span>;
  const renderItem = () => {
    if (plan && plan.length) {
      return plan.map((item, key) => {
        const { startTime, endTime, mode, route, from, to } = item;
        const content = ` from ${from.name}(
          ${moment(startTime).format('H:mm')}) to ${to.name}(
          ${moment(endTime).format('H:mm')})`;

        return (
          <Route
            content={content}
            mode={mode}
            transport={route?.shortName}
            from={from}
            to={to}
            key={key}
            order={key + 1}
          />
        );
      });
    }
  };
  const renderTimeSummary = (plan) => {
    const startTime = moment(plan[0].startTime).format('H:mm');
    const endTime = moment(plan[plan.length - 1].endTime).format('H:mm');
    return (
      <div className="time">
        <div className="time-period">
          <span>{startTime}</span>
          <span class="material-icons">arrow_forward</span>
          <span>{endTime}</span>
        </div>
        <div className="time-gap">
          {moment(plan[plan.length - 1].endTime - plan[0].startTime).format(
            'mm'
          )}
          mins
        </div>
      </div>
    );
  };
  
  const getTimeGap = (start, end) => {
    return moment(end - start).format('m');
  };
  const renderRoutes = (plan) => {
    return plan.map((route, key) => {
      return (
        <div className="route-summary">
          <span>{renderModeIcon(route.mode)}</span>
          <span className="route-summary__duration">
            {getTimeGap(route.startTime, route.endTime)}
          </span>
          {key === plan.length - 1 ? null : (
            <span class="material-icons">chevron_right</span>
          )}
        </div>
      );
    });
  };
  return (
    <div className="plan">
      <div className="plan-summary">
        {renderTimeSummary(plan)}
        <div className="routes">{renderRoutes(plan)}</div>
      </div>
      <div className="plan-content">{renderItem()}</div>
    </div>
  );
}
