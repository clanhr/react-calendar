'use strict';

var _ = require('underscore');
var React = require('react');

module.exports = React.createClass({
  render: function render() {
    var content = _.map(this.props.data.events, function eventToStr(event) {
      return "<div class='eventSpan'><div class='content'><p><span class='status "+event.status+"'></span><strong>"+event.label+"</strong> - "+event.type+" <span class='dateRange'>"+event.detail+"</span></p></div></div>";
    }).join("");

    return (
      <button type="button" className="popoverButton" data-trigger="hover" data-toggle="popover" data-content={content}>{this.props.data.label}</button>
    );
  }
});
