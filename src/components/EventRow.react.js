'use strict';

var React = require('react');
var _ = require('underscore');
var moment = require('moment');
var Event = require('./Event.react.js');
var SpecialDay = require('./SpecialDay.react.js');
var Summary = require('./Summary.react.js');

function getEventComponent(data) {
  if(data.type === "specialDay") {
    return <SpecialDay data={data} />
  } else if(data.type === "summay") {
    return <Summary data={data} />
  } else {
  }
  return <Event data={data} />;
}

module.exports = React.createClass({
  render: function render() {
    var nDays = this.props.data.days.length;
    var events = this.props.eventRow;

    var components = [];
    for(var i = 0; i < nDays; ++i) {
      var posData = events[i.toString()];
      if(posData) {
        var className = "event";
        if(posData.type === "summary") {
          className += " showMore";
        }
        components.push(
          <td key={i} colSpan={posData.size} className={className}>
            {getEventComponent(posData)}
          </td>
        );
        i += posData.size - 1;
      } else {
        components.push(<td key={i}>&nbsp;</td>);
      }
    }

    return (
      <tr className="eventRow">
        {components}
      </tr>
    );
  }
});