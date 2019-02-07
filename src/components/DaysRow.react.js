'use strict';

var React = require('react');
var _ = require('underscore');
var moment = require('moment');
var Event = require('./Event.react.js');
var SpecialDay = require('./SpecialDay.react.js');
var EventDetail = require('./EventDetail.react.js');
var RenderUtils = require('./RenderUtils.js');

function getEventComponent(data, spanClassName, day) {
  if(data.type === "specialDay") {
    return (
      <div className="specialDayWrapper">
        <span className={spanClassName}>{day.date()}</span>
        <SpecialDay data={data} />
      </div>
    );
  } else{
    return <span className={spanClassName}>{day.date()}</span>
  }
}

function onEventEnter(calendar, data) {
  return function() {
    calendar.setState({overEvent:data});
  };
}

function onEventLeave(calendar, data) {
  return function() {
    calendar.setState({overEvent:null});
  };
}

module.exports = React.createClass({
  render: function render() {
    var calendar = this.props.calendar;
    var data = this.props.data;
    var days = data.days;
    var events = data.eventRows;
    var component = this;
    var specialDaysDate = specialDaysDate || [];
    var specialDaysData = [];

    _.map(events, function(event){
      _.each(event, function(specialDay){
        if(specialDay.type === 'specialDay'){
          specialDaysDate.push(specialDay.event.startDate);
          specialDaysData.push(specialDay.event);
        }
      });
    });

    return (
      <tr className="monthDay">

        {_.map(days, function daysToComponent(day, key) {
          var className = RenderUtils.getDayClassName(day, component.props.calendar) || "";
          var isToday = moment().isSame(day, 'day');
          var spanClassName = null;
          var monthDay = moment(day._d).format('YYYY-MM-DD');
          var IsSpecialDay = specialDaysDate.includes(monthDay);
          var specialDay = _.filter(specialDaysData, function(specialDay){
            if(specialDay.startDate === monthDay){
              return specialDay;
            }
          });

          if(isToday) {
            spanClassName = "today";
          }
          if(day.month() !== component.props.calendar.props.month) {
            className += " otherMonth";
          }

          if(IsSpecialDay) {

            var detail = <EventDetail detail={calendar.props.eventDetail}
                 event={specialDay[0]}/>;

            return (
              <td key={key} className={className}
                  data-toggle="modal-popover"
                  data-modal-position="relative"
                  data-placement="top"
                  data-target={'#modal'+specialDay[0].eventId}
                  onMouseEnter={onEventEnter(calendar, specialDay[0])}
                  onMouseLeave={onEventLeave(calendar, specialDay[0])}
                  className={className}>
                  {detail}
                  {getEventComponent(specialDay[0], spanClassName, day)}
              </td>
            );
          }else{
            return (
              <td key={key} className={className}>
                <span className={spanClassName}>{day.date()}</span>
              </td>
            );
          }

          return {components};
        })}

      </tr>
    );
  }
});
