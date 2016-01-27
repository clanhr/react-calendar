'use strict';

var React = require('react');
var _ = require('underscore');
var moment = require('moment');
var Event = require('./Event.react.js');
var SpecialDay = require('./SpecialDay.react.js');
var Summary = require('./Summary.react.js');
var RenderUtils = require('./RenderUtils.js');

function getEventComponent(data) {
  if(data.type === "specialDay") {
    return <SpecialDay data={data} />
  } else if(data.type === "summary") {
    return <Summary data={data} />
  } else {
  }
  return <Event data={data} />;
}

function onEventClick(calendar, data) {
  if(calendar.props.onEventClick) {
    return function() {
      calendar.props.onEventClick(data.event);
    }
  }
  return null;
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

function hightlightEvent(overedEvent, currentEvent) {
  if(!overedEvent) {
    return false;
  }
  if(overedEvent === currentEvent) {
    return true;
  }
  if(overedEvent.eventId) {
    return overedEvent.eventId === currentEvent.eventId;
  }
  return false;
}

module.exports = React.createClass({
  render: function render() {
    var days = this.props.data.days;
    var nDays = days.length;
    var events = this.props.eventRow;

    var components = [];
    for(var i = 0; i < nDays; ++i) {
      var posData = events[i.toString()];
      var weekendClassName = RenderUtils.getDayClassName(days[i]);
      if(posData) {
        var className = "event";
        if(posData.type === "summary") {
          className += " showMore";
        }
        if(weekendClassName) {
          className += " " + weekendClassName;
        }
        if(hightlightEvent(this.props.calendar.overEvent(), posData)) {
          className += " highlight";
        }
        components.push(
          <td key={i} colSpan={posData.size}
              onMouseEnter={onEventEnter(this.props.calendar, posData)}
              onMouseLeave={onEventLeave(this.props.calendar, posData)}
              onClick={onEventClick(this.props.calendar, posData)}
              className={className}>
            {getEventComponent(posData)}
          </td>
        );
        i += posData.size - 1;
      } else {
        components.push(<td key={i} className={weekendClassName}>&nbsp;</td>);
      }
    }

    return (
      <tr className="eventRow">
        {components}
      </tr>
    );
  }
});
