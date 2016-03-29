var React = require('react');
var _ = require('underscore');
var moment = require('moment');

module.exports = React.createClass({
  render: function render(){
    return (
      <div id={'modal'+this.props.event.eventId} className="popover">
        <div className="popover-content">
          {React.createElement(this.props.detail, {event: this.props.event})}
        </div>
      </div>
    );
  }
});
