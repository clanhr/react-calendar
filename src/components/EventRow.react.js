'use strict';

var React = require('react');
var _ = require('underscore');
var moment = require('moment');
var Event = require('./Event.react.js');
var SpecialDay = require('./SpecialDay.react.js');
var EventDetail = require('./EventDetail.react.js');
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
      var weekendClassName = RenderUtils.getDayClassName(days[i], this.props.calendar);
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

        var detail = null;
        if(posData.type !== "specialDay" && this.props.calendar.props.onEventClick){
          detail = <EventDetail detail={this.props.calendar.props.onEventClick}
                                event={posData.event}/>
        }

        components.push(
          <td key={i} colSpan={posData.size}
              data-toggle="modal-popover"
              data-placement="top"
              data-target={'#modal'+posData.eventId}
              onMouseEnter={onEventEnter(this.props.calendar, posData)}
              onMouseLeave={onEventLeave(this.props.calendar, posData)}
              className={className}>
              {detail}
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
